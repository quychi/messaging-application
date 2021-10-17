import React, { lazy, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearAuthUser, clearChatUser } from '../../actions';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';
import { v1 as uuid } from 'uuid';
import { STATUS } from '../../constants/const';
import { Col, Form, Row } from 'antd';
import { Suspense } from 'react';
import ButtonComponent from '../../common/components/Button';
import { FooterButtonWrapper } from './Membership/styled';
import styled from 'styled-components';
import { updateUserStatus } from '../../helpers/updateStatusUser';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import linkifyHtml from 'linkify-html';
import { parseEmojis } from '../../helpers/parseEmojis';
import Loading from '../../common/components/Loading';
import { Container } from '../../common/components/MessageList/Container';
import firebase from 'firebase';
import { ToastContainer, toast } from 'react-toastify';
import i18n from '../../i18n';

const ModalComponent = lazy(() => import('../../common/components/Modal'));

const Heading = styled.h1`
    paddingLeft: '5px',
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '153.9%'
`;

export default function Chat() {
    const [sendForm] = Form.useForm();
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );
    const memberData = useSelector(
        ({ chatUserReducer }) => chatUserReducer.chatUser
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const notifyError = () => toast.error(i18n.t('error'));
    const notifyWriteError = () => toast.error(i18n.t('write error'));
    const roomName =
        memberData.member0Uid < memberData.member1Uid
            ? memberData.member0Uid + '_' + memberData.member1Uid
            : memberData.member1Uid + '_' + memberData.member0Uid;

    const [state, setState] = useState({
        user: auth.currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
    });
    const [logoutModal, setLogoutModal] = useState(false);

    // Setup the `beforeunload` event listener
    const setupBeforeUnloadListener = () => {
        window.addEventListener('beforeunload', (ev) => {
            ev.preventDefault();
            return handleLogout();
        });
    };

    useEffect(() => {
        //Case 1: user2 logout
        try {
            db.ref('users/' + memberData.member1Uid).on('value', (snapshot) => {
                snapshot.forEach((snap) => {
                    if (snap.val().status === STATUS.OFFLINE) {
                        setLogoutModal(true);
                    }
                });
            });
        } catch (error) {
            notifyError();
        }
        //Case 2: user2 close browser tab
        setupBeforeUnloadListener();
    }, []);

    const handleChange = (evt) => {
        //Disable Enter key's keycode
        document
            .getElementById('disableEnter')
            .addEventListener('keydown', (evt) => {
                if (evt.keyCode === 13) {
                    evt.preventDefault();
                }
            });

        //Format link & emojis Of Message
        let value = evt.target.value.replace(
            /<a href=".*?">(.*?)<\/a>/g,
            (match, p1) => p1
        );
        const parseEmojisOfMessage = parseEmojis(value || '');
        const html = linkifyHtml(parseEmojisOfMessage);

        setState({
            ...state,
            content: html
        });
    };

    const sanitizeConf = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1'],
        allowedAttributes: { a: ['href'] }
    };

    const sanitize = () => {
        setState({
            ...state,
            content: sanitizeHtml(state.content, sanitizeConf)
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({ ...state, writeError: null });
        let removeHtmlTag = state.content.replace(
            /<a href=".*?">(.*?)<\/a>/g,
            (match, p1) => p1
        );
        try {
            await db
                .ref('chats/' + roomName)
                .push() //Firebase's .push() function will generate keys based on timestamp
                .set({
                    sentBy: userData.uid,
                    message: removeHtmlTag,
                    created: firebase.database.ServerValue.TIMESTAMP // the server side date
                });
            setState({
                ...state,
                content: ''
            });
        } catch (error) {
            notifyWriteError();

            setState({ ...state, writeError: error.message });
        }
    };

    const handleLogout = async () => {
        updateUserStatus(userData.uid, STATUS.OFFLINE);
        dispatch(clearChatUser());
        dispatch(clearAuthUser());
        try {
            await auth.signOut();
        } catch (e) {
            notifyError();
        }
        history.push('/');
    };

    const closeChatWindow = () => {
        updateUserStatus(userData.uid, STATUS.AVAILABLE);
        dispatch(clearChatUser());
        history.push('/conversationListItem');
    };

    const ModalLogout = () => {
        return (
            <ModalComponent
                width={560}
                scroll={false}
                visible={logoutModal}
                footer={null}
                onCancel={() => {
                    setLogoutModal(false);
                }}
                centered
            >
                <Col xs={24} align="center" justify="center">
                    <Col
                        style={{
                            marginTop: 50,
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'center'
                        }}
                    >
                        <Heading>
                            Your friend has just left the chat window
                        </Heading>
                    </Col>
                    <Col xs={16} align="center" justify="space-between">
                        <Col
                            md={12}
                            xs={24}
                            align="start"
                            justify="space-between"
                        >
                            <FooterButtonWrapper>
                                <ButtonComponent onClick={closeChatWindow}>
                                    Okay
                                </ButtonComponent>
                            </FooterButtonWrapper>
                        </Col>
                    </Col>
                </Col>
            </ModalComponent>
        );
    };

    return (
        <div className="chats-page">
            <Suspense fallback={<Loading />}>
                <ModalLogout />
                <ToastContainer />

                <div className="chats">
                    <Container roomName={roomName} />
                    {/* {state.chats &&
                        state.chats.map((chat, index) => {
                            return renderMessages(
                                state.chats[index - 1],
                                chat,
                                state.chats[index + 1],
                                index
                            );
                        })} */}
                </div>
                {/* {# message form #} */}

                <Col xs={24} md={24}>
                    <Row align="start" justify="start" wrap={false}>
                        <Row
                            justify="space-between"
                            align="middle"
                            wrap={false}
                            style={{
                                width: '100%',
                                marginTop: 30
                            }}
                        >
                            <ContentEditable
                                className="editable"
                                id="disableEnter"
                                tagName="pre"
                                html={state.content} // innerHTML of the editable div
                                disabled={false} // use true to disable edition
                                onChange={handleChange} // handle innerHTML change
                                // onBlur={sanitize} //??? with this will remove text after link?
                            />
                            <ButtonComponent
                                className="buttonSend"
                                onClick={handleSubmit}
                            >
                                {i18n.t('send')}
                            </ButtonComponent>
                        </Row>
                    </Row>
                </Col>
                <div>
                    {i18n.t('login in as:')}{' '}
                    <strong>{state?.user?.email}</strong>
                </div>
            </Suspense>
        </div>
    );
}

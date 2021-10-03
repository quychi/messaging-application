import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ClearAuthUser } from '../actions';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import { v1 as uuid } from 'uuid';
import { parseEmojis } from '../helpers/parseEmojis';
import Linkify from 'react-linkify';
import { Col, Form, Row } from 'antd';
import { FooterButtonWrapper } from './Membership/styled';
import ButtonComponent from '../common/components/Button';
import InputComponent from '../common/components/WelcomeInput';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import linkifyHtml from 'linkify-html';

export default function Chat2() {
    const [sendForm] = Form.useForm();
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );
    const memberData = useSelector(
        ({ chatUserReducer }) => chatUserReducer.chatUser
    );
    const dispatch = useDispatch();
    const history = useHistory();
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

    useEffect(() => {
        setState({ ...state, readError: null });
        try {
            db.ref('chats')
                .child(roomName)
                .on('value', (snapshot) => {
                    let chats = [];
                    snapshot.forEach((snap) => {
                        chats.push(snap.val());
                    });
                    setState({ ...state, chats: chats });
                });
        } catch (error) {
            setState({ ...state, readError: error.message });
            console.log('============= read error', error.message);
        }
    }, [state.chats.length]);

    const linkify = (text = '') => {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        //var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url, b, c) {
            var url2 = c == 'www.' ? 'http://' + url : url;
            return '<a href="' + url2 + '" target="_blank">' + url + '</a>';
        });
    };
    const handleChange = (evt) => {
        let value = evt.target.value.replace(
            /<a href=".*?">(.*?)<\/a>/g,
            (match, p1) => p1
        );
        const parseEmojisOfMessage = parseEmojis(value || '');
        const html = linkifyHtml(parseEmojisOfMessage);
        sendForm.setFieldsValue({
            content: html
        });

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
            await db.ref('chats/' + roomName + '/' + uuid()).set({
                sentBy: auth.currentUser.uid,
                message: removeHtmlTag,
                timestamp: Date.now()
            });
            setState({ ...state, content: '' });
        } catch (error) {
            console.log(
                '============  write chats/message error =============',
                error.message
            );
            setState({ ...state, writeError: error.message });
        }
    };

    async function handleLogout() {
        await auth.signOut();
        await dispatch(ClearAuthUser());
        // updateStatus(auth.currentUser.uid);
        history.push('/');
    }

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Messaging Application</div>

                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <div className="chats">
                {state.chats
                    .sort(function (x, y) {
                        return x.timestamp - y.timestamp;
                    })
                    .map((chat) => {
                        return (
                            <Linkify>
                                <p key={chat.timestamp}>
                                    {parseEmojis(chat.message)}
                                </p>
                            </Linkify>
                        );
                    })}
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
                            marginTop: 15
                        }}
                    >
                        <ContentEditable
                            className="editable"
                            tagName="pre"
                            html={state.content} // innerHTML of the editable div
                            disabled={false} // use true to disable edition
                            onChange={handleChange} // handle innerHTML change
                            onBlur={sanitize}
                        />
                        <ButtonComponent
                            className="buttonSend"
                            onClick={handleSubmit}
                        >
                            Send
                        </ButtonComponent>
                    </Row>
                </Row>
            </Col>
            <div>
                Login in as: <strong>{state.user.email}</strong>
            </div>
        </div>
    );
}

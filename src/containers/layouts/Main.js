import React, { useEffect, useState } from 'react';
import Header from '../../common/components/Header';
import { auth, db } from '../../services/firebase';
import styled from 'styled-components';
import ConversationListItem from '../../common/components/ConversationListItem';
import Chat from '../views/Chat';
import { useSelector } from 'react-redux';
import styles from './Main.module.css';
import cx from 'classnames';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import i18n from '../../i18n';

const MainContainer = styled.div`
    height: 100vh;
    width: 100%;
    max-width: 100vw;
    margin: 0 auto;
    padding: 1rem 4rem;

    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 1rem 1rem;
`;

function Main({ children }) {
    const [avatar, setAvatar] = useState('');
    const [nickName, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const memberData = useSelector(
        ({ chatUserReducer }) => chatUserReducer.chatUser
    );
    const location = useLocation();
    const isUserInfoPath = location.pathname === '/usersInfo';
    const notifyError = () => toast.error(i18n.t('error'));

    useEffect(() => {
        try {
            db.ref('users/' + auth.currentUser.uid).on('value', (snapshot) => {
                if (snapshot.val()) {
                    setNickName(snapshot.val().nickName);
                    setGender(snapshot.val().gender);
                    setAvatar(snapshot.val().avatar);
                }
            });
        } catch (error) {
            notifyError();
        }
    }, []);
    return (
        <div>
            <Header nickName={nickName} gender={gender} avatar={avatar} />
            <ToastContainer />
            <MainContainer>
                <div className={cx(styles.scrollable, styles.sidebar)}>
                    {!isUserInfoPath && auth && <ConversationListItem />}
                </div>
                <div className={cx(styles.scrollable, styles.content)}>
                    {memberData && memberData?.member1Uid && <Chat></Chat>}
                </div>
            </MainContainer>
            {isUserInfoPath && children}
        </div>
    );
}

export default Main;

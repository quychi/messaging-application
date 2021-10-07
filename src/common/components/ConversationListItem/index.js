import { Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SaveChatUser } from '../../../actions/chatUser.actions';
import { STATUS } from '../../../constants/const';
import { updateUserStatus } from '../../../helpers/updateStatusUser';
import { auth, db } from '../../../services/firebase';
import styles from './ConversationListItem.module.css';
import cx from 'classnames';

export default function ConversationListItem(props) {
    // const { nickname, photo, status } = props.data;

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const getAvailableUsers = async () => {
        try {
            await db.ref('users').on('value', (snapshot) => {
                let onlineUsersArray = [];
                snapshot.forEach((snap) => {
                    if (snap.val().status !== STATUS.OFFLINE) {
                        onlineUsersArray.push(snap.val());
                    }
                });
                setOnlineUsers(onlineUsersArray);
                const availableUsersArray = onlineUsersArray.filter(
                    (obj) => obj.status === STATUS.AVAILABLE
                );
                setAvailableUsers(availableUsersArray);
            });
        } catch (error) {
            console.log('========== errr:', error.message);
        }
    };

    useEffect(() => {
        getAvailableUsers();
    }, []);

    const createRoom = async (userUid1 = null, userUid2 = null) => {
        let roomName =
            userUid1 < userUid2
                ? userUid1 + '_' + userUid2
                : userUid2 + '_' + userUid1;
        //don't need check value exists because same key node roomName(primary key)
        // await db
        //     .ref('chatrooms/' + roomName)
        //     .once('value')
        //     .then((snapshot) => {
        //         return;
        //     });
        if (userUid1 && userUid2) {
            try {
                await db.ref('rooms/' + roomName).set({
                    member1: userUid1,
                    member2: userUid2
                });
            } catch (error) {
                console.log('============ write err:', error.message);
            }
        } else {
            console.log(
                '============ write err: userUid1 or userUid2 is null ============ '
            );
        }
    };

    const handleClick = (itemUid) => {
        const toUserUid = itemUid;
        dispatch(SaveChatUser(auth.currentUser.uid, toUserUid)); //userData.uid
        createRoom(auth.currentUser.uid, toUserUid);
        updateUserStatus(auth.currentUser.uid, STATUS.UNAVAILABLE);
        updateUserStatus(toUserUid, STATUS.UNAVAILABLE);
        history.push('/chats');
    };

    return (
        <Col xs={24} md={24}>
            <h3 style={{ color: '#0055A9' }}>Available Users</h3>
            {availableUsers &&
                availableUsers.map((item, i) => (
                    <div
                        className={styles.conversationListItem}
                        key={i}
                        onClick={() => handleClick(item.uid)}
                    >
                        <img
                            className={styles.conversationPhoto}
                            src={item.avatar}
                            alt="conversation"
                        />
                        <div className={styles.conversationInfo}>
                            <h1 className={styles.conversationTitle}>
                                {item.nickName}
                            </h1>
                            <p className={styles.conversationSnippet}>
                                online{','}&nbsp;not in any conversation
                            </p>
                        </div>
                    </div>
                ))}

            <h3 style={{ color: '#0055A9' }}>Unavailable Users</h3>
            {onlineUsers &&
                onlineUsers.map((item, i) => (
                    <div
                        className={cx(
                            styles.conversationListItem,
                            styles.unavailableUser
                        )}
                        key={i}
                    >
                        <img
                            className={styles.conversationPhoto}
                            src={item.avatar}
                            alt="conversation"
                        />
                        <div className={styles.conversationInfo}>
                            <h1 className={styles.conversationTitle}>
                                {item.nickName}
                            </h1>
                            <p className={styles.conversationSnippet}>
                                online{','}&nbsp;in conversation
                            </p>
                        </div>
                    </div>
                ))}
        </Col>
    );
}

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SaveChatUser } from '../../../actions/chatUser.actions';
import { auth, db } from '../../../services/firebase';
import './ConversationListItem.css';

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
                    if (snap.val().status === 'online') {
                        onlineUsersArray.push(snap.val());
                    }
                });
                setOnlineUsers(onlineUsersArray);
                const availableUsersArray = onlineUsersArray.filter(
                    (obj) => obj.inConversation === 0
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

    const handleClick = (id) => {
        const toUser = availableUsers.filter(function (obj) {
            return obj.uid === id;
        });
        dispatch(SaveChatUser(auth.currentUser.uid, toUser[0].uid)); //userData.uid
        createRoom(auth.currentUser.uid, toUser[0].uid);
        history.push('/chats');
    };

    return (
        <>
            <h3 style={{ color: '#0055A9' }}>Available Users</h3>
            {availableUsers &&
                availableUsers.map((item, i) => (
                    <div
                        className="conversation-list-item"
                        key={i}
                        onClick={() => handleClick(item.uid)}
                    >
                        <img
                            className="conversation-photo"
                            src={item.avatar}
                            alt="conversation"
                        />
                        <div className="conversation-info">
                            <h1 className="conversation-title">
                                {item.nickname}
                            </h1>
                            <p className="conversation-snippet">
                                {item.status}
                                {','}&nbsp;available
                            </p>
                        </div>
                    </div>
                ))}

            <h3 style={{ color: '#0055A9' }}>Online Users</h3>
            {onlineUsers &&
                onlineUsers.map((item, i) => (
                    <div className="conversation-list-item" key={i}>
                        <img
                            className="conversation-photo"
                            src={item.avatar}
                            alt="conversation"
                        />
                        <div className="conversation-info">
                            <h1 className="conversation-title">
                                {item.nickname}
                            </h1>
                            <p className="conversation-snippet">
                                {item.status}
                            </p>
                        </div>
                    </div>
                ))}
        </>
    );
}

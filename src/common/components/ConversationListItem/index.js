import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SaveChatUser } from '../../../actions/chatUser.actions';
import { auth, db } from '../../../services/firebase';
import './ConversationListItem.css';

export default function ConversationListItem(props) {
    // const { nickname, photo, status } = props.data;

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const test = async () => {
        try {
            await db.ref('users').on('value', (snapshot) => {
                let u = [];
                snapshot.forEach((snap) => {
                    u.push(snap.val());
                });
                setUsers(u);
            });
        } catch (error) {
            console.log('========== errr:', error.message);
        }
    };

    useEffect(() => {
        test();
    }, []);

    const handleClick = (id) => {
        const toUser = users.filter(function (obj) {
            return obj.uid === id;
        });
        dispatch(SaveChatUser(auth.currentUser.uid, toUser[0].uid)); //userData.uid
        history.push('/chats');
    };

    return (
        <>
            {users &&
                users.map((item, i) => (
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
                            </p>
                        </div>
                    </div>
                ))}
        </>
    );
}

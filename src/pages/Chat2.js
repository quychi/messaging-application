import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ClearAuthUser } from '../actions';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import { v1 as uuid } from 'uuid';

export default function Chat2() {
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

    const handleChange = (event) => {
        event.persist();

        setState({ ...state, content: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({ ...state, writeError: null });
        try {
            await db.ref('chats/' + roomName + '/' + uuid()).set({
                sentBy: auth.currentUser.uid,
                message: state.content,
                timestamp: Date.now()
            });
        } catch (error) {
            console.log(
                '============  write chats/message error =============',
                error.message
            );
        }
    };

    const updateStatus = (userUid = null) => {
        if (userUid) {
            try {
                db.ref('users/' + userUid).set({
                    status: 'offline'
                });
            } catch (error) {
                console.log(
                    '============  write data error =============',
                    error.message
                );
            }
        } else console.log('============ userUid is null =============');
    };

    async function handleLogout() {
        await auth.signOut();
        await dispatch(ClearAuthUser());
        updateStatus(auth.currentUser.uid);
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
                        return <p key={chat.timestamp}>{chat.message}</p>;
                    })}
            </div>
            {/* {# message form #} */}
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange}></input>
                {state.error ? <p>{state.writeError}</p> : null}
                <button type="submit">Send</button>
            </form>
            <div>
                Login in as: <strong>{state.user.email}</strong>
            </div>
        </div>
    );
}

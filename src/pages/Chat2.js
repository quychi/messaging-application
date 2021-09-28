import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ClearAuthUser } from '../actions';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';

export default function Chat2() {
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );
    const dispatch = useDispatch();
    const history = useHistory();

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
            db.ref('chats').on('value', (snapshot) => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });

                setState({ ...state, chats: chats });
            });
        } catch (error) {
            setState({ ...state, readError: error.message });
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
            await db.ref('chats').push({
                content: state.content,
                timestamp: Date.now(),
                uid: state.user.uid
            });
            setState({ ...state, content: '' });
        } catch (error) {
            setState({ ...state, writeError: error.message });
        }
    };

    async function handleLogout() {
        await auth.signOut();
        await dispatch(ClearAuthUser());
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
                {state.chats.map((chat) => {
                    return <p key={chat.timestamp}>{chat.content}</p>;
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

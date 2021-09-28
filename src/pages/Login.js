import React, { useEffect } from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

import { auth } from '../services/firebase';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { GetAuthUser } from '../actions/index';
import { useHistory } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            dispatch(GetAuthUser(user));
            if (JSON.stringify(userData) !== '{}') {
                history.push('/chats');
            }
        });
    });

    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to Messaging Application!</h2>

                <div
                    className="login-button google"
                    onClick={() => {
                        auth.signInWithRedirect(
                            new firebase.auth.GoogleAuthProvider()
                        );
                    }}
                >
                    <GoogleOutlined /> Sign In with Google
                </div>

                <br />
                <br />

                <div
                    className="login-button facebook"
                    onClick={() =>
                        auth.signInWithRedirect(
                            new firebase.auth.FacebookAuthProvider()
                        )
                    }
                >
                    <FacebookOutlined /> Sign In with Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;

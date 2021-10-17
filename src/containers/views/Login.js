import React, { useEffect } from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';

import { auth, db } from '../../services/firebase';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { GetAuthUser } from '../../actions/index';
import { useHistory } from 'react-router-dom';
import { updateUserStatus } from '../../helpers/updateStatusUser';
import { STATUS } from '../../constants/const';
import i18n from '../../i18n';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            //authStateChanged <=> (login || logout). Logout -> user is null
            dispatch(GetAuthUser(user));
            if (user) {
                db.ref()
                    .child('users/' + user.uid)
                    .once('value', function (snapshot) {
                        if (snapshot.exists()) {
                            //exists users info (nikcname, dob, gender)
                            updateUserStatus(user.uid, STATUS.AVAILABLE);
                            history.push('/conversationListItem');
                        } else history.push('/usersInfo');
                    });
            }
        });
    });

    return (
        <div id="login-page">
            <div id="login-card">
                <h2> {i18n.t('welcome')}</h2>

                <div
                    className="login-button google"
                    onClick={() => {
                        auth.signInWithRedirect(
                            new firebase.auth.GoogleAuthProvider()
                        );
                    }}
                >
                    <GoogleOutlined /> {i18n.t('sign in with google')}
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
                    <FacebookOutlined /> {i18n.t('sign in with facebook')}
                </div>
            </div>
        </div>
    );
}

export default Login;

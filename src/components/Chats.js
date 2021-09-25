import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';

import { auth } from '../firebase';
import { ClearAuthUser } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { UpSquareFilled } from '@ant-design/icons';

function Chats() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );

    async function handleLogout() {
        await auth.signOut();
        await dispatch(ClearAuthUser());
        history.push('/');
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], 'test.jpg', { type: 'image/jpeg' });
    }

    useEffect(() => {
        // if (!didMountRef.current) {
        // didMountRef.current = true;

        if (!userData || userData === null) {
            history.push('/');
            return;
        }

        // Get-or-Create should be in a Firebase Function
        axios
            .get('https://api.chatengine.io/users/me/', {
                headers: {
                    'project-id': '143c164e-ec6c-46d4-8207-72740a351cf4',
                    'user-name': userData.email,
                    'user-secret': userData.uid
                }
            })

            .then(() => setLoading(false))

            .catch((e) => {
                let formdata = new FormData();
                formdata.append('email', userData.email);
                formdata.append('username', userData.email);
                formdata.append('secret', userData.uid);

                getFile(userData.photoURL).then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios
                        .post('https://api.chatengine.io/users/', formdata, {
                            headers: {
                                'private-key':
                                    '8be4683c-7bc6-42b4-a3bd-b93b90aec394'
                            }
                        })
                        .then(() => setLoading(false))
                        .catch((e) => console.log('e', e.response));
                });
            });
        // }
    }, [userData, history]);

    if (!userData || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Messaging Application</div>

                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="826954f0-94fb-4091-86d1-81408b7290d8" //before deploying, we are going to move this into environment variables
                userName={userData.email}
                userSecret={userData.uid}
            />
        </div>
    );
}

export default Chats;

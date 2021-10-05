import React, { Suspense, lazy, useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import Chats from './pages/Chats';
import UserInfo from './pages/Membership';
import ConversationListItem from './common/components/ConversationListItem';
import { auth } from './services/firebase';

import 'antd/dist/antd.css';

import { connect } from 'react-redux';

import PrivateRoute from './common/components/PrivateRoute';
import Loading from './common/components/Loading';
const Chat2 = lazy(() => import('./pages/Chat2'));

function App() {
    const [state, setState] = useState({
        authenticated: false,
        loading: true
    });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setState({
                    authenticated: true,
                    loading: false
                });
            } else {
                setState({
                    authenticated: false,
                    loading: false
                });
            }
        });
    }, []);

    return state.loading === true ? (
        <Loading />
    ) : (
        <div style={{ fontFamily: 'Avenir' }}>
            <Router>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        {/* <PublicRoute path="/signup" authenticated={state.authenticated} component={Signup}></PublicRoute> */}
                        <Route exact path="/" component={Login} />
                        <PrivateRoute
                            path="/usersInfo"
                            authenticated={state.authenticated}
                            component={UserInfo}
                        ></PrivateRoute>
                        <PrivateRoute
                            path="/conversationListItem"
                            authenticated={state.authenticated}
                            component={ConversationListItem}
                        ></PrivateRoute>
                        <PrivateRoute
                            path="/chats"
                            authenticated={state.authenticated}
                            component={Chat2}
                        ></PrivateRoute>
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(App);

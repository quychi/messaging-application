import React, { Suspense, lazy, useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './containers/views/Login';
// import Chats from './pages/Chats';
import UserInfo from './containers/views/Membership';
import ConversationListItem from './common/components/ConversationListItem';
import { auth } from './services/firebase';

import 'antd/dist/antd.css';

import { connect } from 'react-redux';

import PrivateRoute from './common/components/PrivateRoute';
import Loading from './common/components/Loading';
import Main from './containers/layouts/Main';
const Chat = lazy(() => import('./containers/views/Chat'));

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
                        <Route>
                            <Main>
                                <Switch>
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
                                        component={Chat}
                                    ></PrivateRoute>
                                </Switch>
                            </Main>
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(App);

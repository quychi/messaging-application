import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import Chats from './pages/Chats';
import Chat2 from './pages/Chat2';
import UserInfo from './pages/Membership';
import ConversationListItem from './common/components/ConversationListItem';

import 'antd/dist/antd.css';

import { connect } from 'react-redux';

function App() {
    return (
        <div style={{ fontFamily: 'Avenir' }}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/usersInfo" component={UserInfo} />
                    <Route
                        path="/conversationListItem"
                        component={ConversationListItem}
                    />
                    <Route path="/chats" component={Chat2} />
                </Switch>
            </Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(App);

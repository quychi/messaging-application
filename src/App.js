import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Chats from './pages/Chats';

import { connect } from 'react-redux';

function App() {
    return (
        <div style={{ fontFamily: 'Avenir' }}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/chats" component={Chats} />
                </Switch>
            </Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(App);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import Loading from './common/components/Loading';

window.store = store;

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*2 props loading và persistor đều yêu cầu phải có */}
            <PersistGate loading={<Loading />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

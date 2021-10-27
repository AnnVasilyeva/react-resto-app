import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundry from './components/error-boundry/error-boundry';
import RestoService from './services/resto-service';
import RestoSrviceContext from './components/resto-service-context';
import store from './store';

import './index.scss';
const restoService = new RestoService;

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <RestoSrviceContext.Provider value={restoService}>
                <Router>
                    <App/>
                </Router>
            </RestoSrviceContext.Provider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));


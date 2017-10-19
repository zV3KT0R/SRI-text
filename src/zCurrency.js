import React from 'react';
import { BrowserRouter as Router }  from 'react-router-dom';
import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider';
import ReactDOM                     from 'react-dom';
import {Provider}                   from 'react-redux'
import CurrencyApp                  from 'containers/zCurrencyApp.jsx'
import awStore from 'store';

window.store = awStore;

ReactDOM.render(
    <Provider store={awStore}>
        <Router>
            <MuiThemeProvider>
                <CurrencyApp />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById("mount-point")
);
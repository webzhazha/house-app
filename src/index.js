import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@/router/index'
import { AppContainer } from 'react-hot-loader'

import '@/style/index.css';
import '@/utils/rem.js';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <AppContainer>
        <Router />
    </AppContainer>,
    document.getElementById('root')
);

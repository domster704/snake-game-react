import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from './App';

import './style.css';
import store from './store/store';
import {HashRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Suspense fallback={'Loading...'}>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route excat path="/" element={<App/>}/>
                </Routes>
            </HashRouter>
        </Provider>
    </Suspense>
);

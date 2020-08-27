import React from 'react';
import {render} from 'react-dom';

import {Store} from 'webext-redux';
import {Provider} from 'react-redux';
import Newtab from "./Newtab";
import './index.css';
import 'antd/dist/antd.css';

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
     <Provider store={proxyStore}><Newtab /></Provider>
    ,document.getElementById('app'));
});


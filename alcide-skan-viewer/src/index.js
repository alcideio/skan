import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime';
import AlcideSkanViewer from './AlcideSkanViewer';

import './SkanViewer.module.scss';

var data = window['skanReportData'];

ReactDOM.render(
  <React.StrictMode>
    <AlcideSkanViewer data={data}/>
  </React.StrictMode>,
  document.getElementById('root')
);

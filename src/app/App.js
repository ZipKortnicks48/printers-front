import React from 'react';
import {logo} from '../source'
import classNames from './app.module.css';
import { HelloPage } from '../pages';

function App() {
  return (
    <div className={classNames.app}>
      <header className={classNames.appHeader}>
        <HelloPage logo={logo} />
      </header>
    </div>
  );
}

export default App;

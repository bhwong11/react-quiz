import React,{useState} from 'react';
import {fetchQuizQuestions} from './API'

import Routes from './config/routes'
import './main.css'

function App() {
  return (
    <div className="background">
      <Routes />
    </div>
  );
}

export default App;

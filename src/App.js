import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent'
import BtnComponent from './Components/BtnComponent'
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './img/logo.png';



function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);


  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
        updatedM++;
        updatedS = 0;
    }
    if(updatedMs === 60){
      updatedS++;
      updatedMs = 0;
  }

    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});      
    
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    return setTime({ms:0, s:0, m:0, h:0});
  };

  const resume = () => start();


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();


  return (
    <div className="main-section">

      <AppBar>
        <Toolbar>
        <img src={logo} style={{width:200, marginTop: -7}} />
        </Toolbar>
      </AppBar>

      <div className="clock-holder">
        <h1>Timer App</h1>
        <div className="stopwatch">
              <DisplayComponent time={time}/>
              <BtnComponent status={status} reset={reset} resume={resume} stop={stop} start={start}/>  
        </div>

      </div>
      <footer> <div id="Copyright">&#60;Crafted by Akshad Kolhatkar&#62;</div></footer>
    </div>
  );
}

export default App;

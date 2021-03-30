import React,{ useState } from "react";
import { Container,Row } from "shards-react";
import Layout from "../components/layout/MainLayout";
import PageTitle from "../components/common/PageTitle";
import '../static/css/stopwatch.css';

let timeNow;
let timeLaps = [];

const StopWatch = () => {
  const [isTimer,setIsTimer] = useState(false);
  const [savedTime,setSavedTime] = useState(0);
  const [displayTime,setDisplayTime] = useState(0);

  const startTimer = () => {
    setIsTimer(true);
    const time=Date.now();
    timeNow = setInterval(() => {
      setDisplayTime(Date.now() - time)
    },10);
  }

  const resetTimer = () => {
    clearInterval(timeNow);
    setSavedTime(0);
    setDisplayTime(0);
    timeLaps = [];
  }

  const stopTimer = () => {
    clearInterval(timeNow);
    setIsTimer(false);
    setSavedTime(savedTime + displayTime); 
  }

  //Calculate totaltime while stopwatch is running (displayTime + savedTime)
  //calculate totaltime while stopwatch is not runing (savedTime)
  const totalTime = isTimer ? (displayTime+savedTime) : savedTime;
  
  const diffInHrs = totalTime / 3600000;
  const hh = Math.floor(diffInHrs);
    
  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);
    
  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);
    
  const diffInMs = (diffInSec - ss) * 100;
  const ms = Math.floor(diffInMs);
    
  const formattedHH = hh.toString().padStart(2, "0");
  const formattedMM = mm.toString().padStart(2, "0");
  const formattedSS = ss.toString().padStart(2, "0");
  const formattedMS = ms.toString().padStart(2, "0");
  const display = `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;

  const lapTimer = () => {
    timeLaps.unshift(display);
  }
  
  return(
      <Layout>
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Stop Watch"
            subtitle="Find out how stop watch is more important"
            md="12"
            className="ml-sm-auto mr-sm-auto"
          />
        </Row>
          
        <div className="stopwatch ">
          <h1><span className="gold">STOP</span>WATCH </h1>
          <div className="circle">
            <span className="time" id="display">{display}</span>
          </div>

          <div className="control-buttons">
            { (isTimer || !savedTime)  ?
              <button className="lapTimer" onClick={lapTimer}>Lap</button>:
              <button className="reset" onClick={resetTimer}>Reset</button>
            }
            { isTimer ? 
              <button className="stop" onClick={stopTimer}>Stop</button>:
              <button className="start" onClick={startTimer}>Start</button>
            }
          </div>

          <div className="lap-array">
            <div className="lap-design">
                <div className="lap">
                  <div className="lap-index">Lap {timeLaps.length+1}</div>
                  <div className="spacer" />
                  {displayTime ? display: ''}
                </div>
            </div>
            {timeLaps && 
              <div className="lap-design">
                {timeLaps.map((timelap,index) => 
                    <div className="lap">
                      <div className="lap-index">Lap {timeLaps.length-index}</div>
                      <div className="spacer" />
                      {timelap}
                    </div>
                )}
              </div> 
            }
          </div>
        </div>
      </Container>
    </Layout>
  );
}


export default StopWatch;
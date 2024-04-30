import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapTimeHeading, setLapTimeHeading] = useState(null); 
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
    setLapTimeHeading(null);
  };

  const lap = () => {
    setLaps([...laps, time]);
    setLapTimeHeading("Lap Time"); 
  };

  const formatTime = (time) => {
    // const hours = Math.floor(time / 3600);
    // const minutes = Math.floor((time % 3600) / 60);
    // const seconds = time % 60;
    // const milliseconds = Math.floor((time % 60)*1000);
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  return (
   <div>
   <div className="head"><h2 align="center">STOPWATCH</h2></div>
    <div className="stopwatch-container">
      <h1 className="stopwatch-display">{formatTime(time)}</h1>
      <div className="stopwatch-controls">
        <button className="stopwatch-button" onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button className="stopwatch-button" onClick={reset}>Reset</button>
        <button className="stopwatch-button" onClick={lap} disabled={!isRunning}>Lap</button>
      </div>
      
      {lapTimeHeading && <h2>{lapTimeHeading}</h2>}
     
      <ul className="stopwatch-laps">
      
        {laps.map((lapTime, index) => (
            
          <li key={index} className="stopwatch-lap-item">{formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Stopwatch;
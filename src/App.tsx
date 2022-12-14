import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import tailWindLogo from './tailwindcss_logo.svg';
import useSound from 'use-sound';
import clockSound from './clock.mp3';
import clockStrickSound from './clock-strickes.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [clockPlay , clockFuns] = useSound(clockSound);
  const [clockStrickPlay , clockStrickFuns] = useSound(clockStrickSound);
  const [playClock, setPlayClock] = useState(false);
  const [playClockStrick, setPlayClockStrick] = useState(false);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(10);
  const [isStart, setIsStart] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  let timer: any = null;

  useEffect(() => {
    if (playClock && soundOn) clockPlay();
    else clockFuns.stop();
  }, [playClock, soundOn]);

  useEffect(() => {
    if (playClockStrick && soundOn) clockStrickPlay();
    else clockStrickFuns.stop();
  }, [playClockStrick, soundOn]);

  const go = () => {
    if (minute > 0 || second > 0) {
      if (second === 0) {
        setMinute(minute - 1);
        setSecond(59);
      } else {
        setSecond(second - 1);
      }
    } else if (minute === 0 || second === 0) {
      setIsStart(false);
    }
  }

  const start = () => {
    setIsStart(true);
  }

  const stop = () => {
    setIsStart(false);
  }

  useEffect(() => {
    if (isStart && timer === null) timer = setInterval(go, 1000);

    return () => clearInterval(timer);
  }, [minute, second, isStart])

  useEffect(() => {
    if (!isStart) {
      clearInterval(timer);
      timer = null;
      setPlayClock(false);
    }

    if (isStart && soundOn) {
      setPlayClock(true);
    }
  }, [isStart]);

  useEffect(() => {
    if (!isStart && minute === 0 && second === 0 && soundOn) setPlayClockStrick(true);
    else setPlayClockStrick(false);
  }, [minute, second, isStart]);

  const reset = () => {
    setIsStart(false);
    setMinute(5);
    setSecond(0);
  }

  const troggleSound = () => setSoundOn(!soundOn);

  useEffect(() => {
    if (!soundOn) {
      clockFuns.stop();
      clockStrickFuns.stop();
    }
  }, [soundOn]);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-500 flex justify-center items-center">
      <div>
        <div className="flex justify-center">
          <img src={logo} alt="" className="w-[20vw] h-[20vh] animate-spin-7s"/>
          <img src={tailWindLogo} alt="" className="w-[20vw] h-[20vh] animate-bounce"/>
        </div>
        <div className=" h-[30vh] bg-gray-300 rounded-md relative">
          <div className="absolute right-1 text-slate-700">
            {soundOn? <FontAwesomeIcon icon={faVolumeHigh} onClick={troggleSound}/>: <FontAwesomeIcon icon={faVolumeMute} onClick={troggleSound}/>}
          </div>
          <div className="h-[70%] flex justify-center items-center text-4xl text-slate-700">
            {minute < 10? '0' + minute: minute} : {second < 10? '0' + second: second}
          </div>
          <div className="flex justify-around h-[30%] py-1">
            <button className="button" onClick={() => isStart? stop(): start()}>
              {isStart? 'Stop' : 'Start'}
            </button>
            <button className="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {setGameResult} from "../../api";

import './style.scss';

const SevenGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(1)

  useEffect(()=> {
    if(isGameNow && (timeCount === 0 || timeCount === 10 || timeCount === 20)) {
      setClickDelay(0);

      const circlePart = Array(10)
        .fill([], 0, 10)
        .map(() => {
          return [
            Math.floor(Math.random() * (640 - 40)) + 40,
            Math.floor(Math.random() * (640 - 40)) + 40,
            Math.floor(Math.random() * (5 - 1)) + 1
          ];
        });
      setCoordinatesArray(circlePart)

    }
  }, [isGameNow, timeCount]);

  useEffect(() => {
    if (isGameNow) {
      let timeCountId = setInterval(() => setTimeCount(value => value +1), 1000);
      return () => { clearInterval(timeCountId) };
    }
    if( timeCount === 0 || timeCount === 9 || timeCount === 18) {
      setClickDelay(0)
    }
  }, [clickDelay, isGameNow, timeCount])

  // console.log(`timecount ${timeCount}`, `delay ${clickDelay}`)

  useEffect(() => {
    if(timeCount === 30 ) {
      alert(`Игра окончена, вы сделали ${userHit} правильных кликов`)
      setGameResult('game number 7', userHit)

      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
      setClickDelay(0)
    }
  }, [timeCount, userHit])

  useEffect(() =>{
    if (isGameNow && clickDelay < 10) {
      const delayId = setInterval(() => setClickDelay(value => value + 1), 1000)
      return () => {
        clearInterval(delayId)
      }
    } else  {
      setClickDelay(0)
    }
  }, [clickDelay, isGameNow, coordinatesArray])

  const deleteBlock = (id) => {
    setCoordinatesArray(coordinatesArray.filter((arr, index) =>
      id !== index && arr
    ))
  };

  const addScoreAndDelete = (event, index) => {
    setUserHit(value => value +1);
    event.stopPropagation();
    deleteBlock(index);
  };

  return (
    <div className='sevenGameScreen'>
      <div className='sevenGameScreen__gameWrapper'>
        <div className='sevenGameScreen__gameWrapper__settingBar'>
          <button
            className='sevenGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
        <div className='sevenGameScreen__gameWrapper__title'>
          <div>
            Правильных кликов { userHit }
          </div>
        </div>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          className="sevenGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 && coordinatesArray.map((crts, index) => {
            console.log(`click delay ${clickDelay}`, `elem time ${crts[2]}`)
            return (
              <div
                key={index}
                onClick={
                  (clickDelay >= crts[2] || clickDelay <= crts[2] + 4) ?
                    event => addScoreAndDelete(event, index):
                    () => {}}
                className="sevenGameScreen__gameWrapper__gameScreen__handleItem"
                style={
                  {
                    top: crts[0],
                    left: crts[1],
                    animationDelay: `${crts[2]}s`,
                  }
                }
              />
            )}
          )}
        </div>
      </div>
    </div>
  )
};

export default SevenGameScreen;

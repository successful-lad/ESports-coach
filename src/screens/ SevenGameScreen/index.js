import React, { useState, useEffect } from "react";
import {setGameResult} from "../../api";

import './style.scss';

const SevenGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(0)

  useEffect(()=> {
    if(isGameNow && coordinatesArray.length === 0) {
      setClickDelay(0);

      const circlePart = Array(5)
        .fill([], 0, 5)
        .map(() => {
          return [
            Math.floor(Math.random() * (640 - 40)) + 40,
            Math.floor(Math.random() * (640 - 40)) + 40,
            Math.floor(Math.random() * (5 - 1)) + 1
          ];
        });
      setCoordinatesArray(circlePart)
    }

    if (isGameNow) {
      let timeCountId = setInterval(() => setTimeCount(value => value +1), 1000);
      return () => { clearInterval(timeCountId) };
    }

  }, [isGameNow, timeCount, coordinatesArray, clickDelay]);
//Todo эту игру доделать, там с задержкой до нажатия по кнопкам ещ
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
      //todo пересмотерть второе условие, оно захардкожено
      if (isGameNow && clickDelay < 10) {
        const delayId = setInterval(() => setClickDelay(value => value + 1), 1000)
        return () => {
          clearInterval(delayId)
        }
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
          {coordinatesArray.length > 0 && coordinatesArray.map((crts, index) =>{
         return (
          <div
            key={index}
            onClick={
              (clickDelay >= crts[2] && clickDelay <= crts[2] + 4) ?
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

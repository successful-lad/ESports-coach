import React, { useState, useEffect } from "react";
import {setGameResult} from "../../api";

import './style.scss';

const SevenGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(1)
  const [aimResults, setAimResults] = useState([]);
  const [averageAim, setAverageAim] = useState(0);
  const [defaultTime, setDefaultTime] = useState(0);
  const [timeToFinish, setTimeToFinish] = useState(0);

  useEffect(()=> {
    if(isGameNow && timeCount === 0) {
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
      setDefaultTime(Date.now());
    }
  }, [isGameNow, timeCount]);

  useEffect(() => {
    if (isGameNow) {
      let timeCountId = setInterval(() => setTimeCount(value => value +1), 1000);
      return () => { clearInterval(timeCountId) };
    }
    //тут чекнуть задержку
    if( timeCount === 0 || timeCount === 9 || timeCount === 18) {
      setClickDelay(0)
    }
  }, [clickDelay, isGameNow, timeCount])

  useEffect(() => {
    if (aimResults.length === 10) {
      const randomFuncId = setInterval(() => setTimeToFinish(value => value +1), 1000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [aimResults])

  useEffect(() => {
    if(timeToFinish === 3 ) {
      alert(`Игра окончена, вваш средний aim ${averageAim.toFixed(5)}`)
      setGameResult('game number 6', averageAim)
      setCoordinatesArray([]);
      setTimeCount(0);
      setIsGameNow(false);
      setClickDelay(0)
      setAimResults([]);
      setAverageAim(0);
      setTimeToFinish(0);
    }
  }, [timeToFinish, averageAim])

  useEffect(() =>{
    if (isGameNow && clickDelay < 10) {
      const delayId = setInterval(() => setClickDelay(value => value + 1), 1000)
      return () => {
        clearInterval(delayId)
      }
    } else  {
      setClickDelay(0)
    }
  }, [clickDelay, isGameNow, coordinatesArray]);

  useEffect(() =>{
    if (aimResults.length > 0 && aimResults.length <=10) {
      setAverageAim((aimResults.reduce((a, b) => +a + +b) / aimResults.length).toFixed(2));
    }
  }, [aimResults]);

  const deleteBlock = (id) => {
    setCoordinatesArray(coordinatesArray.filter((arr, index) =>
      id !== index && arr
    ))
  };

  const addScoreAndDelete = (event, index, elementDelay) => {
    let timeDifference = (((Date.now() - defaultTime) / 1000) - elementDelay - 1).toFixed(2)
    setAimResults([...aimResults, timeDifference]);
    event.stopPropagation();
    deleteBlock(index);
  };

  return (
    <div className='sevenGameScreen'>
      <div className='sevenGameScreen__gameDescription'>
        <div className='sevenGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='sevenGameScreen__gameDescription__aboutGame'>
          <div>Нажимайте на круг только после того, как изменится его цвет</div>
          <div>Длительность игры: 10 попыток</div>
          <div>За нажатие на фигуру до изменения цвета: штрафная секунда</div>
        </div>
      </div>
      <div className='sevenGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          className="sevenGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 && coordinatesArray.map((crts, index) => {
            // console.log(`click delay ${clickDelay}`, `elem time ${crts[2]}`)
            return (
              <div
                key={index}
                onClick={
                  (clickDelay >= crts[2] || clickDelay <= crts[2] + 4) ?
                    event => addScoreAndDelete(event, index, crts[2]):
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
        <div className='sevenGameScreen__gameWrapper__optionsBar'>
          <div>В среднем {averageAim}сек</div>
          <div className='sevenGameScreen__gameWrapper__optionsBar__table'>
          {aimResults.length > 0 && aimResults.map((res, index) => (
              <div
                  key={index}
                  className='sevenGameScreen__gameWrapper__optionsBar__item'
              >
                Aim{index +1} {res}</div>
          ))}
          </div>
          <button
              className='sevenGameScreen__gameWrapper__optionsBar__button'
              onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
    </div>
  )
};

export default SevenGameScreen;

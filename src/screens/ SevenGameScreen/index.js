import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const SevenGameScreen = () => {
  const [arrToRender, setArrToRender] = useState([]);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [delayArr, setDelayArr] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [aimResults, setAimResults] = useState([]);
  const [averageAim, setAverageAim] = useState(0);
  const [defaultTime, setDefaultTime] = useState(0);
  const [timeToFinish, setTimeToFinish] = useState(0);

  useEffect(()=> {
    if(coordinatesArray.length === 0) {

      const circlePart = Array(10)
        .fill([], 0, 10)
        .map(() => {
          return [
            Math.floor(Math.random() * (640 - 40)) + 40,
            Math.floor(Math.random() * (640 - 40)) + 40,
          ];
        });

      const delayPart = Array(10)
          .fill([], 0, 10)
          .map(() => {
            return [
              Math.floor(Math.random() * (5 - 1)) + 1
            ];
          });
      setDelayArr(delayPart);
      setCoordinatesArray(circlePart)
    }
  }, [coordinatesArray.length]);

  const onFillArray = useCallback(() => {
      const renderData = Array(10)
          .fill([], 0, 10)
          .map((_, index) => {
            return [
            coordinatesArray[index][0],
            coordinatesArray[index][1],
            delayArr[index]
            ];
          });
    setArrToRender(renderData);
    setDefaultTime(Date.now());
  }, [coordinatesArray, delayArr])

  useEffect(() => {
    if (aimResults.length === 10) {
      setIsGameNow(false);
      setArrToRender([]);
      setCoordinatesArray([]);
      const randomFuncId = setInterval(() => setTimeToFinish(value => value +1), 1000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [aimResults])

  useEffect(() => {
    if (isGameNow && ((arrToRender.length === 0) || timeCount === Math.max(...delayArr) + 1) ) {

      const randomFuncId = setInterval(() => {
        setDefaultTime(0)
        setArrToRender([]);
        setTimeCount(0);
        onFillArray();
      },  1000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [delayArr, isGameNow, onFillArray, timeCount, arrToRender.length]);

  useEffect(() => {
    if (isGameNow) {
      let timeCountId = setInterval(() => setTimeCount(value => value +1), 1000);
      return () => { clearInterval(timeCountId) };
    }
  }, [isGameNow, timeCount])

  useEffect(() => {
    if (aimResults.length === 10) {
      setArrToRender([]);
      setCoordinatesArray([]);
      const randomFuncId = setInterval(() => setTimeToFinish(value => value +1), 1000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [aimResults])

  useEffect(() => {
    if(timeToFinish === 3 ) {
      setArrToRender([]);
      alert(`Игра окончена, вваш средний aim ${averageAim}`)
      setGameResult('game number 6', averageAim)
      setTimeCount(0);
      setIsGameNow(false);
      setAimResults([]);
      setAverageAim(0);
      setTimeToFinish(0);
      setCoordinatesArray([]);
    }
  }, [timeToFinish, averageAim])

  useEffect(() =>{
    if (aimResults.length > 0 && aimResults.length <=10) {
      setAverageAim((aimResults.reduce((a, b) => +a + +b) / aimResults.length).toFixed(3));
    }
  }, [aimResults]);

  const addAimValue = (event, elementDelay) => {
    let timeDifference = ((Date.now() - (defaultTime + elementDelay *1000)) /1000).toFixed(2)
    setAimResults([...aimResults, (timeDifference > 1 || timeDifference < 0) ? 1 : timeDifference]);
    event.stopPropagation();
  };

  const handleMissClick = () => {
    setAimResults([...aimResults, [1]]);
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
          {arrToRender.length > 0 && arrToRender.map((crts, index) => {
            return (
              <div
                key={index}
                onClick={
                  Date.now() - (defaultTime + crts[2] * 1000)  <= 1000   ?
                    event => addAimValue(event, crts[2]):
                    handleMissClick}
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

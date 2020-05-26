import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const SixthGameScreen = () => {
  const [itemDelay, setItemDelay] = useState(0);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [arrToRender, setArrToRender] = useState([])
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(0)
  const [hitResult, setHitResult] = useState([]);
  const [averageAim, setAverageAim] = useState(0);
  const [defaultTime, setDefaultTime] = useState(0);
  const [timeToFinish, setTimeToFinish] = useState(0);

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow) {
      setArrToRender(arrs => [...arrs, Array(1).fill(0, 0,1)])

      const topCoordinates = Math.floor(Math.random() * (610 - 40)) + 40
      const leftCoordinates = Math.floor(Math.random() * (610 - 40)) + 40;
      const delay = Math.floor(Math.random() * (3 - 1)) + 1;
      setCoordinatesArray([topCoordinates, leftCoordinates, delay]);
      setDefaultTime(Date.now());
    }
  }, [isGameNow]);

  //todo поправить окончание игры

  useEffect(() => {
    if (isGameNow && hitResult.length < 11 && arrToRender.length === 0) {
      const randomFuncId = setInterval(() => onRandomShowBlock(), 3000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [hitResult, isGameNow, onRandomShowBlock,  arrToRender.length]);

  useEffect(() =>{
    if (hitResult.length > 0 && hitResult.length <=10) {
      setAverageAim(hitResult.reduce((a, b) => +a + +b) / hitResult.length);
    }
  }, [hitResult])

  useEffect(() => {
    if (hitResult.length === 10) {
      const randomFuncId = setInterval(() => setTimeToFinish(value => value +1), 1000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [hitResult])

  useEffect(() => {
    if (timeToFinish === 3) {
      alert(`Игра окончена, ваш средний Aim ${averageAim.toFixed(5)}`);
      setGameResult('game number 5', averageAim)
      setCoordinatesArray([]);
      setIsGameNow(false);
      setItemDelay(0);
      setDefaultTime(0);
      setHitResult([]);
      setTimeToFinish(0)
    }
  }, [averageAim, timeToFinish])
/* todo чекнуть старую версию страницы, раньше был лучше рирендер елемента и он полностью пропадал */
  useEffect(() =>{
    if (isGameNow && clickDelay < coordinatesArray[2] + 2) {
      const delayId = setInterval(()=> setClickDelay(value => value + 1), 1000 )
      return () => { clearInterval(delayId)}
    } else  {
      setClickDelay(0)
    }

  }, [clickDelay, isGameNow, coordinatesArray])

  const addScoreAndDelete = (event) => {
    let timeDifference = (((Date.now() - defaultTime) / 1000) - 1).toFixed(2)
    setHitResult([...hitResult, timeDifference]);
    event.stopPropagation();
    setItemDelay(0);
    setArrToRender([])
  }

    const handleMissClick = () => {
      setHitResult([...hitResult, [1]]); setArrToRender([])
    };
  return (
    <div className='sixthGameScreen'>
      <div className='sixthGameScreen__gameDescription'>
        <div className='sixthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='sixthGameScreen__gameDescription__aboutGame'>
          <div>Нажимайте на круг только после того, как изменится его цвет</div>
          <div>Длительность игры: 10 попыток</div>
          <div>За нажатие на фигуру до изменения цвета: штрафная секунда</div>
        </div>
      </div>
      <div className='sixthGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          className="sixthGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 && arrToRender.map((_, index) =>
          <div
            key={index}
            onClick={
              clickDelay >= itemDelay ?
                  event => addScoreAndDelete(event, index):
                  handleMissClick}
            className="sixthGameScreen__gameWrapper__gameScreen__handleItem"
            style={
              {
                top: coordinatesArray[0],
                left: coordinatesArray[1],
                animationDelay: `${coordinatesArray[2]}s`,
                animationName: 'changeBgColor'
              }
            }
          />
          )}
        </div>
        <div className='sixthGameScreen__gameWrapper__optionsBar'>
          <button
              className='sixthGameScreen__gameWrapper__optionsBar__button'
              onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div>средний шанс {hitResult.length > 0 ? hitResult.reduce((a, b) => +a + +b) / hitResult.length : 0} сек</div>
          <div
              className='sixthGameScreen__gameWrapper__optionsBar__table'
          >  {hitResult.map((item, index) =>
              <div
                  className='sixthGameScreen__gameWrapper__optionsBar__item'
              >
                {`Aim ${index + 1} ${item}sec`}
              </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default SixthGameScreen;

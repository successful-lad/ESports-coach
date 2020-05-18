import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const SixthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [arrToRender, setArrToRender] = useState([])
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(0)

  const onRandomShowBlock = useCallback(() => {

    setArrToRender(arrs => [...arrs, Array(1).fill(0, 0,1)])

    const topCoordinates = Math.floor(Math.random() * (610 - 40)) + 40
    const leftCoordinates = Math.floor(Math.random() * (610 - 40)) + 40;
    const delay = Math.floor(Math.random() * (3 - 1)) + 1;
    setCoordinatesArray([topCoordinates, leftCoordinates, delay]);
    setTimeCount(value => value + 1);
  }, []);

  //todo поправить окончание игры

  useEffect(() => {
    if (isGameNow && timeCount < 15 ) {
      const randomFuncId = setInterval(() => onRandomShowBlock(), 3000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [timeCount, isGameNow, onRandomShowBlock]);

  useEffect(() => {
    if(timeCount === 15) {
      alert(`Игра окончена, ваш результат ${userHit} очков`)
      setGameResult('game number 6', userHit)
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
    }
  }, [timeCount, userHit])

  useEffect(() =>{
    if (isGameNow && clickDelay < coordinatesArray[2] + 2) {
      const delayId = setInterval(()=> setClickDelay(value => value + 1), 1000 )
      return () => { clearInterval(delayId)}
    } else  {
      setClickDelay(0)
    }

  }, [clickDelay, isGameNow, coordinatesArray])
  const addScoreAndDelete = (event) => {
    setUserHit(value => value +1);
    event.stopPropagation();
    setCoordinatesArray([]);
  };

  return (
    <div className='sixthGameScreen'>
      <div className='sixthGameScreen__gameWrapper'>
        <div className='sixthGameScreen__gameWrapper__settingBar'>
          <button
            className='sixthGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
        <div className='sixthGameScreen__gameWrapper__title'>
          <div>
            Правильных кликов { userHit }
          </div>
        </div>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          className="sixthGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 && arrToRender.map((_, index) =>
          <div
            key={index}
            onClick={
              clickDelay >= coordinatesArray[2] ?
                event => addScoreAndDelete(event):
                () => { alert('Кнопка не активна')}}
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
      </div>
    </div>
  )
};

export default SixthGameScreen;

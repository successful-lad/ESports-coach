import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const EighthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [userScore, setUserScore] = useState(0)
  // const [ userAim, setUserAim ] = useState(0)
  // const [fTime, setFTime] = useState(0);
  // const [timeThenHit, setTimeThenHit] = useState(0);

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow) {
      const topCoordinates = Math.floor(Math.random() * (630 - 40)) + 40
      const leftCoordinates = Math.floor(Math.random() * (630 - 40)) + 40;
      setCoordinatesArray([topCoordinates, leftCoordinates]);
      // setFTime(Date.now());
      // console.log(fTime)
    }
    // }, [fTime, isGameNow]);
  }, [isGameNow]);

  let newTimeOut = 2500;

  if (isGameNow) {
    if (gameDifficulty < 1000) {
      newTimeOut = 2500
    }
    if (gameDifficulty >= 2500) {
      newTimeOut = 750;
    }
    if (gameDifficulty > 1000 && gameDifficulty < 2500) {
      newTimeOut = 3000 - gameDifficulty;
    }
  }
  useEffect(() => {
      let randomFuncId = setInterval(() => onRandomShowBlock(), newTimeOut);
      return () => { clearInterval(randomFuncId)}
  }, [onRandomShowBlock, gameDifficulty, isGameNow, newTimeOut]);


  useEffect(()=> {
    if (isGameNow) {
      let gameTimeId = setInterval(() => setTimeCount( value => value + 1), 1000);
      return () => { clearInterval(gameTimeId)}
    }
  }, [isGameNow])

  useEffect(() => {
    if(timeCount === 120) {
      alert(`Игра окончена, ваш результат ${userScore} очков`)
      setGameResult('game number 8', userScore)
      setUserScore(0);
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
      setGameDifficulty(0)
    }
  }, [timeCount, userHit, userScore])

  /* тут сделать нужное колличество добавлений очек*/

  const addScoreAndDelete = (event) => {
    // setTimeThenHit(Date.now())
    setUserHit(value => value +1);
    setUserScore( value => value + 50);
    event.stopPropagation();
    setCoordinatesArray([]);
    // console.log('timeThenHit',timeThenHit);
    // console.log(`fTime ${fTime}`)
    // console.log((fTime - timeThenHit) / 1000)
  };

  const handleMissingClick = () => {
    if (userScore >= 100) {
      setUserScore(value => value - 100);
    } else {
      setUserScore(0)
    }
  };

  return (
    <div className='eighthGameScreen'>
      <div className='eighthGameScreen__gameWrapper'>
        <div
          style={ !isGameNow ? { pointerEvents: "none" } : null }
          onClick={handleMissingClick}
          className="eighthGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 &&
          <div
            onClick={event => addScoreAndDelete(event)}
            className="eighthGameScreen__gameWrapper__gameScreen__handleItem"
            style={
              {
                top: coordinatesArray[0],
                left: coordinatesArray[1],
              }
            }
          />
          }
        </div>
        <div className='eighthGameScreen__gameWrapper__optionsBar'>
          <div className='eighthGameScreen__gameWrapper__optionsBar__elo'>
            <div>Рейтинг Юзера ЭЛО</div>
            {/*todo поставить валидацию только на числа*/}
            {/*todo добавить тултип дя обьяснения ЕЛО + может его границы */}
            <input
              className='eighthGameScreen__gameWrapper__optionsBar__input'
              type="text"
              onChange={e => setGameDifficulty(+e.target.value)}
            />
          </div>
          <div>набрано очков {userScore}</div>
          <div>осталось времени { 120 - timeCount} </div>
          <button
            className='eighthGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
      <div className='eighthGameScreen__gameDescription'>
        <div className='eighthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='eighthGameScreen__gameDescription__aboutGame'>
          Игра нацелена на улучшение точности, измеряя все попадания и промахи,
          позволяя игроку увидеть свои ошибки, а так же усовершенствовать свои навыки,
          путем усложнения уровня ЕЛО.
        </div>
      </div>
    </div>
  )
};

export default EighthGameScreen;

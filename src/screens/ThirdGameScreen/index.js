import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const ThirdGameScreen = () => {
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [firstCircleHit, setFirstCircleHit] = useState(0)
  const [secondCircleHit, setSecondCircleHit] = useState(0)
  const [thirdCircleHit, setThirdCircleHit] = useState(0)

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow) {

      const topCoordinates = Math.floor(Math.random() * (610 - 40)) + 40
      const leftCoordinates = Math.floor(Math.random() * (610 - 40)) + 40;
      setCircleCoordinates([topCoordinates, leftCoordinates]);
    }
  }, [isGameNow, circleCoordinates]);

  useEffect(()=> {
    if (isGameNow) {
      let gameTimeId = setInterval(() => setTimeCount( value => value + 1), 1000);
      return () => { clearInterval(gameTimeId)}
    }
  }, [isGameNow])

  useEffect(() => {

    let newTimeOut = 2500;

    if (isGameNow) {
      if (gameDifficulty < 1000) {
        newTimeOut = 2500
      }
      if (gameDifficulty >= 2500 ) {
        newTimeOut = 500;
      }
      if(gameDifficulty > 1000 && gameDifficulty < 2500) {
        newTimeOut = 3000 - gameDifficulty;
      }
      let randomFuncId = setInterval(() => onRandomShowBlock(), newTimeOut);
      return () => { clearInterval(randomFuncId)}
    }
  }, [onRandomShowBlock, gameDifficulty, isGameNow]);

  useEffect(() => {
    if(timeCount === 120) {
      alert(`Игра окончена, ваш результат ${userScore} очков`)
      setGameResult('game number 3', userScore)
      setCircleCoordinates([]);
      setTimeCount(0);
      setUserScore(userScore);
      setUserHit(0);
      setIsGameNow(false);
      setGameDifficulty(0)
      setFirstCircleHit(0);
      setSecondCircleHit(0);
      setThirdCircleHit(0);

    }
  }, [timeCount, userHit, userScore])

  const addScore = (event, scorePerHit, circleMark) => {
    setUserScore(value => value + scorePerHit);
    setUserHit(value => value +1)
    event.stopPropagation();
    setCircleCoordinates([]);

    // eslint-disable-next-line default-case
    switch (circleMark) {
      case (1): {
        setFirstCircleHit(value => value +1);
        break;
      }
      case (2): {
        setSecondCircleHit(value => value +1);
        break;
      }
      case (3): {
        setThirdCircleHit(value => value + 1);
        break;
      }
    }
  };

  const handleMissingClick = () => {
    if (userScore >= 100) {
      setUserScore(value => value - 100);
    } else {
      setUserScore(0)
    }
  };

  return (
    <div className='thirdGameScreen'>
      <div className='thirdGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? { pointerEvents: "none" } : null}
          onClick={ handleMissingClick }
          className="thirdGameScreen__gameWrapper__gameScreen">
          {circleCoordinates.length > 0 &&
          <div
            className='thirdGameScreen__gameWrapper__gameScreen__scoreGraduation'
            onClick={event => addScore(event, 50, 1)}
            style={{
              width: 80,
              height: 80,
              background: 'darkblue',
              top: circleCoordinates[0],
              left: circleCoordinates[1]
            }}
          >
            <div
              className='thirdGameScreen__gameWrapper__gameScreen__scoreGraduation'
              onClick={event => addScore(event, 150, 2)}
              style={{
                width: 60,
                height: 60,
                background: 'red'
              }}
            >
              <div
                className='thirdGameScreen__gameWrapper__gameScreen__scoreGraduation'
                onClick={event => addScore(event, 300, 3)}
                style={{
                  width: 30,
                  height: 30,
                  background: 'yellow'
                }}
              />
            </div>
          </div>
          }
        </div>
        <div className='secondGameScreen__gameWrapper__optionsBar'>
          <div className='secondGameScreen__gameWrapper__optionsBar__elo'>
            <div>Рейтинг Юзера ЭЛО</div>
            {/*todo поставить валидацию только на числа*/}
            {/*todo добавить тултип дя обьяснения ЕЛО + может его границы */}
            <input
              className='secondGameScreen__gameWrapper__optionsBar__input'
              type="text"
              onChange={e => setGameDifficulty(+e.target.value)}
            />
          </div>
          <div>Набрано очков {userScore}</div>
          <div>Осталось времени {120 - timeCount}</div>
          <div>Попаданий в 1 диаметр {firstCircleHit}</div>
          <div>Попаданий во 2 диаметр {secondCircleHit}</div>
          <div>Попаданий в 3 диаметр {thirdCircleHit}</div>
          <button
            className='secondGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
      <div className='secondGameScreen__gameDescription'>
        <div className='secondGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='secondGameScreen__gameDescription__aboutGame'>
          Игра нацелена на улучшение точности, измеряя все попадания и промахи,
          позволяя игроку увидеть свои ошибки, а так же усовершенствовать свои навыки,
          путем усложнения уровня ЕЛО.
        </div>
      </div>
    </div>
  )
};

export default ThirdGameScreen;

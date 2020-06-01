import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const SecondGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [userMissed, setUserMissed] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(+localStorage.getItem("elo") || 0);
  const [userScore, setUserScore] = useState(0)

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow) {
      const topCoordinates = Math.floor(Math.random() * (610 - 40)) + 40
      const leftCoordinates = Math.floor(Math.random() * (610 - 40)) + 40;
      setCoordinatesArray([topCoordinates, leftCoordinates]);
    }
  }, [isGameNow]);

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

  useEffect(()=> {
    if (isGameNow) {
      let gameTimeId = setInterval(() => setTimeCount( value => value + 1), 1000);
      return () => { clearInterval(gameTimeId)}
    }
  }, [isGameNow])

  useEffect(() => {
    if(timeCount === 120) {
      setGameResult('game number 1', userScore, gameDifficulty || 1000 )
      alert(`Игра окончена, ваш результат ${userScore} очков`)
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserScore(0);
      setUserHit(0);
      setUserMissed(0);
      setIsGameNow(false);
    }
  }, [timeCount, userHit, userScore, gameDifficulty])

  const addScoreAndDelete = (event) => {
    setUserHit(value => value + 1);
    setUserScore( value => value + 300);
    event.stopPropagation();
    setCoordinatesArray([]);
  };

  const handleMissingClick = () => {
    setUserMissed(value => value +1 );
    setUserScore(value => value - 100);
  };

  const setDifficulty = (event) => {
    setGameDifficulty(+event.target.value)
    localStorage.setItem("elo", event.target.value)
  };

  return (
    <div className='secondGameScreen'>
      <div className='secondGameScreen__gameDescription'>
        <div className='secondGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='secondGameScreen__gameDescription__aboutGame'>
          <div>Нажимайте на шар сразу после появления</div>
          <div>Длительность игры: 120 сек.</div>
          <div>За попадание: +300 оч.</div>
          <div>За промах: -100 оч.</div>
        </div>
      </div>
      <div className='secondGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          onClick={handleMissingClick}
          className="secondGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 &&
              <div
                onClick={event => addScoreAndDelete(event)}
                className="secondGameScreen__gameWrapper__gameScreen__handleItem"
                style={
                  {
                    top: coordinatesArray[0],
                    left: coordinatesArray[1],
                  }
                }
              />
          }
        </div>
        <div className='secondGameScreen__gameWrapper__optionsBar'>
          <div className='secondGameScreen__gameWrapper__optionsBar__elo'>
            <div>Рейтинг Юзера ELO</div>
            {/*todo поставить валидацию только на числа*/}
            {/*todo добавить тултип дя обьяснения ЕЛО + может его границы */}
            <input
              className='secondGameScreen__gameWrapper__optionsBar__input'
              type="text"
              onChange={event => setDifficulty(event)}
              value={gameDifficulty}
            />
          </div>
          <div>Счет: {userScore}</div>
          <div>Попаданий: {userHit}</div>
          <div>Промахов: {userMissed}</div>
          <div>Осталось времени: {120 - timeCount}</div>
          <button
            className='secondGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
    </div>
  )
};

export default SecondGameScreen;

import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import triangleIcon from '../../assets/img/triangle.svg';
import './style.scss';

const FourthGameScreen = () => {
  const [figureCoordinates, setFigureCoordinates] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(+localStorage.getItem("elo") || 0);
  const [userScore, setUserScore] = useState(0);
  const [userMissClick, setUserMissClick] = useState(0)

  const onRandomShowBlock = useCallback(() => {

    const topCoordinates = Math.floor(Math.random() * (650 - 40)) + 40
    const leftCoordinates = Math.floor(Math.random() * (650 - 40)) + 40;
    const whichFigures = Math.floor(Math.random() * 3);
    setFigureCoordinates([topCoordinates, leftCoordinates, whichFigures]);
  }, []);

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
      alert(`Игра окончена, ваш результат ${userScore} очков`)
      setGameResult('game number 3', userScore, gameDifficulty || 1000)
      setFigureCoordinates([]);
      setUserScore(0);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
      setUserMissClick(0);
    }
  }, [userScore, timeCount, userHit, gameDifficulty])

  const addScoreAndDelete = (event, scorePerHit, mark) => {
    switch (mark) {
      case ('+'): {
        setUserScore( value => value + scorePerHit);
        setUserHit(value => value +1);
        break;
      }
      default:
      case ('-'): {
        setUserMissClick(value => value + 1)
        setUserScore(value => value - scorePerHit);
      }
    }

    event.stopPropagation()
    setFigureCoordinates([]);
  };

  const handleMissClick = () => {
    setUserScore(value => value - 100);
    setUserMissClick(value => value + 1)
  };

  const setDifficulty = (event) => {
    setGameDifficulty(+event.target.value)
    localStorage.setItem("elo", event.target.value)
  };
  return (
    <div className='fourthGameScreen'>
      <div className='fourthGameScreen__gameDescription'>
        <div className='fourthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='fourthGameScreen__gameDescription__aboutGame'>
          <div>Нажимайте только на круг</div>
          <div>Длительность игры: 120 сек.</div>
          <div>За попадание в круг: +300 оч.</div>
          <div>За попадание в другие фигуры: -150 оч.</div>
          <div>За промах в фигуру «круг»: -100 оч.</div>
        </div>
      </div>
      <div className='fourthGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          onClick={handleMissClick}
          className="fourthGameScreen__gameWrapper__gameScreen">
          {figureCoordinates.length > 0 && figureCoordinates[2] === 0 && (
            <div
              onClick={event => addScoreAndDelete(event, 300, '+')}
              className="fourthGameScreen__gameWrapper__gameScreen__handleItem"
              style={{
                top: figureCoordinates[0],
                left: figureCoordinates[1],
                borderRadius: '50%',
              }}
            />
          )
         }
          {figureCoordinates.length > 0 && figureCoordinates[2] === 1 && (
            <img
              alt='triangle'
              src={triangleIcon}
              onClick={event => addScoreAndDelete(event, 150, '-')}
              className="fourthGameScreen__gameWrapper__gameScreen__handleItem"
              style={
                {
                  top: figureCoordinates[0],
                  left: figureCoordinates[1],
                  background: 'inherit',
                  border: 'none'
                }}
            />
          )
          }
          {figureCoordinates.length > 0 && figureCoordinates[2] === 2 && (
            <div
              onClick={event => addScoreAndDelete(event, 150, '-')}
              className="fourthGameScreen__gameWrapper__gameScreen__handleItem"
              style={{top: figureCoordinates[0], left: figureCoordinates[1]}}
            />
          )
          }
        </div>
        <div className='fourthGameScreen__gameWrapper__optionsBar'>
          <div className='fourthGameScreen__gameWrapper__optionsBar__elo'>
            <div>Рейтинг Юзера ЭЛО</div>
            {/*todo поставить валидацию только на числа*/}
            {/*todo добавить тултип дя обьяснения ЕЛО + может его границы */}
            <input
              className='fourthGameScreen__gameWrapper__optionsBar__input'
              type="text"
              onChange={event => setDifficulty(event)}
              value={gameDifficulty}
            />
          </div>
          <div>Счет: {userScore}</div>
          <div>Попаданий: {userHit}</div>
          <div>Промахов: {userMissClick}</ div>
          <div>Осталось времени: { 120 - timeCount} </div>
          <button
            className='fourthGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
    </div>
  )
};

export default FourthGameScreen;


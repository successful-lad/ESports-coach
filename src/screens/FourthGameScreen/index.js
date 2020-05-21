import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import triangleIcon from '../../assets/img/triangle.svg';
import './style.scss';

const FourthGameScreen = () => {
  const [figureCoordinates, setFigureCoordinates] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const onRandomShowBlock = useCallback(() => {

    const topCoordinates = Math.floor(Math.random() * (650 - 40)) + 40
    const leftCoordinates = Math.floor(Math.random() * (650 - 40)) + 40;
    const whichFigures = Math.floor(Math.random() * 3);
    setFigureCoordinates([topCoordinates, leftCoordinates, whichFigures]);
    setTimeCount(value => value + 1);
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
/*todo чекнуть тут время, оно себя странно ведет */
  useEffect(()=> {
    if (isGameNow) {
      let gameTimeId = setInterval(() => setTimeCount( value => value + 1), 1000);
      return () => { clearInterval(gameTimeId)}
    }
  }, [isGameNow])

  useEffect(() => {
    if(timeCount === 120) {
      alert(`Игра окончена, ваш результат ${userScore} очков`)
      setGameResult('game number 4', userScore)
      setFigureCoordinates([]);
      setUserScore(0);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
      setGameDifficulty(0)
    }
  }, [userScore, timeCount, userHit])

  const addScoreAndDelete = (event, scorePerHit, mark) => {
    // eslint-disable-next-line default-case
    switch (mark) {
      case ('+'): {
        setUserScore( value => value + scorePerHit)
        break;
      }
      case ('-'): {
        if (userScore >= 150) {
          setUserScore(value => value - scorePerHit);
        } else {
          setUserScore(0)
        }
      }
    }

    event.stopPropagation()
    setFigureCoordinates([]);
  };

  const handleMissClick = () => {
    if (userScore >= 100) {
      setUserScore(value => value - 100);
    }
  };

  return (
    <div className='fourthGameScreen'>
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
              onClick={event => addScoreAndDelete(event, 20, '-')}
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
              onChange={e => setGameDifficulty(+e.target.value)}
            />
          </div>
          <div>набрано очков {userScore}</div>
          <div>осталось времени { 120 - timeCount} </div>
          <button
            className='fourthGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
      <div className='fourthGameScreen__gameDescription'>
        <div className='fourthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='fourthGameScreen__gameDescription__aboutGame'>
          Игра нацелена на улучшение точности, измеряя все попадания и промахи,
          позволяя игроку увидеть свои ошибки, а так же усовершенствовать свои навыки,
          путем усложнения уровня ЕЛО.
        </div>
      </div>
    </div>
  )
};

export default FourthGameScreen;


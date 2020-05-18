import React, { useState, useEffect, useMemo, useCallback } from "react";
import {setGameResult} from "../../api";
import triangleIcon from '../../assets/img/triangle.svg';

import './style.scss';

const FourthGameScreen = () => {
  const [figureCoordinates, setFigureCoordinates] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [userMissed, setUserMissed] = useState(0);
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
    if (isGameNow && timeCount < 30) {
      let newTimeOut = 2000;
      if (gameDifficulty) {
        newTimeOut = 2000 - gameDifficulty * 15;
      }
      let randomFuncId = setInterval(() => onRandomShowBlock(), newTimeOut);
      return () => { clearInterval(randomFuncId)}
    }
  }, [timeCount, isGameNow, onRandomShowBlock, gameDifficulty]);

  useEffect(() => {
    if(timeCount === 30) {
      alert(`Игра окончена, ваш результат ${userScore} очков`)
      setGameResult('game number 4', userScore)
      setFigureCoordinates([]);
      setTimeCount(0);
      setUserHit(0);
      setUserMissed(0);
      setIsGameNow(false);
      setGameDifficulty(0)
    }
  }, [userScore, timeCount, userHit])

  const chanceToHit = useMemo(() => {
      if(isNaN(userHit/userMissed)) {
        return 100
      } else  {
        return (100 - (100 /((userHit + userMissed)) * userMissed)).toFixed(2);
      }
    }
    ,
    [userMissed, userHit])

  const addScoreAndDelete = (event, scorePerHit, mark) => {
    setUserScore(value => mark === '+' ? value +scorePerHit : value - scorePerHit)
    if (mark === '+') {
      setUserHit(value => value +1)
    } else {
      setUserMissed(value => value +1)
    }
    event.stopPropagation()
    setFigureCoordinates([]);
  };

  return (
    <div className='fourthGameScreen'>
      <div className='fourthGameScreen__gameWrapper'>
        <div className='fourthGameScreen__gameWrapper__settingBar'>
          <button
            className='fourthGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div className='fourthGameScreen__gameWrapper__settingBar__difficultyScale'>
            0
            <input
              type="range"
              min={0}
              max={100}
              onChange={e => setGameDifficulty(+e.target.value)}
              value={gameDifficulty}
            />
            100
          </div>
        </div>
        <div className='fourthGameScreen__gameWrapper__title'>
          <div>
            Очки пользователя { userScore }
          </div>
          <div>
            Шанс попадения {chanceToHit}
          </div>
        </div>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          onClick={() => setUserMissed(value => value +1 ) }
          className="fourthGameScreen__gameWrapper__gameScreen">
          {figureCoordinates.length > 0 && figureCoordinates[2] === 0 && (
            <div
              onClick={event => addScoreAndDelete(event, 50, '+')}
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
              onClick={event => addScoreAndDelete(event, 20, '-')}
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
      </div>
    </div>
  )
};

export default FourthGameScreen;


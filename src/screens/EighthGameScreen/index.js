import React, { useState, useEffect, useMemo, useCallback } from "react";

import './style.scss';

const EighthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [userMissed, setUserMissed] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [userScore, setUserScore] = useState(0)

  const onRandomShowBlock = useCallback(() => {

    const topCoordinates = Math.floor(Math.random() * (650 - 40)) + 40
    const leftCoordinates = Math.floor(Math.random() * (650 - 40)) + 40;
    setCoordinatesArray([topCoordinates, leftCoordinates]);
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
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setUserMissed(0);
      setIsGameNow(false);
      setGameDifficulty(0)
    }
  }, [timeCount, userHit, userScore])

  const chanceToHit = useMemo(() => {
    if(isNaN(userHit/userMissed)) {
      return 100
    } else  {
      return (100 - (100 /((userHit + userMissed)) * userMissed)).toFixed(2);
    }
  }, [userMissed, userHit])

  const addScoreAndDelete = (event) => {
    setUserHit(value => value +1);
    setUserScore( value => value + 50);
    event.stopPropagation();
    setCoordinatesArray([]);
  };

  const handleMissingClick = () => {
    setUserMissed(value => value +1 );
    if (userScore >= 20) {
      setUserScore(value => value - 20);
    } else {
      setUserScore(0)
    }
  };

  return (
    <div className='eighthGameScreen'>
      <div className='eighthGameScreen__gameWrapper'>
        <div className='eighthGameScreen__gameWrapper__settingBar'>
          <button
            className='eighthGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div className='eighthGameScreen__gameWrapper__settingBar__difficultyScale'>
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
        <div className='eighthGameScreen__gameWrapper__title'>
          <div>
            Очки пользователя { userScore }
          </div>
          <div>
            Шанс попадения {chanceToHit}
          </div>
        </div>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          onClick={handleMissingClick}
          // onClick={() => setUserMissed(value => value +1 )
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
      </div>
    </div>
  )
};

export default EighthGameScreen;

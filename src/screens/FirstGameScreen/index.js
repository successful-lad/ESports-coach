import React, { useState, useEffect, useMemo, useCallback } from "react";
import { setGameResult } from '../../api';

import './style.scss';

const NinthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [userMissed, setUserMissed] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
/* Todo Спросить Илью Про useCallback*/

  const onRandomShowBlock = useCallback(() => {

    const topCoordinates = Math.floor(Math.random() * (650 - 40)) + 40
    const leftCoordinates = Math.floor(Math.random() * (650 - 40)) + 40;
    setCoordinatesArray([...coordinatesArray, [topCoordinates, leftCoordinates]]);
    setTimeCount(value => value + 1);
  }, [coordinatesArray]);

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
      alert(`Игра окончена, ваш результат ${userHit * 50} очков`)
      setGameResult('game number 1', userHit * 50)
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setUserMissed(0);
      setIsGameNow(false);
      setGameDifficulty(0)
    }
  }, [timeCount, userHit])

  const chanceToHit = useMemo(() => {
    if(isNaN(userHit/userMissed)) {
      return 100
    } else  {
      return (100 - (100 /((userHit + userMissed)) * userMissed)).toFixed(2);
    }
  }
     ,
    [userMissed, userHit])

  const deleteBlock = (id) => {
    setCoordinatesArray(coordinatesArray.filter((arr, index) =>
      id !== index && arr
    ))
  };

  const addScore = (event, index) => {
    setUserHit(value => value +1)
    event.stopPropagation()
    deleteBlock(index);
  };

  return (
    <div className='firstGameScreen'>
      <div className='firstGameScreen__gameWrapper'>
        <div className='firstGameScreen__gameWrapper__settingBar'>
          <button
            className='firstGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div className='firstGameScreen__gameWrapper__settingBar__difficultyScale'>
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
        <div className='firstGameScreen__gameWrapper__title'>
          <div>
          Очки пользователя { userHit * 50 }
        </div>
          <div>
          Шанс попадения {chanceToHit}
        </div>
        </div>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          onClick={() => setUserMissed(value => value +1 ) }
          className="firstGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 && coordinatesArray.map((crts, index) =>{
            return (
              <div
                key={index}
                onClick={event => addScore(event, index)}
                className="firstGameScreen__gameWrapper__gameScreen__handleItem"
                style={{top: crts[0], left: crts[1]}}
              />
            )
          } )}
        </div>
      </div>
    </div>
  )
};

export default NinthGameScreen;

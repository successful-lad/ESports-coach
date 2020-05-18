import React, { useState, useEffect, useMemo, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const ThirdGameScreen = () => {
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [userMissed, setUserMissed] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const onRandomShowBlock = useCallback(() => {

    const topCoordinates = Math.floor(Math.random() * (590 - 40)) + 40
    const leftCoordinates = Math.floor(Math.random() * (590 - 40)) + 40;
    setCircleCoordinates([topCoordinates, leftCoordinates]);
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
      alert(`Игра окончена, ваш результат ${userScore * 50} очков`)
      setGameResult('game number 3', userScore * 50)
      setCircleCoordinates([]);
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
    }
    ,
    [userMissed, userHit])

  const addScore = (event, scorePerHit) => {
    setUserScore(value => value + scorePerHit);
    setUserHit(value => value +1)
    event.stopPropagation()
    setCircleCoordinates([]);
  };

  return (
    <div className='thirdGameScreen'>
      <div className='thirdGameScreen__gameWrapper'>
        <div className='thirdGameScreen__gameWrapper__settingBar'>
          <button
            className='thirdGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div className='thirdGameScreen__gameWrapper__settingBar__difficultyScale'>
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
        <div className='thirdGameScreen__gameWrapper__title'>
          <div>
            Очки пользователя { userScore }
          </div>
          <div>
            Шанс попадения {chanceToHit}
          </div>
        </div>
        <div
          style={!isGameNow ? { pointerEvents: "none" } : null}
          onClick={() => setUserMissed(value => value +1 ) }
          className="thirdGameScreen__gameWrapper__gameScreen">
          {circleCoordinates.length > 0 &&
              <div
                onClick={event => addScore(event, 10)}
                className="thirdGameScreen__gameWrapper__gameScreen__handleItem"
                style={{
                  top: circleCoordinates[0],
                  left: circleCoordinates[1],
                  background: 'black'
                }}
              >
                <div
                  className='thirdGameScreen__gameWrapper__gameScreen__handleItem__scoreGraduation'
                  onClick={event => addScore(event, 20)}
                  style={{
                    width: 80,
                    height: 80,
                    background: 'white'
                  }}
                >
                  <div
                    className='thirdGameScreen__gameWrapper__gameScreen__handleItem__scoreGraduation'
                    onClick={event => addScore(event, 40)}
                    style={{
                      width: 60,
                      height: 60,
                      background: 'black'
                    }}
                  >
                    <div
                      className='thirdGameScreen__gameWrapper__gameScreen__handleItem__scoreGraduation'
                      onClick={event => addScore(event, 50)}
                      style={{
                        width: 40,
                        height: 40,
                        background: 'white'
                      }}
                      />
                  </div>
                </div>
              </div>
            }
        </div>
      </div>
    </div>
  )
};

export default ThirdGameScreen;

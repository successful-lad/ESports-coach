import React, { useState, useEffect } from "react";

import './style.scss';
import {setGameResult} from "../../api";

const NinthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);

  useEffect(()=> {
    if(isGameNow && (timeCount === 0 || timeCount === 30)) {
      const circlePart = Array(60)
        .fill([], 0, 60)
        .map((item, index) => {
          return [
            Math.floor(Math.random() * (650 - 40)) + 40,
            Math.floor(Math.random() * (650 - 40)) + 40,
            index <= 19 ? "small" : (index > 19 && index <= 40) ? "middle" : "big"
          ];
        });
      setCoordinatesArray(circlePart)
    }
    if (isGameNow) {
      let timeCountId = setInterval(() => setTimeCount(value => value +1), 1000);
      return () => { clearInterval(timeCountId) };
    }

  }, [isGameNow, timeCount]);

  useEffect(() => {
    if(timeCount === 90) {
      alert(`Игра окончена, вы сбили ${userHit} из 180 шаров`)
      setGameResult('game number 9', userHit)

      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
    }
  }, [timeCount, userHit])

  const deleteBlock = (event, id) => {
    event.stopPropagation();
    setUserHit(value => value + 1)
    setCoordinatesArray(coordinatesArray.filter((arr, index) =>
      id !== index
  ))
  };

  return (
    <div className='ninthGameScreen'>
      <div className='ninthGameScreen__gameWrapper'>
        <div className='ninthGameScreen__gameWrapper__settingBar'>
          <button
            className='ninthGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
        <div className='ninthGameScreen__gameWrapper__title'>
          <div>
            Осталось попасть по { coordinatesArray.length } шарам
          </div>
          <div>
            Осталось времени {
            timeCount < 31 ? 30 - timeCount : timeCount > 30 && timeCount < 61 ? 60 - timeCount : 89 - timeCount
          }
          </div>
        </div>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          className="ninthGameScreen__gameWrapper__gameScreen">
          {coordinatesArray.length > 0 && coordinatesArray.map((crts, index) =>
            <div
              key={index}
              onClick={event => deleteBlock(event, index)}
              className={`ninthGameScreen__gameWrapper__gameScreen__handleItem-${crts[2]}`}
              style={{
                top: crts[0],
                left: crts[1],
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
};

export default NinthGameScreen;

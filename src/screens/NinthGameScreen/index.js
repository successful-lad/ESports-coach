import React, { useState, useEffect } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const NinthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [firstAim, setFirstAim] = useState(0);
  const [secondAim, setSecondAim] = useState(0);
  const [thirdAim, setThirdAim] = useState(0);
  const [roundTime, setRoundTime] = useState(0);
  const [allUserHit, setAllUserHit] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [userMissClick, setUserMissClick] = useState(0);

  useEffect(()=> {
    if (isGameNow && timeCount === 0) {
      const circlePart = Array(40)
        .fill([], 0, 40)
        .map(_ => {
          return [
            Math.floor(Math.random() * (650 - 40)) + 40,
            Math.floor(Math.random() * (650 - 40)) + 40,
            "small"
          ];
        });
      setCoordinatesArray(circlePart)
    }
    if (isGameNow && timeCount === 41) {
      const circlePart = Array(40)
        .fill([], 0, 40)
        .map(_ => {
          return [
            Math.floor(Math.random() * (650 - 40)) + 40,
            Math.floor(Math.random() * (650 - 40)) + 40,
            "middle"
          ];
        });
      setCoordinatesArray(circlePart)
    }
    if (isGameNow && timeCount === 81) {
      const circlePart = Array(40)
        .fill([], 0, 40)
        .map(_ => {
          return [
            Math.floor(Math.random() * (650 - 40)) + 40,
            Math.floor(Math.random() * (650 - 40)) + 40,
            "big"
          ];
        });
      setCoordinatesArray(circlePart)
    }
  }, [isGameNow, timeCount]);

  useEffect(() => {
    if (isGameNow) {
      let timeCountId = setInterval(() => setTimeCount(value => value + 1), 1000);
      return () => {
        clearInterval(timeCountId)
      };
    }
  }, [isGameNow]);

  useEffect(() => {
      const rTime = timeCount < 41 ? 40 - timeCount : timeCount > 40 && timeCount < 81 ? 80 - timeCount : 120 - timeCount;
      setRoundTime(rTime);
  }, [timeCount]);

  useEffect(() => {
    if ((coordinatesArray.length === 0 && (timeCount > 0 && timeCount < 40)) || timeCount === 40) {
      setFirstAim((41 - roundTime)/userHit);
      setTimeCount(41);
      setUserHit(0);
    }

    if ((coordinatesArray.length === 0 && (timeCount > 40 && timeCount < 80)) || timeCount === 80) {
      setSecondAim((41 - roundTime)/userHit);
      setUserHit(0);
      if ((coordinatesArray.length === 0 && (timeCount > 42 && timeCount < 80)) || timeCount === 80) {
        setTimeCount(81);
      }
    }

    if ((coordinatesArray.length === 0 && (timeCount > 80 && timeCount < 120)) || timeCount === 120) {
      setThirdAim((41 - roundTime)/userHit);
      setUserHit(0);
      if ((coordinatesArray.length === 0 && (timeCount > 82 && timeCount < 120)) || timeCount === 120) {
        setTimeCount(121);
      }
    }
  }, [userHit, roundTime, coordinatesArray, timeCount])

  useEffect(() => {
    if(timeCount === 124) {
      alert(`Игра окончена, ваш счет ${userScore}`)
      setGameResult('game number 9', userScore, +localStorage.getItem("elo") || 0)
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
      setAllUserHit(0);
      setThirdAim(0);
      setSecondAim(0);
      setFirstAim(0);
      setUserScore(0);
      setUserMissClick(0)
    }
  }, [userScore, timeCount])

  const deleteBlock = (event, id, blockMark) => {
    // eslint-disable-next-line default-case
    switch (blockMark) {
      case 'small': {
        setUserScore(value => value + 300)
        break;
      }
      case 'middle': {
        setUserScore(value => value + 200)
        break;
      }
      case 'big': {
        setUserScore(value => value + 100)
        break;
      }
    }
    event.stopPropagation();
    setUserHit(value => value + 1)
    setAllUserHit( value => value +1);
    setCoordinatesArray(coordinatesArray.filter((arr, index) =>
      id !== index
  ))
  };
  const handleMissing = () => {
    setUserScore(value => value - 100);
    setUserMissClick(value => value + 1)
  };

  return (
    <div className='ninthGameScreen'>
      <div className='ninthGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          className="ninthGameScreen__gameWrapper__gameScreen"
          onClick={handleMissing}
        >
          {coordinatesArray.length > 0 && coordinatesArray.map((crts, index) =>
            <div
              key={index}
              onClick={event => deleteBlock(event, index, crts[2])}
              className={`ninthGameScreen__gameWrapper__gameScreen__handleItem-${crts[2]}`}
              style={{
                top: crts[0],
                left: crts[1],
              }}
            />
          )}
        </div>
        <div className='ninthGameScreen__gameWrapper__optionsBar'>
          <button
            className='ninthGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div>
            { (isGameNow || coordinatesArray.length > 0 ) && timeCount < 121 &&
            `время до конца раунда ${roundTime}`}
          </div>
          <div>
            {`Очки ${userScore}`}
          </div>
          <div>{`Попаданий ${allUserHit}`}</div>
          <div>{`Промахов ${userMissClick}`}</div>
          <div>{`Aim1 ${isFinite(firstAim) ? firstAim : 0}сек`}</div>
          <div>{`Aim2 ${isFinite(secondAim) ? secondAim : 0}сек`}</div>
          <div>{`Aim3 ${isFinite(thirdAim) ? thirdAim : 0}сек`}</div>
        </div>
    </div>
      <div className='ninthGameScreen__gameDescription'>
        <div className='ninthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='ninthGameScreen__gameDescription__aboutGame'>
          Игра нацелена на улучшение точности, измеряя все попадания и промахи,
          позволяя игроку увидеть свои ошибки, а так же усовершенствовать свои навыки,
          путем усложнения уровня ЕЛО.
        </div>
      </div>
    </div>
  )
};

export default NinthGameScreen;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { setGameResult } from '../../api';

import './style.scss';

const NinthGameScreen = () => {
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [userMissed, setUserMissed] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [gameDifficulty, setGameDifficulty] = useState(+localStorage.getItem("elo") || 0);
  const [userScore, setUserScore] = useState(0);

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow) {
      const topCoordinates = Math.floor(Math.random() * (650 - 40)) + 40
      const leftCoordinates = Math.floor(Math.random() * (650 - 40)) + 40;
      setCoordinatesArray([...coordinatesArray, [topCoordinates, leftCoordinates]]);
    }
  }, [coordinatesArray, isGameNow]);

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
      setGameResult('game number 1', userScore, gameDifficulty || 1000)
      setCoordinatesArray([]);
      setTimeCount(0);
      setUserHit(0);
      setUserMissed(0);
      setIsGameNow(false);
      setUserScore(0);
    }
  }, [timeCount, userHit, userScore, gameDifficulty])

  const chanceToHit = useMemo(() => {
    if(isNaN(userHit/userMissed)) {
      return 100
    } else  {
      return (100 - (100 /((userHit + userMissed)) * userMissed)).toFixed(2);
    }
  },[userMissed, userHit])

  const deleteBlock = (id) => {
    setCoordinatesArray(coordinatesArray.filter((arr, index) =>
      id !== index && arr
    ))
  };

  const addScore = (event, index) => {
    setUserScore(value => value + 300);
    setUserHit(value => value + 1);
    event.stopPropagation();
    deleteBlock(index);
  };

  const decUserScore = () => {
    setUserScore(value => value - 100);
    setUserMissed(value => value + 1);
  };

  const setDifficulty = (event) => {
    setGameDifficulty(+event.target.value)
    localStorage.setItem("elo", event.target.value)
  };

  return (
    <div className='firstGameScreen'>
      <div className='firstGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? {pointerEvents: "none"} : null}
          onClick={decUserScore}
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
        <div className='firstGameScreen__gameWrapper__optionsBar'>
          <div className='firstGameScreen__gameWrapper__optionsBar__elo'>
            <div>Рейтинг Юзера ЭЛО</div>
            {/*todo поставить валидацию только на числа*/}
            {/*todo добавить тултип дя обьяснения ЕЛО + может его границы */}
            <input
              className='firstGameScreen__gameWrapper__optionsBar__input'
              type="text"
              onChange={event => setDifficulty(event)}
              value={gameDifficulty}
            />
          </div>
          <div>набрано очков {userScore}</div>
          <div>осталось времени { 120 - timeCount} </div>
          <div> процент попадания {chanceToHit}%</div>
          <button
            className='firstGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
        </div>
      </div>
      <div className='firstGameScreen__gameDescription'>
        <div className='firstGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='firstGameScreen__gameDescription__aboutGame'>
            Игра нацелена на улучшение точности, измеряя все попадания и промахи,
            позволяя игроку увидеть свои ошибки, а так же усовершенствовать свои навыки,
            путем усложнения уровня ЕЛО.
        </div>
      </div>
    </div>
  )
};

export default NinthGameScreen;

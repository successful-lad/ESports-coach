import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";
import { history } from "../../configureStore";
import routes from "../../consts/routes";

import './style.scss';

const FifthGameScreen = () => {
  const [itemDelay, setItemDelay] = useState(0);
  const [arrToRender, setArrToRender] = useState([])
  const [timeCount, setTimeCount] = useState(0);
  const [userHit, setUserHit] = useState(0);
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(0)
  const onRandomShowBlock = useCallback(() => {

    setArrToRender(() => [Array(1).fill(0, 0,1)])

    const delay = Math.floor(Math.random() * (3 - 1)) + 1;
    setItemDelay(delay);
    setTimeCount(value => value + 1);

  }, []);

  useEffect(() => {
    if (isGameNow && timeCount < 15) {
      const randomFuncId = setInterval(() => onRandomShowBlock(), 3000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [timeCount, isGameNow, onRandomShowBlock]);

  useEffect(() => {
    if(timeCount === 15) {
      alert(`Игра окончена, ваш результат ${userHit} очков`)
      setGameResult('game number 5', userHit)
      setItemDelay(0);
      setTimeCount(0);
      setUserHit(0);
      setIsGameNow(false);
    }
  }, [timeCount, userHit])

  useEffect(() =>{
    if (isGameNow && clickDelay < itemDelay + 2) {
      const delayId = setInterval(()=> setClickDelay(value => value + 1), 1000 )
      return () => { clearInterval(delayId)}
    } else  {
      setClickDelay(0)
    }

  }, [clickDelay, isGameNow, itemDelay])
  const addScoreAndDelete = (event) => {
    setUserHit(value => value +1);
    event.stopPropagation();
    setItemDelay(0);
    setArrToRender([])
  };

  const goToMenu = () => {
    history.push(routes.getSelectGameScreen());
  };

  return (
    <div className='fifthGameScreen'>
      <div className='fifthGameScreen__gameWrapper'>
        <div className='fifthGameScreen__gameWrapper__settingBar'>
          <button
            className='fifthGameScreen__gameWrapper__settingBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <button
            onClick={goToMenu}
            className='sevenGameScreen__gameWrapper__settingBar__button'
          >
            Выйти в меню
          </button>
        </div>
        <div className='fifthGameScreen__gameWrapper__title'>
          <div>
            Правильных кликов { userHit }
          </div>
        </div>
        <div
          style={!isGameNow ? { pointerEvents: "none" } : null}
          className="fifthGameScreen__gameWrapper__gameScreen">
          {itemDelay > 0 && arrToRender.map((_, index) =>
          <div
            key={index}
            onClick={
              clickDelay >= itemDelay ?
                event => addScoreAndDelete(event):
                () => { alert('Кнопка не активна')}}
              className="fifthGameScreen__gameWrapper__gameScreen__handleItem"
            style={{
              animationDelay: `${itemDelay}s`,
              animationName: 'changeBgColor'
            }}
          />
            )}
        </div>
      </div>
    </div>
  )
};

export default FifthGameScreen;

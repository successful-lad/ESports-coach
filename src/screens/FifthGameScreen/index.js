import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const FifthGameScreen = () => {
  const [itemDelay, setItemDelay] = useState(0);
  const [arrToRender, setArrToRender] = useState([])
  const [isGameNow, setIsGameNow] = useState(false);
  const [clickDelay, setClickDelay] = useState(0)
  const [hitResult, setHitResult] = useState([]);
  const [averageAim, setAverageAim] = useState(0);
  const [defaultTime, setDefaultTime] = useState(0);
  const [timeToFinish, setTimeToFinish] = useState(0);

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow && hitResult.length <= 10) {
      setArrToRender(() => [Array(1).fill(0, 0,1)])
      const delay = Math.floor(Math.random() * (3 - 1)) + 1;
      setItemDelay(delay);
      setDefaultTime(Date.now());
    }
  }, [isGameNow, hitResult]);

  useEffect(() => {
    if (isGameNow && hitResult.length < 11 && arrToRender.length === 0) {
      const randomFuncId = setInterval(() => onRandomShowBlock(), 3000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [hitResult, isGameNow, onRandomShowBlock, arrToRender.length]);

  useEffect(() =>{
    if (hitResult.length > 0 && hitResult.length <=10) {
      setAverageAim(hitResult.reduce((a, b) => +a + +b) / hitResult.length);
    }
  }, [hitResult])

  useEffect(() => {
    if (hitResult.length === 10) {
      const randomFuncId = setInterval(() => setTimeToFinish(value => value +1), 1000);
      return () => { clearInterval(randomFuncId)}
    }
  }, [hitResult])

  useEffect(() => {
    if (timeToFinish === 3) {
      alert(`Игра окончена, ваш средний Aim ${averageAim}`);
      setGameResult('game number 5', averageAim, +localStorage.getItem("elo") || 0);
      setIsGameNow(false)
      setItemDelay(0);
      setDefaultTime(0);
      setHitResult([]);
      setTimeToFinish(0);
    }
  }, [averageAim, hitResult, timeToFinish])

  useEffect(() =>{
    if (isGameNow && clickDelay < itemDelay + 2) {
      const delayId = setInterval(()=> setClickDelay(value => value + 1), 1000 )
      return () => { clearInterval(delayId)}
    } else  {
      setClickDelay(0)
    }

  }, [clickDelay, isGameNow, itemDelay]);

  const addScoreAndDelete = (event) => {
    let timeDifference = (((Date.now() - defaultTime) / 1000) - 1).toFixed(2)
    setHitResult([...hitResult, timeDifference]);
    event.stopPropagation();
    setItemDelay(0);
    setArrToRender([])
  };

  const handleMissClick = () => {
    setHitResult([...hitResult, [1]]); setArrToRender([])
  };

/* todo что бы рендерился новый итем,
  возможно нужно не по самому масиву идти а проходится по его елементам, и очищать его
 */
  return (
    <div className='fifthGameScreen'>
      <div className='fifthGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? { pointerEvents: "none" } : null}
          className="fifthGameScreen__gameWrapper__gameScreen">
          {itemDelay > 0 && arrToRender.map((_, index) =>
          <div
            key={index}
            onClick={
              clickDelay >= itemDelay ?
                event => addScoreAndDelete(event, index):
                handleMissClick}
              className="fifthGameScreen__gameWrapper__gameScreen__handleItem"
            style={{
              animationDelay: `${itemDelay}s`,
              animationName: 'changeBgColor'
            }}
          />
            )}
        </div>
        <div className='fifthGameScreen__gameWrapper__optionsBar'>
          <div>
            { hitResult.length < 10 && `Осталось попыток ${10 - hitResult.length}`}
          </div>
          <button
            className='fifthGameScreen__gameWrapper__optionsBar__button'
            onClick={() => setIsGameNow(value => !value)}
          >
            {!isGameNow ? 'Запустить игру' : 'Поставить на паузу'}
          </button>
          <div>средний шанс</div>
          <div
            className='fifthGameScreen__gameWrapper__optionsBar__table'
          >  {hitResult.map((item, index) =>
            <div
              className='fifthGameScreen__gameWrapper__optionsBar__item'
            >
              {`Aim ${index + 1} ${item}sec`}
            </div>
          )}
        </div>
      </div>
    </div>
      <div className='fifthGameScreen__gameDescription'>
        <div className='fifthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='fifthGameScreen__gameDescription__aboutGame'>
          Игра нацелена на улучшение точности, измеряя все попадания и промахи,
          позволяя игроку увидеть свои ошибки, а так же усовершенствовать свои навыки,
          путем усложнения уровня ЕЛО.
        </div>
      </div>
    </div>
  )
};

export default FifthGameScreen;

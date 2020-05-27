import React, { useState, useEffect, useCallback } from "react";
import { setGameResult } from "../../api";

import './style.scss';

const FifthGameScreen = () => {
  const [itemDelay, setItemDelay] = useState(0);
  const [arrToRender, setArrToRender] = useState([])
  const [isGameNow, setIsGameNow] = useState(false);
  const [hitResult, setHitResult] = useState([]);
  const [averageAim, setAverageAim] = useState(0);
  const [defaultTime, setDefaultTime] = useState(0);
  const [timeToFinish, setTimeToFinish] = useState(0);
  const [quantity, setQuantity] = useState([]);

  const onRandomShowBlock = useCallback(() => {
    if (isGameNow && hitResult.length <= 10) {
      setArrToRender(() => [Array(1).fill(0, 0,1)])
      const delay = Math.floor(Math.random() * (3 - 1)) + 1;
      setItemDelay(delay);
      setDefaultTime(Date.now());
      setQuantity(value => [...value, 1]);
    }
  }, [isGameNow, hitResult]);

  useEffect(() => {
    if (isGameNow && hitResult.length < 10 ) {

      const randomFuncId = setInterval(() => {

        setArrToRender([]);
        setItemDelay(0);
        onRandomShowBlock();
      }, (itemDelay + 1) * 1000 || 1000);
      return () => { clearInterval(randomFuncId)}
    }
    }, [hitResult, isGameNow, onRandomShowBlock, itemDelay]);


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
    if ((quantity.length - hitResult.length) === 2) {
      setHitResult(value => [...value, 1])
    }
  }, [hitResult.length, quantity.length]);

  useEffect(() => {
    if (timeToFinish === 3) {
      alert(`Игра окончена, ваш средний Aim ${averageAim.toFixed(3)}`);
      setGameResult('game number 4', averageAim);
      setIsGameNow(false)
      setItemDelay(0);
      setDefaultTime(0);
      setHitResult([]);
      setTimeToFinish(0);
      setArrToRender([]);
      setAverageAim(0);
      setDefaultTime(0);
      setQuantity([]);
    }
  }, [averageAim, hitResult, timeToFinish])

  const addScoreAndDelete = (event) => {
    let timeDifference = ((Date.now() - (defaultTime + itemDelay *1000)) /1000).toFixed(2)
    setHitResult([...hitResult, timeDifference < 0 ? 1 : timeDifference]);
    event.stopPropagation();
    setItemDelay(0);
    setArrToRender([])
  };

  const handleMissClick = () => {
    setHitResult([...hitResult, [1]]);
    setArrToRender([]);
    setItemDelay(0);
  };

  return (
    <div className='fifthGameScreen'>
      <div className='fifthGameScreen__gameDescription'>
        <div className='fifthGameScreen__gameDescription__title'>
          Описание игры
        </div>
        <div className='fifthGameScreen__gameDescription__aboutGame'>
          <div> Нажимайте на круг только после того, как изменится его цвет</div>
          <div>Длительность игры: 10 попыток</div>
          <div>За нажатие на фигуру до изменения цвета: штрафная секунда</div>
        </div>
      </div>
      <div className='fifthGameScreen__gameWrapper'>
        <div
          style={!isGameNow ? { pointerEvents: "none" } : null}
          className="fifthGameScreen__gameWrapper__gameScreen">
          {itemDelay > 0 && arrToRender.map((_, index) =>
          <div
            key={index}
            onClick={
              Date.now() - (defaultTime + itemDelay * 1000)  <= 1000   ?
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
          <div>средний шанс {hitResult.length > 0 ? (hitResult.reduce((a, b) => +a + +b) / hitResult.length).toFixed(3) : 0} сек</div>
          <div
            className='fifthGameScreen__gameWrapper__optionsBar__table'
          >  {hitResult.map((item, index) =>
            <div
              className='fifthGameScreen__gameWrapper__optionsBar__item'
              key={index}
            >
              {`Aim ${index + 1} ${item}sec`}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
};

export default FifthGameScreen;

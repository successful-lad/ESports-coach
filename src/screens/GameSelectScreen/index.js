import React from "react";
import routes from "../../consts/routes";
import { history } from "../../configureStore";

import './style.scss';

const GameSelectScreen = () => {
  return (
    <div className='gameSelectScreen'>
      <div className='gameSelectScreen__sectionName'>
        Проверка точности
      </div>
      <div className='gameSelectScreen__wrapper'>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(1))}
        >
          Game number N1
        </div>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(2))}
        >
          Game number N2
        </div>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(3))}
        >
          Game number N3
        </div>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(4))}
        >
          Game number N4
        </div>
      </div>
      <div className='gameSelectScreen__sectionName'>
        Проверка Реакции
      </div>
      <div className='gameSelectScreen__wrapper'>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(5))}
        >
          Game number N5
        </div>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(6))}
        >
          Game number N6
        </div>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(7))}
        >
          Game number N7
        </div>
      </div>

      <div className='gameSelectScreen__sectionName'>
        Проверка СКОРОСТИ
      </div>
      <div className='gameSelectScreen__wrapper'>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(8))}
        >
          Game number N8
        </div>
        <div
          className='gameSelectScreen__wrapper__item'
          onClick={() => history.push(routes.getGameScreen(9))}
        >
          Game number N9
        </div>
      </div>
    </div>
  )
};

export default GameSelectScreen;

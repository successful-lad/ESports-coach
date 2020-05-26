import React from "react";
import routes from "../../consts/routes";
import { history } from "../../configureStore";

import './style.scss';

const GameSelectScreen = () => {
  return (
    <div className='gameSelectScreen'>
      <div className="gameSelectScreen__section">
        <div className="gameSelectScreen__section__name">
          Проверка точности
        </div>
        <div className="gameSelectScreen__section__wrapper">
          <div
            className='gameSelectScreen__section__wrapper__item'
            onClick={() => history.push(routes.getGameScreen(1))}
          >
            Game number N1
          </div>
          <div
            className='gameSelectScreen__section__wrapper__item'
            onClick={() => history.push(routes.getGameScreen(2))}
          >
            Game number N2
          </div>
          <div
            className='gameSelectScreen__section__wrapper__item'
            onClick={() => history.push(routes.getGameScreen(3))}
          >
            Game number N3
          </div>
        </div>
      </div>
      <div className="gameSelectScreen__section">
        <div className="gameSelectScreen__section__name">
          Проверка Реакции
        </div>
        <div className="gameSelectScreen__section__wrapper">
          <div
              className='gameSelectScreen__section__wrapper__item'
              onClick={() => history.push(routes.getGameScreen(4))}
          >
            Game number N4
          </div>
          <div
            className='gameSelectScreen__section__wrapper__item'
            onClick={() => history.push(routes.getGameScreen(5))}
          >
            Game number N5
          </div>
          <div
            className='gameSelectScreen__section__wrapper__item'
            onClick={() => history.push(routes.getGameScreen(6))}
          >
            Game number N6
          </div>
        </div>
      </div>
      <div className="gameSelectScreen__section">
        <div className="gameSelectScreen__section__name">
          Проверка скорости
        </div>
        <div className="gameSelectScreen__section__wrapper">
          <div
              className='gameSelectScreen__section__wrapper__item'
              onClick={() => history.push(routes.getGameScreen(7))}
          >
            Game number N7
          </div>
          <div
            className='gameSelectScreen__section__wrapper__item'
            onClick={() => history.push(routes.getGameScreen(8))}
          >
            Game number N8
          </div>
        </div>
      </div>
    </div>
  )
};

export default GameSelectScreen;

import React from "react";
import routes from "../../consts/routes";
import { history } from "../../configureStore";
import './style.scss';

const MainScreen = () => {
    return (
        <div className='mainScreen'>
            <div className='mainScreen__menuWrapper'>
              <div
                className='mainScreen__menuWrapper__menuItem'
                onClick={() => history.push(routes.getSelectGameScreen())}
              >
                Тренировка кибератлета
              </div>
              <div
                className='mainScreen__menuWrapper__menuItem'
                onClick={() => history.push(routes.getStatisticsScreen())}
              >
                Статистика
              </div>
            </div>
        </div>
    )
};

export default MainScreen;

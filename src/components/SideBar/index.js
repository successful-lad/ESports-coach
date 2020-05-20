import React, { useEffect, useState } from "react";
import { history } from "../../configureStore";
import routes from "../../consts/routes";

// todo сделать через NavLink
import './style.scss';

const SideBar = ({ location }) => {
  const [currentLocation, setCurrentLocation ] = useState('');

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location] )

  if (currentLocation !== '/' && currentLocation !== '/registration' ){
    return (
      <div className='sideBar'>
        <div className="sideBar__menu">
          <div
            onClick={() => { history.push(routes.getSelectGameScreen())}}
            className="sideBar__menu__link"
          >Список игр</div>
          <div
            onClick={() => { history.push(routes.getStatisticsScreen())}}
            className="sideBar__menu__link"
          >Статистика</div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default SideBar;

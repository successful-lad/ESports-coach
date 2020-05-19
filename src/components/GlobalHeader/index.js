import React, { useEffect, useState } from "react";
import routes from "../../consts/routes";
import { history } from "../../configureStore";

import './style.scss';

const GlobalHeader = ({ location }) => {
  const [currentLocation, setCurrentLocation ] = useState('');

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location] )

  const logOut = () => {
    localStorage.removeItem('accessToken');
    history.push(routes.getAuthorization())
  }

  if (currentLocation !== '/' && currentLocation !== '/registration' ){
  return (
    <div className='globalHeader'>
      <div className="globalHeader__wrapper">
        <button
          className='globalHeader__wrapper__button'
          onClick={logOut}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  )
  } else {
    return null
  }
};

export default GlobalHeader;

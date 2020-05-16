import React from 'react';
import { Switch, Route, Router } from 'react-router';
import routes from "./consts/routes";
import { history } from "./configureStore";
import {
    MainScreen,
    RegistrationScreen,
    AuthorizationScreen,
    StatisticScreen,
    GameSelectScreen,
    FirstGameScreen,
    SecondGameScreen,
    ThirdGameScreen
} from '../src/screens';

import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Router history={ history }>
            <Switch>ThirdGameScreen
                <Route path={routes.getGameScreen(3)} component={ThirdGameScreen} />
                <Route path={routes.getGameScreen(2)} component={SecondGameScreen} />
                <Route path={routes.getGameScreen(1)} component={FirstGameScreen} />
                <Route path={routes.getSelectGameScreen()} component={GameSelectScreen} />
                <Route path={routes.getStatisticsScreen()} component={StatisticScreen} />
                <Route path={routes.getMainScreen()} component={MainScreen} />
                <Route path={routes.getRegistration()} component={RegistrationScreen} />
                <Route path={routes.getAuthorization()} component={AuthorizationScreen} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();

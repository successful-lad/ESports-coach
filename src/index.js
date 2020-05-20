import React from 'react';
import { Switch, Route, Router } from 'react-router';
import routes from "./consts/routes";
import { history } from "./configureStore";
import {
    RegistrationScreen,
    AuthorizationScreen,
    StatisticScreen,
    GameSelectScreen,
    FirstGameScreen,
    SecondGameScreen,
    ThirdGameScreen,
    FourthGameScreen,
    EighthGameScreen,
    NinthGameScreen,
    FifthGameScreen,
    SixthGameScreen,
    SevenGameScreen,
} from '../src/screens';
import { GlobalHeader, SideBar } from '../src/components';

import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Router history={ history }>
            <Route component={SideBar} />
            <Route component={GlobalHeader} />
            <Switch>
                <Route path={routes.getGameScreen(9)} component={NinthGameScreen} />
                <Route path={routes.getGameScreen(8)} component={EighthGameScreen} />
                <Route path={routes.getGameScreen(7)} component={SevenGameScreen} />
                <Route path={routes.getGameScreen(6)} component={SixthGameScreen} />
                <Route path={routes.getGameScreen(5)} component={FifthGameScreen} />
                <Route path={routes.getGameScreen(4)} component={FourthGameScreen} />
                <Route path={routes.getGameScreen(3)} component={ThirdGameScreen} />
                <Route path={routes.getGameScreen(2)} component={SecondGameScreen} />
                <Route path={routes.getGameScreen(1)} component={FirstGameScreen} />
                <Route path={routes.getSelectGameScreen()} component={GameSelectScreen} />
                <Route path={routes.getStatisticsScreen()} component={StatisticScreen} />
                <Route path={routes.getRegistration()} component={RegistrationScreen} />
                <Route path={routes.getAuthorization()} component={AuthorizationScreen} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();

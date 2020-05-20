export default {
    getAuthorization: () => '/',
    getRegistration: () => '/registration',
    getStatisticsScreen: () => '/statistics',
    getSelectGameScreen: () => '/select-game',
    getGameScreen: (n) => `/select-game/game-number${n}`
}

export default {
    getAuthorization: () => '/',
    getRegistration: () => '/registration',
    getMainScreen: () => '/main',
    getStatisticsScreen: () => '/main/statistics',
    getSelectGameScreen: () => '/main/select-game',
    getGameScreen: (n) => `/main/select-game/game-number${n}`
}

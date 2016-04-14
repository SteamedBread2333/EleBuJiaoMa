/**
 * Created by rzh on 16/4/13.
 */
angular.module('myApp.IntegralMallPage.MallHistory', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/MallHistoryPage");
        $stateProvider.state("IntegralMallPage.MallHistoryPage", {
            url: "/MallHistoryPage",
            templateUrl: "src/IntegralMallPage/MallHistory/MallHistoryPage.html",
            controller: 'MallHistoryCtrl'
        });
    })
    .controller('MallHistoryCtrl', function ($scope) {

    });
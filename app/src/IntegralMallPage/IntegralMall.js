/**
 * Created by rzh on 16/3/31.
 */
angular.module('myApp.IntegralMallPage', ['ui.router', 'myApp.IntegralMallPage.Mall', 'myApp.IntegralMallPage.MallHistory']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/IntegralMallPage");
    $stateProvider.state("IntegralMallPage", {
        url: "/IntegralMallPage",
        templateUrl: "src/IntegralMallPage/IntegralMallPage.html",
        controller: 'IntegralMallCtrl'
    });
}).controller('IntegralMallCtrl', function ($scope) {
    $scope.states = 1;

});
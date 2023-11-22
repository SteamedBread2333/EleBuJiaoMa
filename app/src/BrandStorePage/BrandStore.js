angular.module('myApp.BrandStorePage', ['ui.router', 'business-model'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/BrandStorePage");
        $stateProvider.state("BrandStorePage", {
            url: "/BrandStorePage",
            templateUrl: "src/BrandStorePage/BrandStorePage.html",
            controller: 'BrandStoreCtrl'
        });
    })
    .controller('BrandStoreCtrl', function ($scope, $http, $interval, $location, $rootScope) {
        $rootScope.searchChars = "";
        $scope.inputSearchChars = "";
        $rootScope.changeSearchChars = function () {
            $rootScope.searchChars = $scope.inputSearchChars;
        }
        $scope.hasFocus = false;
        $scope.focusChange = function () {
            $scope.hasFocus = !$scope.hasFocus;
        }
    });
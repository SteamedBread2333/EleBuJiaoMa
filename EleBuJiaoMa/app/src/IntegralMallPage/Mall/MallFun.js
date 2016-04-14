/**
 * Created by rzh on 16/4/13.
 */
angular.module('myApp.IntegralMallPage.Mall', ['ui.router', 'ui.bootstrap'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/MallPage");
        $stateProvider.state("IntegralMallPage.MallPage", {
            url: "/MallPage",
            templateUrl: "src/IntegralMallPage/Mall/MallPage.html",
            controller: 'MallCtrl'
        });
    })
    .controller('MallCtrl', function ($scope, $http) {
        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;

        $scope.myScore = 99;
        $scope.orderBy = 'default';
        $scope.points = 0;
        $scope.icanex = false;
        $scope.orderByDefault = function () {
            $scope.orderBy = 'default';
        }
        $scope.orderByAsc = function () {
            $scope.orderBy = 'integral_price';
        }
        $http.get('res/value/Gifts.json').success(function (response) {
            $scope.gifts = response;
            $scope.totalItems = response.length + 1;
        })

        $scope.priceOfGiftFilter = function (gift) {
            if ($scope.points == 0) {
                return true;
            } else if ($scope.points == 1) {
                return (gift.integral_price >= 1 && gift.integral_price <= 1000);
            } else if ($scope.points == 2) {
                return (gift.integral_price >= 1001 && gift.integral_price <= 3000);
            } else if ($scope.points == 3) {
                return (gift.integral_price >= 3001 && gift.integral_price <= 10000);
            } else if ($scope.points == 4) {
                return (gift.integral_price >= 10001 && gift.integral_price <= 50000);
            } else if ($scope.points == 5) {
                return (gift.integral_price >= 50001);
            }
        }
        $scope.paginationFilter = function (item, num) {
            var paginationLimit = $scope.currentPage - 1;
            if((paginationLimit * 4)+8 <= $scope.totalItems){
                return (num >= (paginationLimit * 4) && num < (paginationLimit * 4) + 8);
            }else{
                return (num >= (paginationLimit * 4));
            }
        }
        $scope.availiableFilter = function (gift) {
            if ($scope.icanex) {
                return ($scope.myScore >= gift.integral_price);
            }
            return true;
        }
    });
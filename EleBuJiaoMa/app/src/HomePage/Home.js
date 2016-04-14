angular.module('myApp.HomePage', ['ui.router' , 'stars' , 'business-model'])

    .config(function ($stateProvider , $urlRouterProvider) {
        $urlRouterProvider.when("", "/HomePage");
        $stateProvider.state("HomePage", {
            url: "/HomePage",
            templateUrl: "src/HomePage/HomePage.html",
            controller: 'HomeCtrl'
        });
    })
    .controller('HomeCtrl', function ($scope, $http, $interval , $rootScope) {
        var bannerTop = 0;
        $rootScope.searchChars = "";
        $scope.inputSearchChars = "";
        $rootScope.changeSearchChars = function(){
            $rootScope.searchChars = $scope.inputSearchChars;
        }
        $scope.hasFocus = false;
        $scope.focusChange = function () {
            $scope.hasFocus = !$scope.hasFocus;
        }
        $http.get('res/value/BannerDatas.json').success(function (response) {
            $scope.bannerDatas = response;
        })
        /*当前banner-ctrl的标记点*/
        $scope.currentIndex = 0;

        /*banner定时滚动任务*/
        $interval(function () {
            if (bannerTop <= -250) {
                bannerTop = 0;
                $scope.currentIndex = 0;
            } else {
                bannerTop -= 98;
                $scope.currentIndex += 1;
            }
            $scope.bannerStyle = {
                "top": bannerTop + 'px'
            };
        }, 4000);

        /*banner-ctrl -> onitemclicklistener*/
        $scope.changeBannerTop = function (index) {
            bannerTop = -98 * index;
            $scope.currentIndex = index;
            $scope.bannerStyle = {
                "top": bannerTop + 'px'
            };
        }
    });



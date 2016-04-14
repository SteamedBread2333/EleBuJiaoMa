angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'infinite-scroll',
    'leftmenuMod',
    'myApp.HomePage',
    'myApp.BrandStorePage',
    'myApp.IntegralMallPage'
]).config(function ($stateProvider , $urlRouterProvider) {
    $urlRouterProvider.when("", "/HomePage");
}).controller('myCtrl', function ($scope, $location, $rootScope) {
    $scope.ishow = false;
    $scope.isFocused = function (x) {
        if (x === $location.$$url) {
            return true;
        }
        return false;
    }
    $scope.sh = function () {
        $scope.ishow = !$scope.ishow;
    }
    $rootScope.showBackTop = false;
    $rootScope.changeShowBackTop = function () {
        if (document.body.scrollTop > 300) {
            $rootScope.showBackTop = true;
        } else {
            $rootScope.showBackTop = false;
        }
    }

    $scope.changeShowContent = function ($event) {
        if ($scope.$$childHead.contentIsShow) {
            $scope.$$childHead.changeShowContent($event , $scope.$$childHead.lastClickNum);
        }
    }
    $scope.showSaoYiSao = false;
});

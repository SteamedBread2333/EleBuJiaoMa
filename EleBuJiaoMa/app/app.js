angular.module('myApp', [
    'ngRoute',
    'myApp.HomePage',
    'myApp.BrandStorePage',
    'myApp.OrderPage'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/HomePage'});
}]).controller('myCtrl', function ($scope, $location) {
    $scope.ishow = false;
    $scope.isFocused = function (x) {
        if (x === $location.$$url) {
            return true;
        }
        return false;
    }
    $scope.sh = function(){
        $scope.ishow = !$scope.ishow;
    }
});

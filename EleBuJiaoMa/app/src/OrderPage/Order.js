/**
 * Created by rzh on 16/3/31.
 */
angular.module('myApp.OrderPage' , ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/OrderPage', {
        templateUrl: 'src/OrderPage/OrderPage.html',
        controller: 'OrderCtrl'
    });
}]).controller('OrderCtrl' , function($scope){

});
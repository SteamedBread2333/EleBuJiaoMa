/**
 * Created by rzh on 16/3/31.
 */
angular.module('myApp.IntegralMallPage' , ['ngRoute']).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/IntegralMallPage', {
        templateUrl: 'src/IntegralMallPage/IntegralMallPage.html',
        controller: 'IntegralMallCtrl'
    });
}]).controller('IntegralMallCtrl' , function($scope){

});
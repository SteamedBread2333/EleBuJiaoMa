/**
 * Created by rzh on 16/4/6.
 */
angular.module('stars' , []).controller('starCtrl', function ($scope) {
    $scope.max = 5;
    $scope.ratingVal = 0;
    //只读模式
    $scope.readonly = true;
    //$scope.onHover = function(val){
    //    $scope.hoverVal = val;
    //};
    //$scope.onLeave = function(){
    //    $scope.hoverVal = null;
    //}
    //$scope.onChange = function(val){
    //    $scope.ratingVal = val;
    //}
}).directive('star', function () {
    return {
        template: '<ul class="rating" ng-mouseleave="leave()">' +
        '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            readonly: '@',
            onHover: '=',
            onLeave: '='
        },
        controller: function($scope){
            $scope.ratingValue = $scope.ratingValue || 0;
            $scope.max = $scope.max || 5;
            //$scope.click = function(val){
            //    if ($scope.readonly && $scope.readonly === 'true') {
            //        return;
            //    }
            //    $scope.ratingValue = val;
            //};
            //$scope.over = function(val){
            //    $scope.onHover(val);
            //};
            //$scope.leave = function(){
            //    $scope.onLeave();
            //}
        },
        link: function (scope, elem, attrs) {
            elem.css("text-align", "center");
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            updateStars();

            scope.$watch('ratingValue', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
            scope.$watch('max', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
});
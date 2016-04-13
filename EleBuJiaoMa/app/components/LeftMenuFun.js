/**
 * Created by rzh on 16/4/11.
 */
angular.module('leftmenuMod', []).controller('leftmenuCtrl', function ($scope, floatPopService) {
    $scope.showQRcode = false;
    $scope.contentIsShow = false;
    $scope.lastClickNum = 0;
    $scope.changeShowContent = function ($event, num) {
        if ($scope.lastClickNum != num) {
            $scope.lastClickNum = num;
            if (!$scope.contentIsShow) {
                $scope.showContent = {
                    'transform': 'translate3d(-295px, 0px, 0px)'
                }
                $scope.contentIsShow = true;
            }
            switch (num) {
                case 1:
                    $scope.sidebarContentType = 'Cart';
                    break;
                case 2:
                    $scope.sidebarContentType = 'Message';
                    break;
                case 3:
                    $scope.sidebarContentType = 'History';
                    break;
            }
        } else {
            $scope.showContent = {
                'transform': 'translate3d(0px, 0px, 0px)'
            }
            $scope.contentIsShow = false;
            $scope.lastClickNum = 0;
        }
        $event.stopPropagation();//阻止冒泡
    }
    $scope.showFloatText = false
    $scope.changeFloatText = function ($event, text) {
        if ($event.type === "mouseover") {
            $scope.showFloatText = true;
            $scope.floatText = text;
            $scope.floatTextStyle = {
                'top': $event.clientY + 'px'
            }
        } else {
            $scope.showFloatText = false;
        }
    }
});

function openWin() {
    window.open('https://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=402791&configID=123801&jid=1820947377&enterurl=http%3A%2F%2Fr.ele.me%2Ftest-restaurant-01&pagetitle=test_restaurant_01+-+%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B9%96%E5%8D%97%E5%B7%A5%E4%B8%9A%E5%A4%A7%E5%AD%A620%E6%A0%8B3%2E%2E%2E+-+%E5%8F%AB%E5%A4%96%E5%8D%96%E4%B8%8Aele%2Eme&pagereferrer=http%3A%2F%2Fele%2Eme%2Fpremium%2Fgeohash%2Fwtw3djeuu587&firstEnterUrl=http%3A%2F%2Fr%2Eele%2Eme%2Fbigmama&s=1',
        'newwindow', 'height=500, width=600, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');

}

function myScroll() {
//前边是获取chrome等一般浏览器 如果获取不到就是ie了 就用ie的办法获取
    var x = document.body.scrollTop || document.documentElement.scrollTop;
    var timer = setInterval(function () {
        x = x - 100;
        if (x < 100) {
            x = 0;
            window.scrollTo(x, x);
            clearInterval(timer);
        }
        window.scrollTo(x, x);
    }, "50");
}
/**
 * Created by rzh on 16/4/7.
 */
angular.module('business-model', []).controller('businessCtrl', function ($scope, $location, $http , floatPopService , $rootScope) {
    /*fun of BusinessWrapper*/
    $scope.showPlaceTips = $location.$$url == '/HomePage' ? true : false;
    /*商品分类筛选关键字*/
    $scope.businessTypeId = '';
    /*倒序排序关键字*/
    $scope.orderByProp = '';
    /*顺序排序关键字*/
    $scope.otherOrderByProp = '';
    /*起送价格筛选关键字 .  9999为初始值*/
    $scope.priceOfStartSend = 9999;
    /*option筛选节点*/
    $scope.option = {
        new: false,
        freeDeliver: false,
        eps: false,
        receipt: false,
        payOnline: false
    };
    /*获取商品分类*/
    $http.get('res/value/BusinessTypesDatas.json').success(function (response) {
        $scope.types = response;
    })
    /*单个商品分类*/
    $scope.currentBusinessType = {id: '', name: '全部商家', types: []};
    /*商品分类子类*/
    $scope.currentTags = [];
    /*单个子类*/
    $scope.currentTag = {id: '', name: ''};
    /*点击:改变当前商品分类*/
    $scope.changeCurrentType = function (type) {
        $scope.currentBusinessType = type;
        $scope.currentTags = $scope.currentBusinessType.types;
        $scope.currentTag = $scope.currentTags[0];
        $scope.businessTypeId = ($scope.currentTags.length == 0) ? $scope.currentBusinessType.id + '-' : $scope.currentBusinessType.id + '-' + $scope.currentTags[0].id;
        console.log("businessTypeId->" + $scope.businessTypeId);
    }
    /*点击:改变当前商品分类子分类*/
    $scope.changeCurrentTag = function (tag) {
        $scope.currentTag = tag;
        $scope.businessTypeId = $scope.currentBusinessType.id + '-' + tag.id
        console.log("businessTypeId->" + $scope.businessTypeId);
    }
    /*排序规则*/
    $scope.orderByIndex = 0;
    /*其他排序规则*/
    $scope.otherOrderBy = '其它排序';
    $scope.otherOrderByIndex = -1;
    /*起送价格筛选*/
    $scope.freightFilter = '不限';
    $scope.freightFilterIndex = 0;
    /*控制显示其他排序*/
    $scope.showOtherOrderBy = false;
    $scope.showFreightOrderBy = false;
    /*点击:改变当前其他排序关键字*/
    $scope.changeOtherOrderBy = function (index) {
        $scope.orderByProp = '';
        switch (index) {
            case 0:
                $scope.otherOrderByProp = 'distance';
                $scope.otherOrderBy = '距离最近';
                break;
            case 1:
                $scope.otherOrderByProp = 'speed_time';
                $scope.otherOrderBy = '配送速度';
                break;
            case 2:
                $scope.otherOrderByProp = 'start_send_amount';
                $scope.otherOrderBy = '起送金额';
                break;
        }
        $scope.otherOrderByIndex = index;
        $scope.orderByIndex = 3;
    }
    /*点击:改变当前起送价格筛选关键字*/
    $scope.changeFreightFilter = function (index) {
        $scope.freightFilterIndex = index;
        switch (index) {
            case 0:
                $scope.priceOfStartSend = 9999;
                $scope.freightFilter = '不限';
                break;
            case 1:
                $scope.priceOfStartSend = 15;
                $scope.freightFilter = '15元以下';
                break;
            case 2:
                $scope.priceOfStartSend = 20;
                $scope.freightFilter = '20元以下';
                break;
            case 3:
                $scope.priceOfStartSend = 30;
                $scope.freightFilter = '30元以下';
                break;
            case 4:
                $scope.priceOfStartSend = 40;
                $scope.freightFilter = '40元以下';
                break;
        }
    }
    /*点击:改变当前其他排序关键字*/
    $scope.changeOrderByIndex = function (index) {
        $scope.otherOrderByProp = '';
        switch (index) {
            case 0:
                $scope.orderByProp = '';
                break;
            case 1:
                $scope.orderByProp = 'volume_num';
                break;
            case 2:
                $scope.orderByProp = 'judge_score';
                break;
        }
        $scope.otherOrderBy = '其它排序';
        $scope.orderByIndex = index;
    }
    /*获取门店信息*/
    $http.get('res/value/StoresData.json').success(function (response) {
        $scope.stores = response;
        $scope.store_num = response.length;
    })
    /*判断:门店是不是为品牌门店 true:加特技*/
    $scope.showElemeicon = function (store) {
        return store.business_types.indexOf("1-") != -1;
    }
    /*filter:商品分类筛选方法*/
    $scope.businessTypeFilter = function (item) {
        return item.business_types.indexOf($scope.businessTypeId) != -1;
    };
    /*filter:起送价格筛选方法*/
    $scope.priceOfStartSendFilter = function (item) {
        return item.start_send_amount < $scope.priceOfStartSend;
    }
    /*filter:option筛选方法*/
    $scope.optionFilter = function (item) {
        var flags = [true, true, true, true, true];
        if ($scope.option.new) {
            flags[0] = ($scope.option.new === item.is_new);
        }
        if ($scope.option.freeDeliver) {
            flags[1] = ($scope.option.freeDeliver === item.is_send_free);
        }
        if ($scope.option.eps) {
            flags[2] = ($scope.option.eps === item.is_feng_bird_send);
        }
        if ($scope.option.receipt) {
            flags[3] = ($scope.option.receipt === item.is_open_invoice);
        }
        if ($scope.option.payOnline) {
            flags[4] = ($scope.option.payOnline === item.is_pay_online);
        }
        for (i = 0; i < flags.length; i++) {
            if (!flags[i])
                return false;
        }
        return true;
    }
    /*ng-if:是否显示浮动窗体*/
    $scope.isShowFloatPop = false;
    /*鼠标所在当前门店item*/
    $scope.store = {};
    /*鼠标划入:显示浮动窗体 , 实时计算top left*/
    $scope.showFloatPop = function (store , index) {
        var loc = floatPopService.getItemLoc(index , 'business-list');
        if (loc.top != 0) {
            $scope.floatPopStyle = {
                "top": loc.top + 'px',
                "left": loc.left + 'px'
            }
            $scope.isLeft = loc.is_left;
            $scope.isShowFloatPop = true;
        }
        if($scope.store.id != store.id) {
            $scope.store = store;
        }
    }
    /*鼠标划出:浮动窗体消失*/
    $scope.hideFloatPop = function () {
        $scope.isShowFloatPop = false;

    }
    $scope.search = function(store){
        return store.name.indexOf($rootScope.searchChars) != -1;
    }
});
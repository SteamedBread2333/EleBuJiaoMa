/**
 * Created by rzh on 16/4/8.
 */
angular.module('business-model')
    .service('floatPopService', function ($rootScope) {
        var loc = {
            top: 0, //元素在屏幕上的绝对位置
            left: 0, //元素离屏幕左边的距离
            right: 0, //元素离屏幕右边的距离
            screen_width: window.innerWidth, //屏幕宽度
            is_left:true  //小箭头的位置left or right
        };
        /**
         * 子元素定位
         * @param int index    序号i
         * @param String id   父元素id
         */
        this.getItemLoc = function(index , id) {
            var list = document.getElementById(id);
            var e = list.children[index];
            return getLocByElem(e);
        }

        /**
         * 元素定位
         * @param String id   元素id
         */
        this.getElemLocById = function(id) {
            var e = document.getElementById(id);
            return getLocByElem(e);
        }

        /**
         * 元素定位
         * @param String name   元素classname(必须唯一)
         */
        this.getElemLocByClassName = function(name) {
            var e = document.getElementsByClassName(name)[0];
            return getLocByElem(e);
        }

        /**
         * 元素定位
         * @param String elem   元素Dom对象
         */
        this.getElemLocByElem = function(elem) {
            return getLocByElem(elem);
        }

        function getLocByElem(e){
            var offsetTop = e.getBoundingClientRect().top;
            var offsetLeft = e.getBoundingClientRect().left;
            loc = {
                top: offsetTop,
                left: offsetLeft,
                right: (offsetLeft + e.offsetWidth),
                screen_width: window.innerWidth
            };
            if (loc.top != 0) {
                if (loc.screen_width - loc.right <= 350) {
                    loc.left -= 319;
                    loc.is_left = false;
                } else {
                    loc.left = loc.right;
                    loc.is_left = true;
                }
            }
            return loc;
        }
    });
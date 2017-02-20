/**
 * Created by guoyanlian on 17/2/20.
 */
var turnTableInit = (function () {
    function turnTable(option) {
        var self = this;
        self.options = {
            clickBtn: '',
            beforeFun: null,
            callBack: null,
            childClassName: '',
            awardFun: null,
            clickEvent: 'click',
            currentClass: '',
            cycle: 50,
            speed: 20
        };
        self.options = $.extend({}, self.options, option);
        self.lottery = {
            index: -1,	//当前转动到哪个位置，起点位置
            count: 0,	//总共有多少个位置
            timer: 0,	//setTimeout的ID，用clearTimeout清除
            speed: 20,	//初始转动速度
            times: 0,	//转动次数
            cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1,	//中奖位置
            roll: function () {
                var index = self.lottery.index;
                var count = self.lottery.count;
                $(self.options.currentClass).hide();
                index += 1;//当前的起点位置
                if (index > count - 1) {
                    index = 0;
                }
                ;
                $($(self.options.currentClass)[index]).show();
                self.lottery.index = index;
                return false;
            },
            stop: function (index) {
                self.lottery.prize = index;
                return false;
            }
        };
        this.roll = function () {
            self.lottery.times += 1;
            self.lottery.roll();
            //转动次数大于转动基数，并且中奖位置等于当前转动的位置，即停止转动
            if (self.lottery.times > self.lottery.cycle + 5 && self.lottery.prize == self.lottery.index && self.lottery.awardIndex != -1) {
                clearTimeout(self.lottery.timer);
                self.lottery.prize = -1;
                self.lottery.times = 0;
                click = false;
                self.lottery.awardIndex != -1;
                if (self.options.callBack) {
                    setTimeout(function () {
                        self.options.callBack.call(self);
                    }, 1000);
                }

            } else {
                //转动次数小于基数，即转动速度减10
                if (self.lottery.times < self.lottery.cycle) {
                    self.lottery.speed -= 10;
                }
                else if (self.lottery.times >= self.lottery.cycle && self.lottery.awardIndex != -1) {
                    self.lottery.prize = self.lottery.awardIndex;
                }
                else {
                    //抓懂次数大于基数＋10 并且 （中奖位置为0并且当前位置为7或者中奖位置等于当前位置＋1）
                    if (self.lottery.times > self.lottery.cycle + 10 && ((self.lottery.prize == 0 && self.lottery.index == 7) || self.lottery.prize == self.lottery.index + 1)) {
                        self.lottery.speed += 110;//速度加110
                    } else {
                        self.lottery.speed += 20;//速度＋20
                    }
                }

                if (self.lottery.speed < 40) {
                    self.lottery.speed = 40;
                }

                self.lottery.timer = setTimeout(self.roll, self.lottery.speed);
            }
            return false;
        }
        self.init();
    }

    turnTable.prototype = {
        constructor: turnTable,
        init: function () {
            if (!this.options.clickBtn) {
                console.error("cannot find clickBtn button!");
                return;
            }
            if (!this.options.childClassName || !$(this.options.childClassName).length) {
                console.error("cannot find children");
                return;
            }
            if (!this.options.currentClass || !$($(this.options.childClassName)[0]).find(this.options.currentClass).length) {
                console.error("cannot find currentClass");
                return;
            }
            this.lottery.currentClass = $(this.options.clickBtn);
            this.lottery.count = $(this.options.childClassName).length;
            this.bindEvent();
        },
        bindEvent: function () {
            var self = this;
            $(this.options.clickBtn)
                .off(this.options.clickEvent)
                .on(this.options.clickEvent, function () {
                    self.lottery.awardIndex = -1;
                    if (!self.options.beforeFun || self.options.beforeFun.call(self)) {
                        self.roll();
                        if (self.options.awardFun) {
                            self.options.awardFun.call(self);
                        } else {
                            self.lottery.awardIndex = parseInt(Math.random() * self.lottery.count);
                        }
                    }
                });
        }
    }
    return {
        init: function (options) {
            new turnTable(options);
        }
    };
})();
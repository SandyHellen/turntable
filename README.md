# turntable
# turnTableInit.init({
#           clickBtn: '.op-start',//开始点击的事件按钮  class／id
#           beforeFun: null,//有效果之前的判断，return true/false
#           callBack: null,中奖后的回调函数,传入的参数是awardIndex
#           childClassName: '.lucky',//循环的子元素
#           awardFun: null,//获取中奖信息，方法中必须通过this.awardIndex返回中奖信息，若为null，中奖信息随机产生
#           clickEvent: 'click',//
#           currentClass: '.active',//当前位置的class名字
#            cycle: 50,//至少转多少圈
#           speed: 20//转动速度
#       });
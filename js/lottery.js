/**
 * Created by wangtao on 2017/12/29.
 */
$(function () {
    //实例化 fastclick ,解决click事件在移动端延迟的问题
    FastClick.attach(document.body);

    //默认剩余抽奖次数是4
    var count = 4
    $(".time .remain").text(count)

    //抽奖代码
    var $btn = $('.rotate'); // 旋转的图片
    var isture = false; //是否正在抽奖
    var clickfunc = function () {
        //抽奖次数减1
        count--
        $(".time .remain").text(count)

        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        //中奖序号
        var number = arr[Math.round(Math.random() * (arr.length - 1))]

        console.log(number)
        switch (number) {
            case 1:
                rotateFunc(1, -4.6, '');
                break;
            case 2:
                rotateFunc(2, -33.1, '');
                break;
            case 3:
                rotateFunc(3, -74.7, '');
                break;
            case 4:
                rotateFunc(4, -105.9, '');
                break;
            case 5:
                rotateFunc(5, -132.2, '');
                break;
            case 6:
                rotateFunc(6, -161.2, '');
                break;
            case 7:
                rotateFunc(7, -193.9, '');
                break;
            case 8:
                rotateFunc(8, -232.2, '');
                break;
            case 9:
                rotateFunc(9, -262.2, '');
                break;
            case 10:
                rotateFunc(10, -285.7, '');
                break;
            case 11:
                rotateFunc(11, -331.1, '');
                break;
            default:
                break;
        }
    }

    $(".rotate_box > div").click(function () {
        //抽奖次数大于0,才可以抽奖
        if (count > 0) {
            //判断是否可以抽奖
            if (isture) return false; // 如果在执行就退出
            isture = true; // 标志为 在执行
            clickfunc();
        }
    });

    var rotateFunc = function (awards, angle, text) {
        isture = true;
        $btn.stopRotate();
        $btn.rotate({
            angle: 0, //旋转的角度数
            duration: 4000, //旋转时间
            animateTo: angle + 2160, //给定的角度,让它根据得出来的结果加上360*6度旋转
            callback: function () {
                //获取当前时间
                var time = new Date();
                var year = time.getFullYear();
                var month = (time.getMonth()+1) < 10 ? "0"+ (time.getMonth()+1):(time.getMonth()+1)
                var date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
                var hour = time.getHours()
                var minute = time.getMinutes()
                var second = time.getSeconds()
                time = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
                //中奖提示框弹出
                switch (awards) {
                    case 1 :
                        $(".popup_01 .number").text(count);
                        $(".popup_01").show();
                        $("footer").append(`<p>
        <img src="./images/ic_通知.png" alt=""/>
        恭喜您抽中<span class="first">一等奖</span>一份！
        <span class="prise_time">${time}</span>
    </p>`);
                        break;
                    case 5 :
                    case 9 :
                        $(".popup_04 .number").text(count);
                        $(".popup_04 p .title").next().text("二等奖价值798元的德国KUM化妆套扫一份");
                        $(".popup_04").show();
                        $("footer").append(`<p>
        <img src="./images/ic_通知.png" alt=""/>
        恭喜您抽中<span class="second">二等奖</span>一份！
        <span class="prise_time">${time}</span>
    </p>`);
                        break;
                    case 3 :
                    case 7 :
                    case 10 :
                        $(".popup_04 .number").text(count);
                        $(".popup_04 p .title").next().text("三等奖价值128元的迪奥小香礼盒套装一份");
                        $(".popup_04").show();
                        $("footer").append(`<p>
        <img src="./images/ic_通知.png" alt=""/>
        恭喜您抽中<span class="three">三等奖</span>一份！
        <span class="prise_time">${time}</span>
    </p>`);
                        break;
                    case 2 :
                    case 4 :
                    case 6 :
                    case 8 :
                    case 11 :
                        $(".popup_04 .number").text(count);
                        $(".popup_04 p .title").next().text("参与奖20元现金券一张，优惠券已放入您的账户内");
                        $(".popup_04").show();
                        $("footer").append(`<p>
        <img src="./images/ic_通知.png" alt=""/>
        恭喜您抽中<span class="four">参与奖</span>一份！
        <span class="prise_time">${time}</span>
    </p>`);
                        break;
                }
                isture = false; // 标志为 执行完毕
            }
        });
    };

    //点击中奖提示信息右上角的图标关闭提示框
    $(".popup .cancle").click(function () {
        //隐藏弹框
        $(this).parents(".popup").hide()
    })

    //点击中奖提示信息底部的立即查看，进入优惠券列表页
    $(".popup button").click(function () {
        location.href = "../member/myticket.html"
    })
})
function noPay() {
    $("#list").css('display', 'none');
}
// 获取本地存储的数据
function getLocal() {
    var data = new Car(),
        goodslist = data.getCar()
    var str = ``;
    for (var i = 0; i < goodslist.length; i++) {
        str += `<li class="pay-goods">
                <img src=${goodslist[i].src} alt="">
                <div class="pay-text">
                    <div class="pay-head">
                        <p class="pay-name">${goodslist[i].name}</p>
                        <p class="pay-price">
                        ${strType(goodslist[i].price)} <br>
                            <i class="small-price">节省：¥0</i>
                        </p>
                        <span class="pay-num">x ${goodslist[i].number}</span>
                        <span class="pay-money">${strType(goodslist[i].price)}</span>
                    </div>
                    <ul class="pay-content">
                        <li>清单 <i class="iconfont icon-sanjiaoxing"></i></li>
                        <li>${goodslist[i].name}</li>
                        <li>${goodslist[i].text}</li>
                    </ul>
                </div>
            </li>`
    }
    $("#list").css('display', 'block');
    $("#last-sumPrice>span").html(strType(data.sum().sumPrice));
    $("#need-pay>span").html(strType(data.sum().sumPrice));
    $("#pay-list").html(str);
}
$(function () {
    new Car().getCar().length > 0 ? getLocal() : noPay();
    $("#confirm-form").click(function () {
        var ruser = localStorage.user;
        if (!ruser || ruser.length < 1) {
            layer.msg("请登录后在进入用户中心，正在跳转到登录页面", {
                icon: 5,
                time: 3000
            }, function () {
                location.href = './login.html';
            });
            return;
        }
        // 个人信息内容验证
        var _name = $("#name").val();
        var _phoneNumber = $("#phoneNumber").val();
        var address = $("#site").val();
        if (_name == '' || _phoneNumber == '' || address == '') {
            layer.msg('填写个人信息，你不要手机了？', {
                anim:6,
                time: 3000,
                icon: 5
            });
            return;
        }
        $("#confirm-form").attr('disabled', true);
        var data = new Car();
        var newData = [];
        var _user = localStorage.user;
        var ftext = _name + " " + _phoneNumber;
        var formid = String(Math.random()).substr(2, 10);

        for (var i = 0; i < data.getCar().length; i++) {
            newData[i] = {
                'id': data.getCar()[i].id,
                'number': data.getCar()[i].number
            }
        }
        $.post("./php/payPhone.php", {
            'data': newData,
            'user': _user,
            'formid': formid,
            'address': address,
            'ftext':ftext
        }, function (res) {
            if (res > 0) {
                layer.msg('提交成功，即将回到首页', {
                    icon: 6,
                    time: 2000
                }, function () {
                    var d = new Car();
                    for (var i = 0; i < d.getCar().length; i++) {
                        d.delgoods(d.getCar()[i].id);
                    }
                    location.href = "./mine.html";
                });
            } else {
                layer.msg('提交失败，请重新提交', {
                    icon: 5,
                    time: 2000
                });
            }
            $("#confirm-form").attr('disabled', false);
        }, "json");
    })
})
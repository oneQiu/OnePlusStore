function noPay() {
    $("#list").css('display', 'none');
}
// 获取本地存储的数据
function getLocal() {
    var data = new Car(),
        goodslist = data.getCar(),
        goodsSum = data.sum();
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
        $("#confirm-form").attr('disabled', true);
        var data = new Car();
        var sumPrice = data.sum().sumPrice;
        var newData = [];
        for (var i = 0; i < data.getCar().length; i++) {
            newData[i] = {
                'id': data.getCar()[i].id,
                'number': data.getCar()[i].number
            }
        }
        $.post("./php/payPhone.php", {
            'sumPrice': sumPrice,
            'data': newData,
            'user': 'lemon'
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
                    location.href = "./index.html";
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
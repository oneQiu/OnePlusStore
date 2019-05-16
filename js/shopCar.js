function noCar() {
    var str = ``;
    str = `<!-- 购物车中无商品时候 -->
            <div id="noGoods">
                <p class="no-text">您的购物车还没有商品</p>
                <a href="./index.html" class="goShop">去购物</a>
            </div>`;
    $("#item").html(str);
    $("#sum").css('display', 'none');
    $("#carlist").css('padding-bottom', '80px');
}
// 删除
function delNum(dom) {
    var _id = $(dom).parent().attr('data-id');
    var car = new Car();
    car.delgoods(_id);
    $("#del-span").animate({
        'width': "100%"
    })
    new Car().getCar().length > 0 ? setShopCar() : noGoods();
    new Car().getCar().length > 0 ? getLocal() : noCar();
    $("#del-span").animate({
        'width': 0
    }, 50)
}
// 减少
function subNum(dom) {
    var _id = $(dom).parent().parent().attr('data-id');
    var car = new Car();
    var goods = {
        'id': _id,
        'number': 1
    }
    if ($(dom).next().attr('value') == 1) {
        car.delgoods(_id);
    } else {
        car.subtract(_id);
    }
    new Car().getCar().length > 0 ? setShopCar() : noGoods();
    new Car().getCar().length > 0 ? getLocal() : noCar();
}
// 增加
function addNum(dom) {
    var _id = $(dom).parent().parent().attr('data-id');
    var car = new Car();
    var goods = {
        'id': _id,
        'number': 1
    }
    car.addNum(goods);
    setShopCar();
    getLocal();
}

// 文本框直接输入数量
function textNum(dom, v) {
    var rex = /^\num$/;
    if (!Number($(dom).val())) {
        console.log(11);
        $(dom).val(v);
        layer.msg("请输入正确的数字", {
            time: 1000
        });
        return;
    }
    var _id = $(dom).parent().parent().attr('data-id');
    var car = new Car();
    var number = $(dom).val() - v;
    var goods = {
        'id': _id,
        'number': number
    }
    car.addNum(goods);
    setShopCar();
    getLocal();
}
// 获取本地存储的数据
function getLocal() {
    var data = new Car(),
        goodslist = data.getCar(),
        goodsSum = data.sum();
    var str = ``;
    for (var i = 0; i < goodslist.length; i++) {
        str += `<li class="pay-goods cleanfix">
                <div class="pay-left">
                    <a href="./details.html?id=${goodslist[i].id}">
                        <img src=${goodslist[i].src} alt="">
                    </a>
                </div>
                <div class="pay-right">
                    <div class="status" data-id=${goodslist[i].id}>
                        <h3>${goodslist[i].name}</h3>
                        <span class="pay-money">${strType(goodslist[i].price)}
                            <i class="discounts">节省：￥ 0 </i>
                        </span>
                        <div class="changeNum" data-id=${goodslist[i].id}>
                            <div class="numBorder">
                                <button class="subNum iconfont icon--hao" onclick="subNum(this)" ></button>
                                <input type="text" name="" id="" class="nowNum" value=${goodslist[i].number}  onblur="textNum(this,${goodslist[i].number})">
                                <button class="addNum iconfont icon-addTodo-nav" onclick="addNum(this)"></button>
                            </div>
                        </div>
                        <span class="price">${strType(goodslist[i].price * goodslist[i].number)}</span>
                        <i class="iconfont icon-guanbi" onclick = "delNum(this)"></i>
                    </div>
                    <ul class="list">
                        <li>清单 <i class="iconfont icon-sanjiaoxing"></i></li>
                        <li>${goodslist[i].name}</li>
                        <li>${goodslist[i].text}</li>
                    </ul>
                </div>
            </li>`;
    }

    $("#carlist").css('padding-bottom', '0px');
    $("#sum").css('display', 'block');
    $("#sum-num").html(data.sum().sumNumber);
    $("#sum-pri").html(strType(data.sum().sumPrice));
    $(".really-price").html(strType(data.sum().sumPrice));
    $("#item").html(str);
}
$(function () {
    
    new Car().getCar().length > 0 ? getLocal() : noCar();
})
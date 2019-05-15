/**
 * 公共JS文件
 *
 * @param {*} onDom
 * @param {*} targetDom
 * @param {*} out
 */
function mouseHide(onDom, targetDom, out) {
    $(onDom).mouseenter(function () {
        // $(targetDom).css("display", "block");
        $(targetDom).slideDown(200);
    });
    $(onDom).mouseleave(function (e) {
        if (e.offsetX <= 0 || e.offsetX >= out || e.pageY <= 0) {
            // $(targetDom).css("display", "none");
            $(targetDom).slideUp(200);
        }
    });
    $(targetDom).mouseleave(function () {
        // $(this).css("display", "none");
        $(targetDom).slideUp(200);
    });
}

// 总价格转换成number类型
function numType(str) {
    var str1 = '';
    str = str.substring(1).split('.')[0].split(',');
    for (var i = 0; i < str.length; i++) {
        str1 += str[i];
    }
    return str1;
}
// 价格转换成字符串
function strType(num) {
    num = String(num);
    var len = num.length;
    var arr = [],
        sum = "";
    for (var i = 0; i < len / 3; i++) {
        arr[i] = num.substring(len - 3 * (i + 1), len - 3 * i);
    }
    sum = '￥' + arr.reverse().toString();
    sum += '.00';
    return sum;
}

// localost逻辑判断
function Car() {
    // 获取本地数据中的数据
    Car.prototype.getCar = function () {
        return JSON.parse(localStorage.getItem("oneplus")) || [];
    }
    // 添加数据
    Car.prototype.addNum = function (goods) {
        var carlist = this.getCar();
        if (this.judge(goods.id)) {
            for (var i = 0; i < carlist.length; i++) {
                if (carlist[i].id == goods.id) {
                    carlist[i].number += goods.number;
                }
            }
        } else {
            carlist.push(goods);
        }
        localStorage.setItem('oneplus', JSON.stringify(carlist));
    }
    // 判断本地数据中是否有当前货物
    Car.prototype.judge = function (id) {
        var carlist = this.getCar();
        for (var i = 0; i < carlist.length; i++) {
            if (carlist[i].id == id) {
                return true;
            }
        }
        return false;
    }
    // 计算总价格以及总个数
    Car.prototype.sum = function () {
        var carlist = this.getCar();
        var sumNumber = 0,
            sumPrice = 0,
            sum = {};
        for (var i = 0; i < carlist.length; i++) {
            sumPrice += carlist[i].number * carlist[i].price;
            sumNumber += carlist[i].number;
        }
        sum = {
            'sumNumber': sumNumber,
            'sumPrice': sumPrice
        }
        return sum;
    }
    // 删除商品
    Car.prototype.delgoods = function (id) {
        var carlist = this.getCar();
        for (var i = 0; i < carlist.length; i++) {
            if (carlist[i].id == id) {
                carlist.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('oneplus', JSON.stringify(carlist));
    }
    // 商品的数量减少
    Car.prototype.subtract = function (id) {
        var carlist = this.getCar();
        for (var i = 0; i < carlist.length; i++) {
            if (carlist[i].id == id) {
                if (carlist[i].number == 1) {
                    this.delgoods(id);
                } else {
                    carlist[i].number--;
                }
                break;
            }
        }
        localStorage.setItem('oneplus', JSON.stringify(carlist));
    }
}
// 购物车无内容时候
function noGoods() {
    var str = ``;
    str = ` <div id="goodslist">
                <p id="goods-null">您的购物车里没有商品！</p>
            </div>
            <div id="shopCar-tips">
                <a href="shopCar.html">
                    <span id="goshop">去购物</span>
                </a>
            </div>
            <div id="sum-text"></div>`;
    $("#shopCar").html(str);
    $("#carNum").css('display','none');
}

function setShopCar() {
    // 快捷购物车信息
    var shopCar = new Car();
    var data = shopCar.getCar(),
        sumNum = shopCar.sum().sumNumber,
        sumPrice = shopCar.sum().sumPrice;
    var str = `<div class="car-head">
                        <span>已选择</span>
                        <span>${sumNum}件商品</span>
                  </div>`;
    for (var i = 0; i < data.length; i++) {
        str += `<div class="car-list">
                        <div class="car-goods">
                            <img src=${data[i].src} alt="">
                            <span class="goods">
                                <div class="goodsName">${data[i].name}</div>
                                <div class="goodsPrice">${strType(data[i].price)} <i class="goodsNum">x ${data[i].number}</i></div>
                            </span>
                        </div>
                    </div>`
    }
    var strText = ` <p id="sumPrice">总价<i class="bigNum">${strType(sumPrice)}</i></p>
                    <p>支持免邮</p>
                    <a href="./shopCar.html" class="payPhone">去购物车</a>
                    <a href="./shopCar.html" class="payPhone">去付款</a>
                   `
    $("#carNum").css("display",'block').html(sumNum);
    $("#goodslist").html(str);
    $("#sum-text").html(strText);
    $("#shopCar-tips").remove();
    $("#sum-text").css('display', 'block');
}


$(function () {
    mouseHide("#store_icon", "#shopCar", 60);
    mouseHide("#mine_icon", "#mineBox", 60);
    mouseHide("#store", "#store_type", 120);
    // 轮播图  
    var index = 0;
    var timer = setInterval(slideshow, 3000);

    function slideshow() {
        index++;
        if (index == $("#imgs > li").length) {
            index = 0;
        }
        $("#imgs > li").eq(index).fadeIn().siblings().fadeOut();
        $("#banner_numbers > li").eq(index).children("span").addClass("spanBackground").parent().siblings()
            .children("span").removeClass("spanBackground");
    }
    // 左右按钮
    $("#banner_right").on("click", function () {
        clearInterval(timer);
        slideshow();
        timer = setInterval(slideshow, 3000);
    })
    $("#banner_left").on("click", function () {
        clearInterval(timer);
        if (index == 0) {
            index = $("#imgs > li").length - 2;
        } else {
            index -= 2;
        }
        slideshow();
        timer = setInterval(slideshow, 3000);
    })
    // 下面的快速访问span
    $("#banner_numbers > li").hover(function () {
        clearInterval(timer);
        index = $(this).index() - 1;
        slideshow();
    }, function () {
        timer = setInterval(slideshow, 3000);
    })

    // 点击放大镜 搜索栏出现
    $("#searchShow").click(function () {
        $("#mine").fadeOut(100);
        $("#head_nav").fadeOut(100);
        $("#searchBox").fadeIn(100);
    });
    $("#search-close").click(function () {
        $("#mine").fadeIn(100);
        $("#head_nav").fadeIn(100);
        $("#searchBox").fadeOut(100);
    });
    // 根据本地存储判断是否执行购物车信息的更新
    new Car().getCar().length > 0 ? setShopCar() : noGoods();
})
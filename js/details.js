$(function () {
    // 根据url传递的id获取
    var url = window.location.search.substring(1);
    var id = 0;
    if (url) {
        var result = url.split('&');
        for (var i = 0; i < result.length; i++) {
            if (result[i].match('id=')) {
                id = result[i];
            }
        }
    }
    // 禁止加入购物车按钮  因为页面还未加载完成
    $("#joinCar").attr('disabled', true);
    // 传递参数给后台获取信息
    $.get("./php/details.php", id,
        function (res) {
            $("#joinCar").attr('disabled', false);
            console.log(res);
            $("#phone-data > h2").html(res.name);
            $("#phone-price").html(strType(res.price));
            $("#phonepic").attr('src', './images/' + res.src + '.png');
            $("#phone-data").attr('data-id', res.id);
            $("#phone-style img").attr('src', './images/' + res.src + '.png');
        },
        "json"
    );
    // 点击添加到购物车
    $("#joinCar").click(function () {
        var id = $("#phone-data").attr('data-id'),
            name = $("#phone-data > h2").html(),
            price = numType($("#phone-price").html()),
            src = $("#phonepic").attr('src');
        var goods = {
            'id': id,
            'number': 1,
            'name': name,
            'price': price,
            'src': src
        }
        var car = new Car();
        car.addNum(goods);
        layer.msg("添加到购物车成功");
        setShopCar();
    })
})
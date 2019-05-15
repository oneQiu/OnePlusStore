// 滚动置顶
$(function scrollFixed() {
    $("body").scroll(function () {
        var _offset = $(".product_head").offset();
        var _top = _offset.top;
        if (_top <= 0) {
            $(".product_head").css({
                "position": "sticky",
                "top": 0
            });
        }
    });
})
// 动态加载产品  每次展示10个
$(function () {
    var page = 1;
    $("#more").on('click', function () {
        $("#more").html("正在加载中");
        $("#more").attr('disabled', true);
        // JQ传参数不需要添加'？'
        $.get("./php/index.php", "page=" + page,
            function (res) {
                // res = JSON.parse(res);
                $("#more").html('加载更多');
                $("#more").attr('disabled', false);
                if (res.length == 0) {
                    layer.msg('这已经是全部商品啦！');
                    return;
                }
                // 添加信息
                var str = ``;
                for (var i = 0; i < res.length; i++) {
                    str += `<div class="list_card" data-id="${res[i]["id"]}">
                                <a href="./details.html?id=${res[i]["id"]}">
                                    <span class="discount">8.7折</span>
                                    <img src="./images/${res[i]["src"]}.png" alt="">
                                    <span class="phone_name">${res[i]["name"]}</span>
                                    <span class="phone_price">${strType(res[i]["price"])}</span>
                                </a>
                            </div> `;
                }
                $("#product_info").append(str);
                page++;
            }, "json"
        );
    })
    $("#more").click();

    // 产品点击下拉选择
    $(".product_head  h3").click(function () {
        // $("#product_select").css("display","block");
        $("#product_select").slideDown(200);
    });
    $("#product_select > span").hover(function () {
        $(this).css("background-color", "#f6f6f6").siblings().css("background-color", "");
    })
    $("body").click(function () {
        if ($("#product_select").css("display") == "block" && $("#product_select").css("height") == "160px") {
            $("#product_select").slideUp(200);
        }
    })
    
})
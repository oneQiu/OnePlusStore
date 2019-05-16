$(function () {
    var pUser = localStorage.user;
    if (!pUser || pUser.length < 1) {
        $("body").html(" ");
        layer.msg("请登录后在进入用户中心，正在跳转到登录页面", {
            icon: 5,
            time: 3000
        }, function () {
            location.href = './login.html';
        });
    } else {
        $.post("./php/mine.php", 'user=' + pUser,
            function (res) {
                console.log(res);
                var str = ``;
                var pay = 0;
                for (var i = 0; i < res.length; i++) {
                    var pri = res[i].price * res[i].sumNum;
                    pay += pri;
                    str += `<li class="pay-goods">
                            <img src='./images/${res[i].src}.png' alt="">
                            <div class="pay-text">
                                <div class="pay-head">
                                    <p class="pay-name">${res[i].name}</p>
                                    <p class="pay-price">
                                    ${strType(res[i].price)}
                                    </p>
                                    <span class="pay-num">x ${res[i].sumNum}</span>
                                    <span class="pay-money">${strType(pri)}</span>
                                </div>
                                <ul class="pay-content">
                                    <li>${res[i].name}</li>
                                    <li>${res[i].ftext}</li>
                                    <li>${res[i].address}</li>
                                </ul>
                            </div>
                        </li>`
                }
                if (res.length > 0) {
                    $('.form-no').html(res[0].formid);
                    $("#text-list").css('display', 'block').html(str);
                    $(".id-pay").html(strType(pay));
                }
            }, "json"
        );
        $("#mine-pic > span").html(pUser);
    }
})
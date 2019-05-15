$(function () {
    // 滑块
    var _left = 0,
        _x, _a;
    var on_off = false,
        load = "";

    function spanBox() {
        // function () {
        $(document).on('mousemove', function (e) {
            _left = $("#sliding-box").offset().left;
            _x = e.pageX - _left - $("#sliding-info").width() / 2;
            _a = $("#sliding-box").width() - $("#sliding-info").width();
            if (_x < 0) {
                _x = 0
            }
            if (_x > _a) {
                _x = _a;
            }
            $("#sliding-info").css("left", _x + 'px');
            $(".bgcolor").css("width", _x + 'px');
        })
        // }
    }
    $("#sliding-info").on('mousedown', spanBox);
    $(document).on('mouseup', function () {
        $(document).off('mousemove');
        if (_x >= _a) {
            $("#sliding-info").off('mousedown');
            $(".bgcolor").html("验证完成");
            on_off = true;
        } else {
            $("#sliding-info").animate({
                "left": 0
            })
            $(".bgcolor").animate({
                "width": 0
            })
        }
    })

    $("#sub").on('click', function () {
        // 验证登录
        var sig = /^\w{4,17}$/;
        var valueName = $("#name").val();
        var valuePw = $("#name").val();
        if ($("#name").val() == "") {
            layer.tips('不能为空哦~', $("#name"), {
                tips: [1, 'red']
            });
            $("#name").css("border-color", 'red');
            on_off = false;
            return;
        }
        if (!sig.test(valueName)) {
            layer.tips('格式错了哦', $("#name"), {
                tips: [1, 'gold']
            });
            $("#name").css("border-color", 'red');
            on_off = false;
            return;
        }
        if ($("#password").val() == "") {
            layer.tips('不能为空哦~', $("#password"), {
                tips: [1, 'red']
            });
            $("#password").css("border-color", 'red');
            on_off = false;
            return;
        }
        if (!sig.test(valuePw)) {
            layer.tips('格式错了哦', $("#password"), {
                tips: [1, 'red']
            });
            $("#password").css("border-color", 'red');
            on_off = false;
            return;
        }
        if (!on_off) {
            layer.tips('滑块还没到头呢', $("#sliding-box"), {
                tips: [1, 'skyblue']
            });
            return;
        }
        on_off = true;
        load = layer.load(0, {
            shade: false
        });
    });
    // 点击提交按钮
    $("#sub").click(function () {
        var type = $(this).attr("sub-type"),
            name = $("#name").val(),
            password = $("#password").val();
        // 登录
        if (type == 'login' && on_off) {
            $("#sub").attr('disabled', true);
            $.post("./php/login.php", {
                    'name': name,
                    'password': password,
                    'type': 'login'
                },
                function (res) {
                    $("#sub").attr('disabled', false);
                    if (res['name'] == name) {
                        if (res['password'] == password) {
                            layer.msg('登陆成功，正在跳转', {
                                time: 2000,
                                icon: 6
                            }, function () {
                                location.href = './login.html';
                            });
                        } else {
                            layer.msg('密码错误，登录失败。', {
                                time: 3000,
                                icon: 5
                            });
                        }
                    } else {
                        layer.msg('该用户名不存在。', {
                            time: 3000,
                            icon: 5
                        });
                    }
                    layer.close(load);
                }, 'json'
            );
        } else if (type == 'sigin' && on_off) {
            $("#sub").attr('disabled', true);
            $.post("./php/login.php", {
                    'name': name,
                    'password': password,
                    'type': 'sigin'
                },
                function (res) {
                    $("#sub").attr('disabled', false);
                    if (res == 'wrong') {
                        layer.msg('注册失败。', {
                            time: 3000,
                            icon: 5
                        });
                    }
                    if (res == false) {
                        layer.msg('该用户名已存在，请重新输入。', {
                            time: 3000,
                            icon: 5
                        });
                    }
                    if (res == true) {
                        layer.msg('注册成功，3S后自动跳转到登录页', {
                            icon: 6,
                            time:3000
                        }, function () {
                            location.href = "./login.html";
                        });
                    }
                    layer.close(load);
                }, 'json'
            );
        }
    })
})
$(init);

function init() {

    $("body").on('click', '#registBtn', doAddUsers);
}

function doAddUsers() {

    $.ajax({
        type: "POST",
        url: "/register",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            'usr': $("#un").val(),
            'pwd': $("#pw").val(),
            'email':$("#eml").val(),
            'id': $.cookie('id')
        }),
        success: function(result) {
            if (result.code == 99) {
                alert(result.msg);
                alert("注册失败！");
            } else {
                alert("注册成功！");
                location.href = "/login";
            }
        }
    })
}
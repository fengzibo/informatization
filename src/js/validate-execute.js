/**
 * Created by wulinbo on 16/7/28.
 */
$(function () {
    $.validator.setDefaults({
        submitHandler: function () {
            alert("提交事件!");
        }
    });
    $().ready(function () {
        // 提交时验证表单
        var validator = $("#form1").validate({
            errorPlacement: function (error, element) {
                // Append error within linked label
                $(element).after(error);
            },
            errorElement: "span",
            rules:{
                user:{
                    required:true,
                    minlength:3
                },
                pwd:{
                    required:true,
                    rangelength:[6,12]
                },
                repwd:{
                    required: true,
                    equalTo: "#pwd"
                },
                email:{
                    isZipCode: true
                }
            },
            messages: {
                user: {
                    af:"必须是一个字母,且a-f",
                    required: " 不能为空",
                    minlength: " 不能少于 3 个字母"
                },
                pwd: {
                    required: " 不能为空",
                    rangelength: " 字母不能少于 5 个且不能大于 12 个"
                },
                repwd:{
                    required:"不能为空",
                    equalTo: "密码验证需要与密码一致"

                },
                email:{
                    isZipCode:"请正确填写您的邮政编码",
                    ziprange:"211231e"
                }
            },
            success: function(span) {
                span.addClass("suc").text("输入正确");

            }
        });

        $(".cancel").click(function () {
            validator.resetForm();
        });
    });
})


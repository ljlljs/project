jQuery.validator.addMethod('tel', function(value) {
    let reg = /^1[3,5,6,7,8]\d{9}$/;
    if (reg.test(value)) {
        return true
    } else {
        return false
    }
}, '请输入正确的手机号码');


$('#registerForm').validate({
    rules: {
        uname: {
            required: true,
            maxlength: 12,
            minlength: 4
        },
        userpwd: {
            required: true,
            maxlength: 16,
            minlength: 6
        },
        tel: {
            required: true,
            tel: true
        }

    },
    messages: {
        uname: {
            required: '用户名必填项',
            maxlength: '用户的最大长度只能为12位',
            minlength: '用户名不能低于4位字符'
        },
        userpwd: {
            required: '密码必填项',
            maxlength: '密码的最大长度只能为16位',
            minlength: '密码名不能低于6位字符'
        },
        tel: {
            required: '手机必填项',
            tel: '手机号格式不正确'
        }
    },
    submitHandler: function() {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 
        // 发送ajax请求
        console.log(1);

        console.log(this.successList[0].value);
        $.get('../api/login1.php', {
            tel: this.successList[0].value,
            userpwd: this.successList[1].value
        }, function(res) {
            if (res.code == 1) {
                alert('注册成功，请去登录');
                location.href = "./login.html"
            } else {
                alert('注册失败，该用户存在')
            }
        }, 'json');

    }
})
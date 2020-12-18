let username = document.querySelector("#username");
let password = document.querySelector("#password");
let form = document.querySelector("#a");
let btn = document.querySelector('.btn-box')
console.log(form)
btn.onclick = function() {
    console.log(username.value);
    console.log(password.value);
    // let e = window.event;
    // e.preventDefault();
    pAjax({
        type: 'post',
        url: '../api/login.php',
        data: {
            username: username.value,
            password: password.value
        }
    }).then(res => {
        // if () {
        //     // 登录成功存储 登录的状态

        //     // setCookie('login', );
        //     // 跳转页面 如果从购物车过来的时候登录成功去购物车页面
        //     // 否则就去到首页
        //     // let url = localStorage.getItem('url');
        //     if (url) {
        //         location.href = url;
        //         // 登录成功的时候把url的这个cookie值清除
        //         localStorage.removeItem('url');
        //     } else {
        //         location.href = 'index.html';
        //     }
        // }
        let res1 = JSON.parse(res);

        if (res1.code == 1) {
            localStorage.setItem("login", username.value);
            location.href = 'index.html';
        } else {
            alert(res1.message);
        }


    })
}
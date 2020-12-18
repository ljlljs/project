let container = document.querySelector('.container');
// 判断是否有登录
let login = localStorage.getItem('login');
if (!login) {
    location.href = '../html/login.html';
    // setCookie('url','http://gz2008.com/day06_code/project/html/car.html')
    // localStorage.setItem('url', 'http://gz2008.com/day06_code/project/html/car.html');

}

// 获取用户购物车中的数据
pAjax({
    url: '../api/getCarData.php',
    data: { username: login }
}).then(res => {
    // 先把数据存放到本地


    let res2 = JSON.parse(res)
    localStorage.setItem('bilibili', JSON.stringify(res2));
    // console.log(res2);
    // let res1 = localStorage.getItem('bilibili');
    render(res2);
    // console.log(res1);

})

function render(data) {


    // data 请求出来的数据 有可能一条数据都没有
    if (!data.length) {
        container.innerHTML = `<div class="jumbotron">
            <h1>亲爱的用户</h1>
            <p>您购物空空如也，请到列表页选购你商品</p>
            <p><a class="btn btn-primary btn-lg" href="../html/index.html" role="button">点击去到列表页</a></p>
        </div>`;
        return
    }


    let allChecked = data.every(item => {
        return item.is_select == 1;
    });
    console.log(data);

    let total = shopNum(data);
    console.log(total);


    let str = `<div class="panel panel-default">
                <div class="panel-heading">
                    <div class="content">
                        <label for="" class="checkbox">
                            <input type="checkbox" id="all" ${allChecked?'checked' :''}>
                            <span>全选</span>
                        </label>
                        <label for="" class="type">
                            <span>商品种类：</span>
                            <span>${data.length}</span>
                        </label>
                        <label for="" class="qty">
                            <span>所选商品数量：</span>
                            <span>${total.totalNum}</span>
                        </label>
                        <label for="" class="price">
                            <span>所选商品价格：</span>
                            <span>${total.totalPrice}</span>
                        </label>
                        <label for="">
                            <button class="btn btn-warning btn-xs jieSuan">结算</button>
                            <button class="btn btn-info btn-xs qingKong">清空购物车</button>
                        </label>
                    </div>
                </div>`;

    str += `<div class="panel-body"><ul>`;

    data.forEach(item => {
        str += ` <li>
                        <div class="media">
                            <div class="media-left media-middle">
                                <input type="checkbox" class="check" ${item.is_select==1 ?'checked':''} id="${item.id}">
                                <a href="#">
                                    <img class="media-object"
                                        src="${item.img}"
                                        alt="">
                                </a>
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">${item.name}</h4>
                                <div class="price">
                                    <i class="glyphicon glyphicon-yen"></i>
                                    <span>${item.price}</span>
                                </div>
                                <div class="btn">
                                    <p>
                                        <butto class="btn btn-danger del" id="${item.id}">删除商品</butto>
                                    </p>
                                    <div class="btn-group" id="${item.id}" role="group" aria-label="...">
                                        <button class="btn btn-default reduce">-</button>
                                        <button class="btn btn-default">${item.cart_number}</button>
                                        <button class="btn btn-default add">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`
    })

    str += ` </ul></div></div> `;

    container.innerHTML = str;

}

container.onclick = function() {
    let e = window.event;
    // 全选
    if (e.target.id == 'all') {
        let data = JSON.parse(localStorage.getItem('bilibili'));
        console.log(data);
        data.forEach(item => {
            e.target.checked ? item.is_select = 1 : item.is_select = 0
        });
        // console.log(res);
        localStorage.setItem('bilibili', JSON.stringify(data));
        render(data);
    }

    // 单选
    if (e.target.className == 'check') {
        let id = e.target.getAttribute('id');
        let data = JSON.parse(localStorage.getItem('bilibili'));
        // let res = JSON.parse(data);
        console.log(data)

        data.forEach(item => {
                if (item.id == id) {
                    item.is_select = e.target.checked ? 1 : 0;
                }
            })
            // 需要把 修改够的数据存储本地存储中
        localStorage.setItem('bilibili', JSON.stringify(data));
        render(data);
    }



    if (e.target.classList.contains('del')) {
        // 删除数据库中 和 本地存储中对应的数据 

        let id = e.target.getAttribute('id');

        pAjax({
            url: '../api/removeCarData.php',
            data: {
                username: login,
                goods_id: id
            }
        }).then(res => {
            let res1 = JSON.parse(res);
            console.log(res1);

            if (res1.code) {
                // 先获取本地存储中的数据
                let data = JSON.parse(localStorage.getItem('bilibili'));
                console.log(data);

                let res1 = data.filter(item => {
                    return item.goods_id != id;
                });

                localStorage.setItem('bilibili', JSON.stringify(res1));
                render(res1);
            }
        })
    }

    // 更新商品的数量

    if (e.target.classList.contains('reduce')) {


        // 进行数量减法
        let data = JSON.parse(localStorage.getItem('bilibili'));

        let id = e.target.parentNode.getAttribute('id');
        let obj = data.filter(item => {
            return item.id == id
                // return item.goods_id == id
        })[0];
        console.log(obj);
        let num = obj.cart_number * 1;
        if (num <= 1) {
            num = 1
        } else {
            num--
        }
        pAjax({
            url: '../api/updCarData.php',
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            }
        }).then(res => {
            let res1 = JSON.parse(res);

            if (res1.code) {
                obj.cart_number = num;
                localStorage.setItem('bilibili', JSON.stringify(data));
                render(data);
            }
        })
    }

    if (e.target.classList.contains('add')) {
        // 进行数量加法
        let data = JSON.parse(localStorage.getItem('bilibili'));
        let id = e.target.parentNode.getAttribute('id');
        let obj = data.filter(item => {
            return item.id == id
        })[0];

        let num = obj.cart_number * 1;
        num++
        pAjax({
            url: '../api/updCarData.php',
            data: {
                username: login,
                goods_id: id,
                goods_num: num
            }
        }).then(res => {

            let res1 = JSON.parse(res);
            if (res1.code) {
                obj.cart_number = num;
                localStorage.setItem('bilibili', JSON.stringify(data));
                render(data);
            }
        })
    }
    //清空数据
    if (e.target.classList.contains('qingKong')) {
        pAjax({
            url: '../api/clearCarData.php',
            data: {
                username: login,
            }
        }).then(res => {
            let res1 = JSON.parse(res);

            if (res1.code) {
                // localStorage.removeItem('cakelist');//方法一直接移除'goodlist'
                localStorage.setItem('cakelist', JSON.stringify(res1)); //方法二更新存储信息
                render(res1);
            }
        })

    }
    //结算
    if (e.target.classList.contains('jieSuan')) {
        pAjax({
            url: '../api/clearCarData.php',
            data: {
                username: login,
            }
        }).then(res => {
            let res1 = JSON.parse(res);
            if (res1.code) {
                // localStorage.removeItem('cakelist');//方法一直接移除'goodlist'
                localStorage.setItem('cakelist', JSON.stringify(res1)); //方法二更新存储信息
                render(res1);
            }
        })
        alert('支付成功')
    }
}


function shopNum(goods) {
    let res = goods.filter(item => {
        return item.is_select == 1
    })
    console.log(res);


    // 计算选中商品的数量
    let totalNum = res.reduce((pre, item) => {
        return pre + item.cart_number * 1
    }, 0);

    // 计算选中商品的总价格
    let totalPrice = res.reduce((pre, item) => {
        return pre + item.price * item.cart_number
    }, 0);

    return {
        totalNum,
        totalPrice
    }
}
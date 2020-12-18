// 打开详情页的时候先查看是否有携带id参数
// 如果没有id参数的时候 跳转到列表 
// 如果有id参数的时候 根据id去获取对象的数据 渲染

// http://gz2008.com/day06_code/project/html/detail.html?id=4

let reg = /id=(\d+)/;
console.log(reg);

// if (!reg.test(location.search)) {
//     location.href = '../html/index.html'
// }
let id = reg.exec(location.search)[1];
console.log(id);



let buyticket = document.querySelector('.buyticket');
// 根据id获取数据
pAjax({
    url: '../api/getDetail.php',
    data: {
        id
    }
}).then(res => {
    let res1 = JSON.parse(res);
    console.log(res1.detail);
    renderHtml(res1.detail)


})


function renderHtml(data) {
    buyticket.innerHTML = `
   

    <div class="bread-wrapper"><span><a href="https://www.bilibili.com/">Bilibili</a></span> <span class="symbol">&gt;</span> <span><a href="../html/index.html">会员购</a></span> <span class="symbol">&gt;</span> <span class="project-name">${data.name}</span></div>
    <div class="whole-detail-info-wrapper">
        <div class="detail-img-icon no_pic" style="background-image: url(${data.img});"></div>
        <div class="detail-info-wrapper">
            <div class="product-info-name">
                <!----><span class="title">${data.name}</span></div>
            <!---->
            <div class="product-info-time-wrapper">
                <div class="product-info-time-title">时间：</div>
                <div class="product-info-time">${data.tlabel}</div>
            </div>
            <div class="vuene-wrapper">
                <div class="title">场馆：</div>
                <div class="vuene-info-content">
                    <div class="vuene-name">${data.bi_name}</div>
                    <div class="address-name">新港东路1000号（地铁8号线琶洲站PWTC出口）</div>
                    <div class="address-icon"></div>
                    <div class="check-map">查看地图</div>
                </div>
            </div>


            <!---->
            <div class="login-show-wrapper">
                <ul class="clearfix mr4">
                    <li class="title">场次：</li>
                    <li class="screens">
                        <div class="selectable-option active">
                            2月20日
                        </div>
                        <div class="selectable-option">
                            2月21日
                        </div>
                        <!---->
                    </li>
                </ul>
                <ul class="clearfix">
                    <li class="title">价格：</li>
                    <li class="tickets">
                        <div class="selectable-option active">
                        ${data.price}
                        </div>
                    </li>
                </ul>
               
                <!---->
                <div class="supplement">
                    <div class="express-info"><i class="icon-small-circle"></i> <span>电子票/兑换票·无需配送</span>
                        <!---->
                    </div>
                    <!---->
                    <div class="refund-info"><i class="icon-small-circle"></i> <span class="">不支持7天无理由退票</span></div>
                </div>
                <div class="product-buy-wrapper">
                    <div class="product-buy enable">
                        <div id="goCar">立即购票</div>
                    </div>
                    <div class="product-buy enable">
                    <div id="addCar">加入购物车</div>
                    </div>
                    
                    <!---->
                    <div class="promo-btn" style="display: none;">
                        <div class="sub-text">参与限时优惠</div>
                        <div class="sub-text">低至折</div>
                        <div class="qr-code-wrapper" style="display: none;">
                            <div class="text-wrapper">
                                <p>该功能仅限移动端享用</p>
                                <p>快扫描参与限时特惠活动吧~</p>
                            </div>
                            <div id="qrcode-promo-xsth" class="qrcode-promo-xsth"></div>
                        </div>
                    </div>
                    <div class="promo-btn" style="display: none;">
                        我要拼团
                        <div class="qr-code-wrapper" style="display: none;">
                            <div class="text-wrapper">
                                <p>该功能仅限移动端享用</p>
                                <p>快扫描二维码发起拼团吧~</p>
                            </div>
                            <div id="qrcode-promo" class="qrcode-promo"></div>
                        </div>
                    </div>
                    <div class="promo-btn" style="display: none;">
                        参加票票团
                        <div class="qr-code-wrapper" style="display: none;">
                            <div class="text-wrapper">
                                <p>该功能仅限移动端享用</p>
                                <p>快扫描二维码参加票票团吧~</p>
                            </div>
                            <div id="qrcode-promo-refund" class="qrcode-promo-refund"></div>
                        </div>
                    </div>



                    


                    
                </div>
            </div>
        </div>
    </div>

        `
}

buyticket.onclick = function() {
    let e = window.event;
    if (e.target.id == 'goCar') {
        location.href = '../html/car.html'
    }

    if (e.target.id == 'addCar') {
        // 因为添加到购物车按钮 需要把用户名和商品id
        // 所以需要判断是否有登录
        let login = localStorage.getItem('login');
        console.log(id)

        if (!login) {
            location.href = './login.html';
            // localStorage.setItem('url', 'http://b1b1.com/html/detail.html?id=' + id)
            return

        }
        pAjax({
            url: '../api/addCarData.php',
            data: {
                username: login,
                id: id
            }
        }).then(res => {
            console.log(JSON.parse(res));
        })
    }
}
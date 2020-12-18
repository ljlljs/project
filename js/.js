// 列表页

let list = document.querySelector(".list");
let page = document.querySelector('.page');

let defaultInfo = {
    len: 20,
    num: 1
}
pAjax({
    url: '../api/xiel.php',
    data: {
        start: defaultInfo.num,
        len: defaultInfo.len
    }
}).then((res) => {
    new Pagination(page, {
        pageInfo: {
            pagenum: 1,
            pagesize: defaultInfo.len,
            total: res.total,
            totalpage: Math.ceil(res.total / defaultInfo.len)
        },
        textInfo: {
            first: '首页',
            prev: '上一页',
            list: '',
            next: '下一页',
            last: '最后一页'
        },
        change: function(num) {
            defaultInfo.num = num;
            getData();
            scrollTo(0, 0)
        }
    });
})

async function getData() {
    let res = await pAjax({
        url: '../api/xiel.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len
        }
    });
    console.log(res);
    renderHtml(res.list);
}

function renderHtml(data) {
    let str = '';

    data.forEach((item, index) => {
        str += ` <li class="list-item">
        <div class="row">
            <div>
                <div class="thumbnail">
                    <img src="${item.Pic}"
                        alt="...">
                    <div class="caption">
                        <h3>${item.name}</h3>
                        <div class="price">
                            <i class="glyphicon glyphicon-yen"></i>
                            <span>${item.pie}</span>
                        </div>
                        <p>
                            <a href="./car.html" class="btn btn-primary" role="button">查看购物车</a>
                            <a href="./detail.html?id=${item.id}" class="btn btn-info" role="button">查看商品详情</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </li>`;
    })

    list.innerHTML = str;
}
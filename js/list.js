// let list = document.querySelector(".list_a");
let list = document.querySelector(".list");
let page = document.querySelector('.page');

let defaultInfo = {
    len: 20,
    num: 1
}
pAjax({
    url: '../api/getData1.php',
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
        url: '../api/getData1.php',
        data: {
            start: defaultInfo.num,
            len: defaultInfo.len
        }
    });
    let res1 = JSON.parse(res)
    console.log(res1.list);
    renderHtml(res1.list);
    // renderHtml(JSON.parse(res).list);
}


function renderHtml(data) {
    let str = '';
    data.forEach((item, index) => {
        console.log(111);
        str += ` <div class="project-list-wrapper">
        <div class="project-list">
        <div class="project-list-item">
            <div class="project-list-item-img" style="background-image: url(${item.img});"></div>
            <div class="project-list-item-detail">
                <div class="project-list-item-title" style="-webkit-box-orient: vertical;"><a href="./detail.html?id=${item.id}">${item.name}</a></div>
                <div class="project-list-item-time"><span class="icon time-icon"></span>${item.tlabel}
                </div>
                <div class="project-list-item-address"><span class="icon address-icon"></span> <span class="city-name">广州市</span> <span class="venue-name-and-address">${item.bi_name}</span></div>
                <div class="project-list-item-price">
                    <div class="not-free"><span class="price-symbol">¥</span> <span class="price">${item.price}</span> <span class="start">起</span>
                        <!---->
                        <!---->
                        <!---->
                        <!----><span class="promo-item">独家</span>
                        <!---->
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>`;
    })

    list.innerHTML = str;
}
// 调用 第一个参数是id  第二个是路径
loadlive2d("live2d", "/home/lib/rem/model.json");


// 菜单模块
var righton = document.querySelector('header').querySelector('.right')
// 菜单按钮
var menu = document.querySelector('header').querySelector('.menu')
menu.addEventListener('click', function () {
    mask.style.display = 'block'
    righton.style.transform = 'translate(0, 0)'
})
// 菜单退出按钮
var mask = document.querySelector('.mask')
mask.addEventListener('click', function () {
    righton.style.transform = 'translate(-200%, 0)'
    mask.style.display = 'none' 
})
// 返回顶部
var up = document.querySelector('.up')

// 监控侧边栏按钮
document.addEventListener('scroll', function () {
        if (window.pageYOffset > 700) {
            up.style.display = 'block'
        } else {
            up.style.display = 'none'

        }
})

// 侧边栏按钮 返回顶部
up.addEventListener('click', function () {
        animate(window,0)
})


// 获取网站的数据
$.ajax({
        url: '/admin/webset',
        success: function (reslut) {
         var res = reslut
          $('head').append(`<meta name="description" content="${res.description}"></meta>`)
          $('head').append(`<meta name="keywords" content="${res.keyword}"></meta>`)
          $('head').append(`<link rel="shortcut icon" href="${res.icon}" type="image/x-icon">`)
        }
})
// 获取导航栏数据
$.ajax({
    type: 'get',
    url: '/admin/navData',
    success: function (reslut) {
        var html = template('navTpl', { navData: reslut });
        $('header .right').html(html)
    }
})
 

// 获取友情链接数据
$.ajax({
    type: 'get',
    url: '/admin/linkData',
    success: function (reslut) {
        var html = template('linkTpl', { linkData: reslut });
        $('.link').append(html)
    }
})


// 判断是移动端 还是 电脑端
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        //跳转移动端页面
        $('#live2d').hide()
    } else {
        //跳转pc端页面
        $('#live2d').show()
    }
}
// browserRedirect();
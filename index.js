$(function () { 
loadingOpen()
})
// 获取 网站配置数据
$.ajax({
    url: '/admin/webset',
    success: function (reslut) {
        var res = reslut
      $('title').html(res.name)
    }
})
//  获取文章数据 
$.ajax({
    url: '/home/articleList',
    success: function (reslut) {
        var html = template('articleListTpl', { data: reslut});
        $('#article').html(html)
        var contentData = document.querySelectorAll('#contentData')
        for (var i = 0; i < contentData.length; i++) {
            contentData[i].setAttribute('id', 'contentData' + i);
            $("#appendTest").val();//将需要转换的内容加到转换后展示容器的textarea隐藏标签中
            // 将 editor.md 解析成 html
            //转换开始,第一个参数是上面的div的id
            editormd.markdownToHTML(`contentData${i}`, {
                htmlDecode: "style,script,iframe", //可以过滤标签解码
                emoji: true,
                taskList: true,
                tex: true,               // 默认不解析
                flowChart: true,         // 默认不解析
                sequenceDiagram: true,  // 默认不解析
            });
        }
        // 获取所有文章
        let article_item = $('.article_item');
        // 循环
        Array.from(article_item).forEach((item, index) => {
        $(document).ready(function () {//在文档加载完毕后执行
            $(window).scroll(function () {//开始监听滚动条
                //获取当前滚动条高度
                var topp = $(document).scrollTop();
        
                var itemtop = $(item).offset().top + -800
                // console.log(topp);
                if (itemtop <= topp) {
                    $(item).addClass('article_item_anm')
                }
            })
        })
    }); loadingcut()
    }
})
  
// 获取文章分页页码
$.ajax({
    url: '/admin/articlelimitPage',
    success: function (reslut) {
        // 获取reslut的长度
        var num = reslut.length
        // 判断是否显示 下一页 按钮
        if (num > 1) {
            $('.next').show()
        } else {
        }
        // 设置页码
        var i = 1
        // 下一页
        $('.next').on('click', function () {
            // 点击一次页码就 加 1
            i++
            // 调用发送请求函数 将页码传递过去 
            getpage(i)
            // 判断页码是否等于了num
            if (i == num) {
                // 显示上一页
                $('.previous').show()
                // 隐藏下一页
                $('.next').hide()
                return
            }
        })
        // 上一页
        $('.previous').on('click', function () {
          // 点击一次页码就  -1
            i--

            getpage(i)

            if (i == 1) {
                $('.previous').hide()

                if (reslut.length+1 < 1) {
            
                } else {
                    $('.next').show()
                }
                
                return
            }
        })

        // 发送请求函数
        function getpage(page) {
            var num = page - 1
            $.ajax({
                type: 'post',
                url: '/admin/articlelimit',
                data: {
                    page:num
                },
                success: function (reslut) {
                    // 调用 template
                    var html = template('articleListTpl', { data: reslut });
                    // 添加
                    $('#article').html(html)
                    // 返回顶部
                    animate(window, 0)
                }
            })
        }
    }
})


 
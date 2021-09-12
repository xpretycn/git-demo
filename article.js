$(function () { 
  loadingOpen()
  })
var id = getUrlParams('id')
// 发送请求获取网站信息
$.ajax({
  url: '/admin/webset',
  success: function (reslut1) {
    var res1 = reslut1
    var id = getUrlParams('id')
    // 根据地址栏传递过来的id进行发送请求
    // 获取文章数据
    $.ajax({
      url: '/home/articleData?id=' + id,
      success: function (reslut2) {
        var res2 = reslut2[0]
        //  网页标题
        $('title').html(res1.name + '-' + res2.title)
        // 将获取到的数据 进行 拼接
        // 文章标题
        $('.article .title').html(res2.title)
        // 文章时间
        $('.article .date').html(res2.date.substr(0, 10))
        // 文章内容
        $("#appendTest").val(res2.content);//将需要转换的内容加到转换后展示容器的textarea隐藏标签中
        // 将 editor.md 解析成 html
        //转换开始,第一个参数是上面的div的id
        editormd.markdownToHTML("articleContent", {
            htmlDecode: "style,script,iframe", //可以过滤标签解码
            emoji: true,
            taskList: true,
            tex: true,               // 默认不解析
            flowChart: true,         // 默认不解析
            sequenceDiagram: true,  // 默认不解析
        });
  loadingcut()
      }
    })
  }
})

// 根据文章id获取评论数据
$.ajax({
  url: '/home/comments?id=' + id,
  success: function (reslut) {
    if (reslut.length != 0) {
      var html = template('commentsTpl', { data: reslut });
      $('.comments_list').append(html) 
    } else {
      $('.comments_list').append('<span>没有评论哦</span>')
    }
   
  }
})


// 评论内容输入框里面的小图片
// 失去焦点
$('#content').focus(function () {
  $('.content_icon').animate({ right: '-50%' });
})
// 获取焦点
$('#content').blur(function () {
  $('.content_icon').animate({ right: '10%' });

})

// 获取地址栏参数
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&');
  // 循环数据
  for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=');
    if (tmp[0] == name) {
      return tmp[1];
    }
  }
  return -1;
}

// 评论表单提交

$('#form').on('submit', function () {
  var formData = $(this).serialize();
  var id = getUrlParams('id')
  if ($('#name').val().length == 0) {
    alert('请输入昵称')
    return false
  }
  if ( $('#contact').val().length == 0) {
    alert('请输入邮箱')
    return false
  } 
  if ($('#content').val().length == 0) {
    alert('请输入评论内容')
    return false
  }
  var date = getTimer()
  formData = formData + '&id=' + id + '&date=' + date
  // 发送评论添加
  $.ajax({
    type: 'post',
    url: '/admin/commentsAdd',
    data: formData,
    success: function (reslut) {
      alert("评论成功")
      location.reload()
    }
  })
  // 阻止表单默认提交
  return false
})


// 获取时间 函数
function getTimer() {
  var date = new Date()
  var year = date.getFullYear()   
  var month = date.getMonth() + 1
  var dates = date.getDate()
  return year + '-' + month + '-' + dates      
}




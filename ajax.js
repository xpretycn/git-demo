function ajax(options) {
    // 存储的是默认值
    var defaults = {
        type: "get",
        url: "",
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function () { },
        error: function () { },

    }
    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options)
    // 创建ajaxx对象
    var xhr = new XMLHttpRequest()
    // 拼接请求参数变量
    var params = ''
    // 循环用户传递进来的对象格式参数
    for (var attr in defaults.data) {
        // 将参数转换为字符串格式
        params += attr + '=' + defaults.data[attr] + '&'
    }
    // 将参数最后面的&截取掉
    // 将截取的结果重新赋值给params变量
    params = params.substr(0, params.length - 1)

    //判断请求方法
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params
    }

    // 配置ajax对象
    xhr.open(defaults.type, defaults.url)

    if (defaults.type == 'post') {
        // 设置用户希望向服务器端传递参数的类型
        var ContentType = defaults.header['Content-Type']
        // 设置请求参数格式的类型
        xhr.setRequestHeader('Content-Type', ContentType)
        if (ContentType == 'application/json') {
            // 发送请求
            xhr.send(JSON.stringify(defaults.data))
        } else {
            // 发送请求
            xhr.send(params)
        }
    } else {
        // 发送请求
        xhr.send()
    }

    // 监听xhr对象下面的onload事件
    // 当xhr对象接收完响应结果后触发
    xhr.onload = function () {
        // 获取响应头数据
        var ContentType = xhr.getResponseHeader('Content-Type')
        // 服务器端返回的数据
        var responseText = xhr.responseText
        // 如果响应类型中包含application/json
        if (ContentType.includes('application/json')) {
            // 将json字符串转换为json对象并且重新赋值
            responseText = JSON.parse(responseText)

        }

        // 当http状态码等于200的时候
        if (xhr.status == 200) {
            // 请求成功 调用处理成功的函数
            defaults.success(responseText, xhr)
        } else {
            // 请求失败 调用处理失败情况的函数
            defaults.error(responseText, xhr)
        }

    }

}
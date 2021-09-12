function animate(obj, target, callback) {

    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target) {

            clearInterval(obj.timer);

            callback && callback();
        }
        window.scroll(0, window.pageYOffset + step)
    }, 10);
}
function resetWidth() {

    // 兼容ie浏览器 document.body.clientWidth

    var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;

    // 默认的设置是375px(ip6)的根元素设为100px, 其他的手机都相对这个进行调整

    document.documentElement.style.fontSize = baseWidth / 375 * 14 + 'px'

}

resetWidth();

window.addEventListener('resize', function () {

    resetWidth();

})
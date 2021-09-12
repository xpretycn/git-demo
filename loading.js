function loadingOpen() {
    $('body').parent().css('overflow-x', 'hidden')
    $('body').parent().css('overflow-y', 'hidden')
    $('#loading').show()
}

function loadingcut () {
$('body').parent().css('overflow-x', 'auto')
$('body').parent().css('overflow-y', 'auto')
$('#loading').fadeOut()
}
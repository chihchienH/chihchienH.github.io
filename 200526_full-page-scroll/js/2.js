$(document).ready(function () {
  var $box = $('.box');
  $box.eq(0).addClass('ch_bg');

  //click event
  $box.on('click', function () {
    var boxIndex = $(this).index();
    var articleTop = windowVertical(boxIndex);

    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');
    $('html, body').animate({ scrollTop: articleTop }, 1000);
    console.log(articleTop);
  });

  //resize event (when resize the browser)
  $(window).on('resize', function () {
    var selectedIndex = $('div.ch_bg').index();
    var r_aTop = windowVertical(selectedIndex);

    $('html, body').scrollTop(r_aTop);
  });

  //scroll event (when scroll the browser, change asidebox color)
  $(window).on('scroll', function () {
    var wHeight = $(window).height();
    var wScroll = $(window).scrollTop();
    var findIndex = Math.round(wScroll/wHeight); //0, 1, 2
    console.log(findIndex);

    $('.box').eq(findIndex).addClass('ch_bg').siblings().removeClass('ch_bg');
  });
});

//this function is follow by window (which is current browser size)
function windowVertical(index) {
  var bgImageHeight = $(window).height();
  var bgImageTop = bgImageHeight * index * 1;
  //because we use 'scroll bar', so top is positive to 'push' the scroll down
  return bgImageTop;
}

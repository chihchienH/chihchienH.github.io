$(document).ready(function () {
  var $box = $('.box');
  var $aside = $('aside');

  $box.eq(0).addClass('ch_bg');

  /////////functions/////////

  jQuery.fn.extend({
    makeMiddle: function(h){
      return (h - $(this).innerHeight()) / 2;
    }
  });
  //this function is follow by window (which is current browser size)
  function windowVertical(index) {
    var bgHeight = $(window).height(); //$(window) will be called back to function below, which(function) is run in current window size, so it will be !!responsive!!
    var bgImageTop = bgHeight * index * 1; //we use 'scroll bar', so top is positive to 'push' the scroll down
    return bgImageTop;
  }


  /////////events/////////
  //click event -> will trigger scroll event
  $box.on('click', function () {
    var boxIndex = $(this).index();
    var articleTop = windowVertical(boxIndex);

    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');
    $('html, body').animate({ scrollTop: articleTop }, 500);
  });

  //resize event (when resize the browser)
  $(window).on('resize', function () {
    var selectedIndex = $('div.ch_bg').index();
    var r_aTop = windowVertical(selectedIndex);

    $('html, body').scrollTop(r_aTop);
    $aside.css({top: $aside.makeMiddle($(window).height())});
  });

  //scroll event (when scroll the browser, change asidebox color, and fix the aside position)
  $(window).on('scroll', function () {
    var wScroll = $(window).scrollTop();
    var wHeight = $(window).height();
    var findIndex = Math.round(wScroll / wHeight); //0, 1, 2
    var mTop = $aside.makeMiddle(wHeight);
    // console.log(mTop);

    $box.eq(findIndex).addClass('ch_bg').siblings().removeClass('ch_bg');
    $aside.stop().animate({ top: wScroll + mTop }, 500);
  });
});

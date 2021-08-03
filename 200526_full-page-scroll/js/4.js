$(document).ready(function () {
  $box = $('.box');
  $aside = $('aside');
  $mov = $('.moved');

  $box.eq(0).addClass('ch_bg');

  /////////events/////////
  //click event -> will trigger scroll event
  $box.on('click', function () {
    var boxIndex = $(this).index();
    var articleTop = windowVertical(boxIndex);

    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');
    $('html, body').animate({scrollTop: articleTop}, 1000);

    // if (boxIndex == 1 && movIsHidden) {
    //   $mov.removeClass('hid');
    // }
  });

  //resize event (when resize the browser)
  $(window).on('resize', function () {
    var selectedIndex = $('div.ch_bg').index();
    var r_aTop = windowVertical(selectedIndex);

    $('html, body').scrollTop(r_aTop);
  });

  //scroll event (when scroll the browser, change asidebox color, and fix the position)
  $(window).on('scroll', function () {
    var wHeight = $(window).height();
    var wScroll = $(window).scrollTop();
    let findIndex = Math.round(wScroll / wHeight); //0, 1, 2
    let movIsHidden = $mov.hasClass('hid');

    $('.box').eq(findIndex).addClass('ch_bg').siblings().removeClass('ch_bg');
    $('aside')
      .stop()
      .animate({top: wScroll + 50}, 600);

    //for scrolling to the second article
    // if (wScroll > wHeight && wScroll < wHeight * 2) {
    //   $mov.removeClass('hid');
    // }
    if (findIndex == 1 && movIsHidden) {
      $mov.removeClass('hid');
    } else if (findIndex != 1 && !movIsHidden) {
      $mov.addClass('hid');
    }

    console.log(movIsHidden);

  });

  //this function is follow by window (which is current browser size)
  function windowVertical(index) {
    let bgHeight = $(window).height();
    return bgHeight * index * 1;
  }
});

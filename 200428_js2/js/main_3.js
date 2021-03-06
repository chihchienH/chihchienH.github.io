// JavaScript Document
$(document).ready(function () {
  //full img

  $(window).bind('load resize', function () {
    re_win();

    var _ind = $('.box').index($('.ch_bg'));

    var top_rs = an_he(_ind);

    $('html, body').animate({ scrollTop: top_rs }, 1000);

    $('aside').stop().animate({ top: top_rs }, 1000);
  });

  //box event

  $('.box').eq(0).addClass('ch_bg');

  $('.box').click(function () {
    var _index = $(this).index();

    var top_s = an_he(_index);

    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');

    $('html, body').animate({ scrollTop: top_s }, 1000);
  });

  //scroll event

  $(window).scroll(function () {
    var _win_sc = $(window).scrollTop();

    var _in = ch_bt(_win_sc);

    $('.box').eq(_in).addClass('ch_bg').siblings().removeClass('ch_bg');

    $('aside').stop().animate({ top: _win_sc }, 1000);
  });

  function re_win() {
    var imgp = $('img').eq(0);
    var imgwidth = imgp.width();
    var imgheight = imgp.height();

    var winwidth = $(window).width();
    var winheight = $(window).height();

    var winratio = winwidth / winheight;
    var imgratio = imgwidth / imgheight;

    //$("section").css({ height: winheight});

    $('.content').css({ height: winheight });

    if (winratio > 1 && winratio > imgratio) {
      $('.content').find('.fullimg').css({
        width: '100%',
        height: 'auto',
      });
    } else {
      $('.content').find('.fullimg').css({
        width: 'auto',
        height: winheight,
      });
    }
  }

  function an_he(_index) {
    var h = $('.content').height();
    var top_s = h * _index;
    return top_s;
  }

  function ch_bt(_win) {
    var h = $('.content').height();
    var _in = Math.round(_win / h);
    return _in;
  }
});

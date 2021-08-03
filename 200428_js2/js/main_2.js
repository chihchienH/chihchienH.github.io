// JavaScript Document
$(document).ready(function () {
  //full img

  $(window).load(function () {
    re_win();
  });

  $(window).resize(function () {
    re_win();

    var r_in = $('div.ch_bg').index();

    var top_rs = an_he(r_in);

    $('html, body').animate({ scrollTop: top_rs }, 500);
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

    var _ind = ch_bt(_win_sc);

    $('.box').eq(_ind).addClass('ch_bg').siblings().removeClass('ch_bg');
  });

  function re_win() {
    var imgp = $('img').eq(0);
    var imgwidth = imgp.width();
    var imgheight = imgp.height();

    var winwidth = $(window).width();
    var winheight = $(window).height();

    var winratio = winwidth / winheight;
    var imgratio = imgwidth / imgheight;

    $('.content').css({ height: winheight });

    if (winratio > imgratio) {
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

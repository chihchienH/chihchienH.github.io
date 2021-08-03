// JavaScript Document
$(document).ready(function () {
  //full img

  $(window).bind('load resize', function () {
    re_win();

    var _ind = $('.box').index($('.ch_bg'));

    var top_rs = an_he(_ind);

    $('.content').css({ top: top_rs }, 1000);
  });

  //box event

  $('.box').eq(0).addClass('ch_bg');

  $('.box').click(function () {
    var _ind2 = $(this).index();

    var top_s = an_he(_ind2);

    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');

    $('.content').animate({ top: top_s }, 1000);
  });

  function re_win() {
    var imgp = $('img').eq(0);
    var imgwidth = imgp.width();
    var imgheight = imgp.height();

    var winwidth = $(window).width();
    var winheight = $(window).height();

    var winratio = winwidth / winheight;
    var imgratio = imgwidth / imgheight;

    $('section').css({
      height: winheight,
    });

    $('.content').css({
      height: winheight,
    });

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
    var top_s = h * _index * -1;
    return top_s;
  }
});

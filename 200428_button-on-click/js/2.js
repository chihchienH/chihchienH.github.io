$(document).ready(function () {
  $('.box').eq(0).addClass('ch_bg');
  $('.content').eq(0).show(); //show the first content in begin

  $('.box').click(function () {
    // get the .box array num
    var $index = $(this).index();
    var $isCheck = $(this).hasClass('ch_bg');

    if ($isCheck) {
      $(this).removeClass('ch_bg');
      $('.content').fadeOut(1000);
    } else {
      $(this).addClass('ch_bg').siblings().removeClass('ch_bg');
      // $(.content:eq())
      $('.content').eq($index).fadeIn(1000).siblings().fadeOut(1000);
    }
  });
});

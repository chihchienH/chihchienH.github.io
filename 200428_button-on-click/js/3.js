
$(document).ready(function () {
  $('.box').eq(0).addClass('ch_bg');
  $('.content').eq(0).show();

  // when click the left box
  $('.box').click(function () {
    var $index = $(this).index();
    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');

    // animate slide left
    var $left_s = 480 * $index * -1;
    $('.content').animate({ left: [$left_s, 'easeInCubic'] }, 500);
  });
});

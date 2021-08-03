$(document).ready(function () {
  $('.box').click(function () {
    var $index = $(this).index();
    var $check = $(this).hasClass('ch_bg');
    var $left_s = 480 * $index * -1;
    // $('.content-color').animate({ left: ['toggle', 'easeInCubic'] }, 500);
    //toggle 切換後會將物件 display=none，使用toggleClass較佳
    // $('.content-color').animate({ left: [$left_s, 'easeInCubic'] }, 500);

    $(this).toggleClass('ch_bg');
    $(".content-color").addClass("content-unmove");
    if(!$check){
      $(".content-color").removeClass("content-unmove");
      $(".content-color").addClass("content-move");
    }
    // if(!$check){
    //   $(this).addClass('ch_bg');
    //   $(".content-color").removeClass("content-unmove");
    //   $(".content-color").addClass("content-move");
    // } else {
    //   $(this).removeClass('ch_bg');
    //   $(".content-color").removeClass("content-move");
    //   $(".content-color").addClass("content-unmove");
    // }
  });
});

$(document).ready(function () {
  var $box = $('.box');
  $box.eq(0).addClass('ch_bg');
  $('h1').eq(0).show();

  $box.on('click', function () {
    var boxIndex = $(this).index();
    var articleTop = windowVertical(boxIndex);

    $(this).addClass('ch_bg').siblings().removeClass('ch_bg');
    $('article').animate({ top: articleTop }, 1000);
    $('h1').eq(boxIndex).siblings().fadeOut(800);
    $('h1').eq(boxIndex).fadeIn(1500);
    console.log(articleTop);
  });

  //resize event (when resize the browser)
  $(window).on('resize', function () {
    var selectedIndex = $('div.ch_bg').index();
    var r_aTop = windowVertical(selectedIndex);

    $('article').css({ top: r_aTop }, 1000);
    // go check htmlDOM when resizing browser -> article <style>top:</style>
  });
});

//this function is follow by window (which is current browser size)
function windowVertical(index) {
  var bgImageHeight = $(window).height();
  var bgImageTop = bgImageHeight * index * -1;
  return bgImageTop;
}

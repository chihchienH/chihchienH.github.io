$(document).ready(function () {

  /////----- Section white--brief title on scroll-----/////
  $brief = $('.brief-title');
  $title = $('h1');
  $job = $('.job');
  $quote = $('h3.italic');
  $describe = $('.brief-title p');
  $underline = $('.scroll-text-underline');

  $(window).on('scroll resize load', function () {
    var pageTop = $(this).scrollTop();
    var pageHeight = $(this).height();
    var pageBottom = pageTop + pageHeight;
    var divTop = $brief.offset().top;
    var divBottom = divTop + $brief.height();
    var distence = pageBottom - divBottom;

    if (distence >= 600 && distence < pageHeight) {
      $('h1').attr('class', 'small');
      $job.addClass('display-none');
      $quote.removeClass('display-none');
      $quote.addClass('show-text');
      $describe.removeClass('display-none');
      $describe.addClass('show-text');
      $underline.addClass('scroll');
    } else if (distence < 600) {
      $('h1').attr('class', '');
      $job.removeClass('display-none');
      $quote.addClass('display-none');
      $quote.removeClass('show-text');
      $describe.addClass('display-none');
      $describe.removeClass('show-text');
      $underline.removeClass('scroll');
    }

  });

});

// Section white-brief title
// AOS.init({
//   duration: 1200,
//   easing: 'ease-in-out'
// });

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
}

var brief = document.querySelector('.brief-title');
var briefOffset = offset(brief);
console.log(briefOffset.left, briefOffset.top);

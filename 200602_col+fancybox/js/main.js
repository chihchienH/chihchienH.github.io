// JavaScript Document
$(document).ready(function () {
  $(window).on('load', 'resize',function () {
    $(window).width() >= 768 ? $('nav').show() : $('nav').hide();
  });

  $('.menu').click(function () {
    $('nav').slideToggle();
  });

  //fancybox album
  $('.fancybox').fancybox({
    openEffect: 'elastic', //elastic, fade, none
    closeEffect: 'fade'
  });

  //fancybox single
  $('#s3').fancybox({
    openEffect: 'elastic', //彈出
    closeEffect: 'elastic',

    helpers: {
      title: {
        type: 'float' // 'float', 'inside', 'outside' or 'over'
      }
    }
  });
});

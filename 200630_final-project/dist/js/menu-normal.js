$(document).ready(function () {
  //--- Without Menu-Right

  $header = $('header');
  $logo = $('.logo');
  $menu = $('.menu');
  $menuBtn = $('.menu-btn');
  $hamburgerBtn = $('.menu-hamburger');
  $lineOne = $('.line-one');
  $lineTwo = $('.line-two');
  $lineThree = $('.line-three');

  $bgOverlay = $('.the-overlay');
  $menuOverlay = $('.menu-container');
  $menuContainer = $('.menu-nav');
  $menuList = $('.nav-item');
  $menuLink = $('.nav-link');
  const menuLines = [$lineOne, $lineTwo, $lineThree];

  /////------ GSAP animation ------/////
  const tlm = gsap.timeline({default: {ease: Power2.easeInOut}});
  const toggleMenu = gsap.timeline({paused: true, reversed: true});

  $menu.on('mouseenter',() => {
    // won't fire hover when cross-btn
    if ($menuBtn.hasClass('js-x')) {
      return;
    }
    $menuBtn.addClass('js-hover');
    $menuBtn.removeClass('js-hover-complete');
    tlm.to(menuLines, 0.15,
      {
        scaleX: 1.5,
        repeat: 1,
        yoyo: true,
        svgOrigin: '24 12',
        stagger: 0.15
      }
    );
    tlm.eventCallback('onComplete', function(){
      $menuBtn.removeClass('js-hover');
      $menuBtn.addClass('js-hover-complete');
    });
  });

  $menu.on('click', () => {
    if($menuBtn.hasClass('js-hover')){
      return;
    }
    else if ($menuBtn.hasClass('js-hover-complete')){
      $menuBtn.removeClass('js-hover');
      $menuBtn.addClass('js-x');
      toggleMenu.reversed() ? toggleMenu.play() : toggleMenu.reverse();
    }
  });

  toggleMenu
    .to($lineTwo, 0.125, {scaleX: 0, delay: 0.5})
    .to($menuBtn, 0.125, {x: 40, opacity: 0, ease: Power4.easeInOut})
    .to($lineOne, 0.25, {transformOrigin: '50% 50%', y: 6, ease: Power2.easeInOut}, 'slide')
    .to($lineThree, 0.25, {transformOrigin: '50% 50%', y: -6, ease: Power2.easeInOut}, 'slide')
    .to($hamburgerBtn, 0.5, {rotation: 360, ease: Power4.easeInOut})
    .to($lineOne, 0.25, {rotation: 45, ease: Power2.easeInOut}, 'cross')
    .to($lineThree, 0.25, {rotation: -45, ease: Power2.easeInOut}, 'cross')
    .to($('.menu-hamburger line'), 0.1, {stroke: '#fff', ease: Power2.easeInOut})
    .set($('.the-overlay'), {opacity:1, visibility: 'visible'}, 'overlay')
    .to($menuOverlay, 0.15, {x:0, opacity:1}, 'overlay')
    .to($('.nav-item'), 0.6, {x:0, opacity:1, stagger: 0.15});
  toggleMenu.eventCallback('onReverseComplete', function(){
    $menuBtn.removeClass('js-x');
    $menuBtn.removeClass('js-hover-complete');
  });

  $menuLink.on('click', () => {
    $(this).addClass('current').siblings().removeClass('current');
  });
});

$(document).ready(function () {
  $header = $('header');
  $logo = $('.logo');
  $menu = $('.menu');
  $menuBtn = $('.menu-btn');
  $hamburgerBtn = $('.menu-hamburger');
  $lineOne = $('.line-one');
  $lineTwo = $('.line-two');
  $lineThree = $('.line-three');
  $menuRight = $('.menu-right');

  $bgOverlay = $('.the-overlay');
  $menuOverlay = $('.menu-container');
  $menuContainer = $('.menu-nav');
  $menuList = $('.nav-item');
  $menuLink = $('.nav-link');

  $sectionWhite = $('.section-white');
  $toTopArrow = $('.arrow');
  $sectionBlack = $('.section-parallax-dark');
  $menuSideSort = $('.filter-options');

  const menuLines = [$lineOne, $lineTwo, $lineThree];
  const headerOption_switch = {
    rootMargin: '-100px 0px 0px 0px'
  };

  /////---------- Section-white ----------/////
  /////----- Scroll Event, clip-path .menu-right when scroll down -----/////
  // $menuRight.style.animation = `hide-anim 1s forward ease-out`;
  $(window).on('load scroll', function () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > 30) {
      $menuRight.addClass('scroll-clip');
      $menu.addClass('scroll-show');
      $menu.removeClass('hide');
    } else {
      $menuRight.removeClass('scroll-clip');
      $menu.removeClass('scroll-show');
      $menu.addClass('hide');
    }
  });

  /////------ GSAP animation ------/////
  /////----- Menu Button and Menu Hamburger -----/////
  //要寫在事件外
  const tlm = gsap.timeline({default: {ease: Power2.easeInOut}});
  const toggleMenu = gsap.timeline({paused: true, reversed: true});

  // GSAP hover animation
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

  // GSAP click animation
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

  /////---------------------------------------/////
  $menuLink.on('click', () => {
    $(this).addClass('current').siblings().removeClass('current');
  });


  /////----- Side Button Event -----/////
  let blackTop = $sectionBlack.offset().top;

  $menuSideSort.on('click', () =>{

    $('html, body').animate(
      {
        scrollTop: blackTop -300
      },
      900
    );
  });

  /////----- To Top Arrow Event -----/////
  let whiteTop = $sectionWhite.offset().top;

  $toTopArrow.on('click', (e) =>{
    e.preventDefault();
    $('html, body').animate(
      {
        scrollTop: whiteTop
      },
      900
    );
  });

  ///// Scroll Event, Change header bg and .logo bg + text /////
  // var headerObserver = new IntersectionObserver(function(entries, headerObserver) {
  //   entries.forEach(entry => {
  //     if (entry.intersectionRatio > 0) {
  //       $header.addClass('switch-bg');
  //       $logo.text(Timeline);
  //       $logo.addClass('switch-color');
  //       $menuBtn.addClass('switch-color');
  //       menuLines.forEach(line => {
  //         line.addClass('switch-color');
  //       })
  //     }
  //   })
  // }, headerOption_switch);
  // headerObserver.observe($header);
});

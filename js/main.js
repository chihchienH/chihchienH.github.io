$(document).ready(function () {
  $sideInfo = $('.side-info');
  $head = $('.head');
  $sideNavBox = $('.side-nav-box');
  $sideDescription = $('.side-description');
  $sideTag = $('.side-description-tag');
  $tag = $('li.tag');

  $practices = $('.main-practices');
  $footer = $('footer');

  const mediaLg = window.matchMedia('(min-width: 1281px)');
  mediaLg.addListener(sideNavPosition);
  mediaLg.addListener(rwdSideNavFlex);

  rwdSideNavFlex(mediaLg);
  sideNavPosition(mediaLg);

  function sideNavPosition(mediaLg) {
    $(window).on('scroll', function (e) {
      e.preventDefault();
      let widowHeight = $(this).height();
      let widowTop = $(this).scrollTop();
      // 目前視窗的總高 - footer的頂部總高
      let newBottom = widowHeight + widowTop - $footer.offset().top;

      if (mediaLg.matches) {
        // 讓sideInfo滾到其底部時，fixed在底部
        widowHeight + widowTop >= $sideInfo.innerHeight() ? $sideInfo.addClass('fixed-bottom') : $sideInfo.removeClass('fixed-bottom');

        // 讓sideInfo貼在footer上方
        widowHeight + widowTop > $footer.offset().top ? $sideInfo.css('bottom', newBottom) : $sideInfo.css('bottom', '');
      }
      // console.log('window total height: ' + `${$(this).height() + $(this).scrollTop()}`);
      // console.log('sideInfo height: ' + $sideInfo.innerHeight());
      // console.log('sideInfo scrollTop: ' + $sideInfo.offset().top);
      // console.log('footer scrollTop: ' + $footer.offset().top);
      // console.log('footer total height: ' + `${$footer.height() + $footer.offset().top}`);
      // console.log('new bottom: ' + `${($sideInfo.innerHeight() + $sideInfo.offset().top - $footer.offset().top)}`);
    });
  }

  function rwdSideNavFlex(mediaLg) {
    if (mediaLg.matches) {
      $sideInfo.addClass('flex-col-between');
      $head.removeClass('flex-row-between');
      $head.addClass('flex-col-between');
      $sideNavBox.removeClass('flex-row-between');
      $sideNavBox.addClass('flex-col-between');
      $sideDescription.removeClass('flex-row-between');
      $sideDescription.addClass('flex-col-between');
      $sideTag.removeClass('flex-row-between');
      $sideTag.addClass('flex-col-between');
    } else {
      $sideInfo.removeClass('flex-col-between');
      $head.removeClass('flex-col-between');
      $head.addClass('flex-row-between');
      $sideNavBox.removeClass('flex-col-between');
      $sideNavBox.addClass('flex-row-between');
      $sideDescription.removeClass('flex-col-between');
      $sideDescription.addClass('flex-row-between');
      $sideTag.removeClass('flex-col-between');
      $sideTag.addClass('flex-row-between');
    }
  }
});

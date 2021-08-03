$(document).ready(function () {

  /////---------- Everything relate with Json (section balck article) -------/////
  ///---- get json / 'click' side btn & sort article / 'scroll' window & timelineSVG & article node / 'click' go to mid & article GSAP animation

  /////---------- Get Json New ----------/////
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'js/timeline-list.json', true);
  xhttp.onreadystatechange = function () {
    //if(xhttp.status >=200 && xhttp.status <400) //success
    // if (this.readyState == 4 && this.status == 200)
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var article = response.time_article;
      // console.log(response);
      // console.log(article[2].type);

      renderHTML(article);
      clickSideBtn();
      scrollTimeline();
      clickToStayMid();
    }
  };
  xhttp.send();

  //-------------- function to Json: insert HTML --------------//
  function renderHTML(data) {
    var output = '';
    $.each(data, function (i) {
      output += `
        <article class="post" data-filter= "${data[i].type}">
          <svg class="node">
            <circle class="node-circle" cx="15" cy="15" r="12"/>
          </svg>
          <div class="post-content-wrapper">
            <h3 class="post-title">${data[i].title}</h3>
            <div class="content-container display-none">
              <div class="content-img">
                <img src="${data[i].img}"/>
                <figcaption>${data[i].fig}</figcaption>
              </div>
              <div class="content-quote">${data[i].quote}</div>
            </div>
          </div>
        </article>`;
    });
    $timelineWrapper = $('.post-wrapper');
    $timelineWrapper.append(output);
    /// ! const variable here ! ///
    $articleTimeline = $('.post');
    $articleTimeActive = $('.post.active');
    $contentWrapper = $('.post-content-wrapper');
    $title = $('.post-title');
    $contentContainer = $('.content-container');
    $timeNode = $('.node'); //
    $timeNodeSVG = $('.node-circle'); //
    $timeNodeLine = $('.node-line'); //
    $timeNodeLineR = $('.node-line.to-right'); //
    $timeNodeLineL = $('.node-line.to-left'); //
    $sideBtn = $('.btn-tag');
    $timelineBg = $('.svg-timeline-bg');
    $timelineFill = $('.svg-timeline-fill');
  }

  //////////////////////////////////////////////////////////////////////////////
  //-------------- function to Json: Side menu on click --------------//
  //////////////////////////////////////////////////////////////////////////////
  function clickSideBtn() {
    // Show all article first
    $articleTimeline.addClass('active');
    // Add odd even first (:even, :odd -> 0base)
    $('.post-content-wrapper:even').addClass('oddContent');
    $('.post-content-wrapper:odd').addClass('evenContent');
    console.log('total: ' + $articleTimeline.length);

    //////------- Add line to the article first -------//////
    addLine();
    addLineClassAll();

    // add div after .node
    function addLine() {
      for (n = 0; n < $('.post.active').length; n++) {
        $(".post.active > .node").eq(n).after('<div class="node-line"></div>');
      }
    }
    // n=0 -> first -> odd, to-right
    // n=1 -> second -> even, to-left
    // in each active post, add another class, odd or even
    function addLineClassAll() {
      $('.post.active').each(n => {
        n % 2 == 1 ? $('.node-line').eq(n).attr('class', 'node-line to-left') : $('.node-line').eq(n).attr('class', 'node-line to-right');
      });
    }
    // base on '.post-content-wrapper', add another class, odd or even
    function addLineClass() {
      $('.post-content-wrapper.evenContent').parent().find('.node-line').attr('class', 'node-line to-left');
      $('.post-content-wrapper.oddContent').parent().find('.node-line').attr('class', 'node-line to-right');
    }

    //////------- Side Button on Click --------//////
    let filterActive;
    $sideBtn.on('click', function (eventObj) {
      eventObj.preventDefault();
      let tag = $(this).html();

      // reset to single class '.node-line'
      $('.node-line').attr('class', 'node-line');

      // show all tag
      if (tag == 'show all') {
        // show all
        $articleTimeline.addClass('active');
        filterActive = 'show all';
        // reset even odd
        $('.post-content-wrapper').removeClass('oddContent evenContent');
        $('.post-content-wrapper:even').addClass('oddContent');
        $('.post-content-wrapper:odd').addClass('evenContent');
        addLineClassAll();
        // reset previous btn
        $sideBtn.removeClass('active');
      } else {
        filterCategory(tag);
      }

      // active current btn
      $(this).addClass('active');
      console.log('tag: ' + tag, 'filter: ' + filterActive);
    });

    function filterCategory(category) {
      // Run new filter, if previous tag != current tag
      if (filterActive != category) {

        // articles, btn reset
        $articleTimeline.removeClass('active');
        $('.post-content-wrapper').removeClass('oddContent evenContent');
        $sideBtn.removeClass('active');

        // articles be filtered
        $articleTimeline.filter(`[data-filter*= ${category}]`).addClass('active');
        $articleTimeline.filter(`[data-filter!= ${category}]`).addClass('display-none');

        // !!! Even or Odd content-wrapper !!! //
        $('.post.active').each(n => {
          let activeWrapper = $('.post.active > .post-content-wrapper').eq(n);
          n % 2 == 1 ? activeWrapper.addClass('evenContent') : activeWrapper.addClass('oddContent');
        });
        addLineClass();

        // store value in filterActive
        console.log('active count: ' + $('.post.active').length);
        filterActive = category;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //-------------- function to Json: TimelineSVG Scroll --------------//
  //////////////////////////////////////////////////////////////////////////////
  function scrollTimeline() {
    $(window).on('scroll resize load', function () {
      /////----- Section black-timeline-fill -----/////
      var pageTop = $(this).scrollTop(); ///// 變動常數
      var pageHeight = $(this).height();
      var pageBottom = pageTop + pageHeight;
      var lineHeight;
      var lineTop = $timelineFill.offset().top;
      var lineBottom = lineTop + $timelineFill.height();
      var distenceLine = pageBottom - lineBottom;
      //螢幕總高 - 物件總高， =0 代表螢幕底部正要滾過物件底部

      // console.log('lineT: '+lineTop);
      // console.log('lineB: '+lineBottom);
      // console.log('pageB: '+pageBottom);
      // console.log('pageT: '+pageTop);
      // isView = (distenceLine>0) ? true : false
      // console.log('timeline is in view? '+isView);

      //////////-------- Set the new line-fill height -----------!!!!!!!!!!!
      if (distenceLine > 0) {
        // $timelineFill.css({height: pageTop - pageHeight * 1.25});
        $timelineFill.css({height: pageTop + pageHeight*0.5 - lineTop});
        // lineHeight = $timelineFill.css('height').replace('px', '');
        lineHeight = $timelineFill.height();
      }
      // console.log(typeof lineHeight);
      // console.log('newLineH: ' + lineHeight);
      // console.log(`newLineB: ${lineHeight + lineTop}`);

      /////----- Section black-node-fill -----/////
      $directNode = $('.post.active .node-circle');
      let nodeArray = [];
      let nodeTopArray = [];
      let newLineFill = lineHeight + lineTop;
      const timeScroll = gsap.timeline({paused: true, reversed: true, default: {ease: Power2.easeInOut}});
      timeScroll.reversed() ? timeScroll.play() : timeScroll.reverse();
      // for (n = 0; n < $directNode.length; n++) {
      //   nodeArray.push(n);
      // }

      $directNode.each(i => {
        nodeTopArray.push($('.post.active .node-circle').eq(i).offset().top);
      });
      // console.log(nodeArray);
      // console.log(nodeTopArray);
      // console.log('newFill: ' + newLineFill);
      for (i = 0; i < nodeTopArray.length; i++) {
        $loopNode = $('.post.active > .node').eq(i);
        $loopCircle = $('.post.active .node-circle').eq(i);
        $loopWrapper = $('.post.active > .post-content-wrapper').eq(i);
        $loopNodeLine = $('.post.active > .node-line').eq(i);
        var passThrough = newLineFill - nodeTopArray[i];
        // passthrough
        if (passThrough > 110) {
          timeScroll.to($loopCircle, 0.12, {fill: '#fff'}, 'node').to($loopNode, 0.12, {opacity: 0.3}, 'node').to($loopNodeLine, 0.25, {opacity: 0.3}, 'line').to($loopWrapper, 0.4, {opacity: 0.3, visibility: 'visible', ease: Power2.easeInOut}, 'content');
        }
        // highlight
        else if (passThrough >= 0) {
          timeScroll.to($loopCircle, 0.12, {fill: '#fff'}, 'node').to($loopNode, 0.12, {opacity: 1}, 'node').to($loopNodeLine, 0.25, {opacity: 1}, 'line').to($loopWrapper, 0.4, {opacity: 1, visibility: 'visible', ease: Power2.easeInOut}, 'content');
        }
        // untouch
        else {
          timeScroll.to($loopNodeLine, 0.25, {opacity: 0}, 'line').to($loopCircle, 0.12, {fill: '#030303'}, 'node').to($loopNode, 0.12, {opacity: 1}, 'node').to($loopWrapper, 0.4, {opacity: 0, visibility: 'hidden', ease: Power2.easeInOut}, 'content');
        }
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  //-------------- function to Json: Click Title and Node event --------------//
  //////////////////////////////////////////////////////////////////////////////
  function clickToStayMid() {
    /////------ target animation: title, line, content-container
    let scrollMid;
    let clickFilter;

    // 取偶數線
    // let activeArray = [];
    // let activeEvenLine = [];
    // for (var i = 1; i < $('.post.active').length; i+=2) {
    //   activeArray.push(i);
    //   activeEvenLine.push($('.post.active .node-line').eq(i));
    // }
    // console.log($('.post.active').length);
    // console.log(activeEvenLine);
    // console.log(activeArray);

    $('.post.active .node-circle, .post.active .post-title').on('click', function (e) {
      e.preventDefault();
      const theCircle = $(this).closest('.post.active').find('.node .node-circle');
      const thePost = $(this).closest('.post.active');
      let theLine = $(this).closest('.post.active').find('.node-line');
      let theTitle = $(this).closest('.post.active').find('.post-title');
      let theTitleWidth = theTitle.outerWidth();
      const theConent = $(this).closest('.post.active').find('.content-container');
      const theConentWrapper = $(this).closest('.post.active').find('.post-content-wrapper');
      // console.log(theLine);
      // console.log(theTitle);
      // console.log(theCircle);

      // ScrollTop to the middle of the screen
      let node = theCircle.closest('.node'),
        nodeTopOffset = node.offset().top,
        nodeHeight = node.height(),
        halfScreen = $(window).height() / 2,
        scrollTo = nodeTopOffset - halfScreen + nodeHeight / 2;
      $('html, body').animate(
        {
          scrollTop: scrollTo
        },
        700
      );

      theConentWrapper.addClass('js-open').closest('.post.active').siblings().find('.post-content-wrapper').removeClass('js-open');
      console.log(thePost.is(clickFilter));

      ////////---- GSAP animation -----////////
      // if (scrollMid) {
      //   scrollMid.kill();
      // }
      scrollMid = gsap.timeline({default: {ease: Power2.easeInOut}});
      /////--- 如果該物件沒有.js-open > 還原其他物件動畫 > 並判斷奇偶（線長差異）
      /////--- 如果該物件的母體非上一個 > 還原其他物件動畫 > 並判斷奇偶（線長差異）
      if (!thePost.is(clickFilter)) {

        // reverse all first
        scrollMid
        .set($('.content-container'), {css:{className: 'content-container display-none'}})
        .to($('.content-container'), 0.25, {opacity: 0, y: -24}, 0.1)
        .to($('.node-line'), 0.15, {width: '30px'}, 0.1)
        .to($('.post-title'), 0.2, {top: 0}, 0.6);
        // after reverse done, then run callback function
        scrollMid.eventCallback('onComplete', function () {
          scrollMid = gsap.timeline({default: {ease: Power2.easeInOut}});
          if (theLine.is('.post.active .node-line:even')) {
            scrollMid
              .to(theLine, 0.1, {opacity: 1})
              .to(theTitle, 0.2, {top: '-24px'}, 0.25)
              .to(theLine, 0.15, {opacity: 1, width: theTitleWidth + 60}, 0.6)
              .set(theConent, {css:{className: 'content-container'}})
              .fromTo(theConent, 0.45, {y: -24, opacity: 0}, {y: 0, opacity: 1, delay: 0.8});
          } else if (theLine.is('.post.active .node-line:odd')) {
            scrollMid
              .to(theLine, 0.1, {opacity: 1})
              .to(theTitle, 0.2, {top: '-24px'}, 0.25)
              .to(theLine, 0.15, {opacity: 1, width: theTitleWidth + 500}, 0.6)
              .set(theConent, {css:{className: 'content-container'}})
              .fromTo(theConent, 0.45, {y: -24, opacity: 0}, {y: 0, opacity: 1, delay: 0.8});
          }
          clickFilter = thePost;
        });
      }
      /////--- 如果該物件有.js-open > 返回動畫
      /////--- 如果該物件的母體與上一個相同 > 返回動畫
      else {
        $('.post-container-wrapper').removeClass('js-open');
        scrollMid
        .to(theConent, 0.35, {opacity: 0, y: -24}, 0.2)
        .set(theConent, {css:{className: 'content-container display-block'}})
        .to($('.node-line'), 0.15, {opacity: 0, width: '30px'}, 0.5)
        .to($('.post-title'), 0.2, {top: 0}, 1.2);
      }
    });
    // $timeNodeSVG
    // $title
    // $('.node')
    // $('.post-content-wrapper')
    // //點擊底部的按鈕，回到最頂端
    // function setupScrollToTop() {
    //   var scrollSpeed = 750;
    //   $('.trigger-scroll-to-top').click(function (e) {
    //     e.preventDefault(); //防止連結打開url
    //     $('html, body').animate(
    //       {
    //         scrollTop: 0
    //       },
    //       scrollSpeed
    //     );
    //   });
    // }
  }
});

// function isEven(value) {
// 	if (value%2 == 0)
// 		return true;
// 	else
// 		return false;
// }

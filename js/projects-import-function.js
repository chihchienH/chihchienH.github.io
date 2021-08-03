$(document).ready(function () {
  /////---------- Get Json ----------/////
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://chihchienh.github.io/js/homepage-list.json', true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var item = response.practices;
      var itemTag = item.type;

      ////// Run Function Here ///////
      renderHTML(item);
      insertTag(item);
      resizeSortGrids();
    }
  };
  xhttp.send();

  //-------------- function to Json: insert HTML --------------//
  function renderHTML(data) {
    let output = '';
    $.each(data, function (i) {
      output += `
      <div class="item-container">
        <!-- each item from JSON -->
        <a href="${data[i].link}" class="item" data-type="${data[i].type}">
          <div class="item-box">
            <div class="item-date">${data[i].date}</div>
            <div class="item-img"></div>
            <div class="item-text flex-col-between">
              <h3 class="item-text-title">${data[i].title[0]}<span class="eng">${data[i].title[1]}</span></h3>
              <div class="item-text-line"></div>
              <div class="item-text-description">${data[i].info}</div>
            </div>
            <div class="item-hidden-blend"></div>
          </div>
        </a>
        <!-- each item-detail from JSON -->
        <div class="detail flex-row-between">
          <ul class="detail-tags flex-row-between"></ul>
          <div class="detail-cta">
            <p class="cta-text">more description</p>
            <div class="cta-arrow"></div>
          </div>
        </div>
      </div>
      `;
      // console.log('all type: ' + data[i].type);
    });

    $itemsGrid = $('.items');
    $itemsGrid.append(output);
    // console.log('test type: ' + data[4].type[0]);

    //////// ! const variable here ! ////////
    // Items
    $practices = $('.main-practices');
    $itemsGrid = $('.items');
    $itemContainer = $('.item-container');
    $itemBox = $('.item-box');
    $itemText = $('.item-text');
    $itemLine = $('.item-text-line');
    $itemDetail = $('.detail');
    $tags = $('.detail-tags');
    // Side Info
    $sideInfo = $('.side-info');
    $tag = $('li.tag');
  }

  //-------------- function to Json: Insert each tags in Item --------------//
  function insertTag(tag) {
    $.each(tag, (i) => {
      let listTag = '';
      $.each(tag[i].type, (n) => {
        listTag += `<li class="detail-tag">&num;${tag[i].type[n]}</li>`;
      });
      $itemContainer.eq(i).find('.detail-tags').append(listTag);
      listTag = '';
    });
  }

  //-------------- function to Json: Grid Row Span + Column --------------//
  //-------------- function to Json: Sort Items Refresh Row + Column --------------//
  function resizeSortGrids() {

    //////////////////////////////////////////////////////
    //////////--------------load和縮放事件-------------//////////
    //////////////////////////////////////////////////////
    $(window).on('load resize', function (e) {
      e.preventDefault();
      // 先讓json的DOM新增高度。因為是在json寫html，所以js跑完才會執行css，高度寫在css就來不急了
      $itemText.css('padding', '18px 25px');
      $itemLine.css('margin', '25px 0px');
      practiceHeight();
      resizeAllGridItems();
      gridOrder();
    });
    //////////////////////////////////////////////////////
    //////////----------------------------------//////////
    //////////////////////////////////////////////////////

    ////////////////////////////////////////////
    ////////// Function: Grid Column ///////////
    // practices寬度不含padding（或是items） / 當下單一item-container寬度
    // Math.floor向下捨入取整數。 4n, 3n / 2n以下不須執行function
    function gridOrder() {
      // let columnCount = Math.floor($practices.width() / $itemContainer.width());
      let columnCount;
      getColumnCount(columnCount);
    }

    function getColumnCount(col) {
      let minTop;
      let topHeights = [];
      let colIndex = [];
      $itemContainer.each(function(n) {
        if(!$(this).is(':hidden')){
          let top = $(this).offset().top;
          topHeights.push(top);
          // console.log(n + ": " + top);
        }
      });
      minTop = Math.min.apply(Math, topHeights);

      // Count the number of MinTop in Array
      $.each(topHeights, function(key, value){
        if(value == minTop){
          colIndex.push(key);
        }
      });
      col = colIndex.length;
      // console.log('colCount: ' + col);

      // Set Grid Column Order
      gridColumnOrder(col);
    }

    function gridColumnOrder(colCount) {
      // Reset First
      $itemContainer.css('grid-column', '');
      // 存取非display-none的item序列
      // key -> 序列在array的編號，nVal -> 該編號對應的原本item序列
      let targetItem = [];

      $.each($itemContainer, (n) => {

        if($itemContainer.eq(n).is(':hidden')) {
          $itemContainer.eq(n).css('grid-column', '');
        } else {
          targetItem.push(n);
          if(colCount == 5){
            $.each(targetItem , (key, nVal) => {
              if (key%5 == 0){
                $itemContainer.eq(nVal).css('grid-column', '1/2');
              } else if (key%5 == 1){
                $itemContainer.eq(nVal).css('grid-column', '2/3');
              } else if (key%5 == 2){
                $itemContainer.eq(nVal).css('grid-column', '3/4');
              } else if (key%5 == 3){
                $itemContainer.eq(nVal).css('grid-column', '4/5');
              }
            });
          }
          if(colCount == 4){
            $.each(targetItem , (key, nVal) => {
              if (key%4 == 0){
                $itemContainer.eq(nVal).css('grid-column', '1/2');
              } else if (key%4 == 1){
                $itemContainer.eq(nVal).css('grid-column', '2/3');
              } else if (key%4 == 2){
                $itemContainer.eq(nVal).css('grid-column', '3/4');
              }
            });
          }
          if(colCount == 3){
            $.each(targetItem , (key, nVal) => {
              if (key%3 == 0){
                $itemContainer.eq(nVal).css('grid-column', '1/2');
              } else if (key%3 == 1){
                $itemContainer.eq(nVal).css('grid-column', '2/3');
              }
            });
          }
          if(colCount == 2 || colCount == 1){
            $itemContainer.eq(n).css('grid-column', '');
          }
        }

      });
    }
    ////////// Function: Grid Column ///////////
    ////////////////////////////////////////////

    ////////////////////////////////////////////
    ////////// Function: Grid Row End //////////
    function resizeAllGridItems() {
      $.each($itemContainer, (i) => {
        if(!$itemContainer.eq(i).is(':hidden')){
          resizeGridItem($itemContainer.eq(i));
        }
      });
      // console.log($itemContainer.eq(1).find('.item-text').innerHeight());
    }

    // 針對grid下的子物件進行function: 分配grid-row-end span的數量
    // Math.ceil：回傳大於等於所給數字的最小整數
    function resizeGridItem(item) {
      $targetBox = item.find('.item-box');
      $targetDetail = item.find('.detail');
      let rowHeight = parseInt($itemsGrid.css('grid-auto-rows'));
      let rowGap = parseInt($itemsGrid.css('grid-row-gap'));
      let rowSpan = Math.ceil(($targetBox.innerHeight() + $targetDetail.innerHeight()) / (rowHeight + rowGap));

      item.css('grid-row-end', `span ${rowSpan + 1}`);
    }
    ////////// Function: Grid Row End //////////
    ////////////////////////////////////////////

    //////////////////////////////////////////////////////
    //////////-----------點擊左側標籤事件---------------//////////
    //////////////////////////////////////////////////////
    $tag.on('click', function (eventObj) {
      eventObj.preventDefault();
      let tagFilter = $(this).data('type');

      $tag.removeClass('current');
      $(this).toggleClass('current');
      $itemContainer.css('grid-row-end', '');

      sortItems(tagFilter);
      console.log('itemWidth.eq(5): ' + $('.item-container').eq(5).width());
      // console.log(tagFilter);
      // console.log($itemContainer.eq(1).find('.detail-tag').text());
    });
    //////////////////////////////////////////////////////
    //////////----------------------------------//////////
    //////////////////////////////////////////////////////

    //////////////////////////////////////////////
    ////////// Function: Click and Sort //////////
    // *當practices的高度小於sideinfo時，將practices高度與sideinfo相等
    function practiceHeight(){
      // Reset First
      $practices.css('height', '');

      ($practices.innerHeight() < $sideInfo.innerHeight()) ?
      $practices.css({height : $sideInfo.innerHeight() + 200 }) :
      $practices.css('height', '');
    }

    // scroll to top first
    function sortItems(tags){
      $('html, body').animate(
        { scrollTop: '0' }, 350, sortEachItems($itemContainer, tags)
      );
    }
    // 遍歷所有item容器，找到與tag相同的字串（indexOf() >=0），執行gsap動畫
    function sortEachItems(box, tag){
      let sorting = gsap.timeline({default: {ease: Power3.easeInOut}});
      let showAll = gsap.timeline({default: {ease: Power3.easeInOut}});

      $.each(box, (i) => {

        if (box.eq(i).find('.detail-tag').text().indexOf(tag) >= 0) {
          sorting
            .set(box, {css:{className: 'item-container'}}, 0.3)
            .to(box, 0.35, {scale: 0, opacity: 0, display: 'none'}, 0.15, 'hide')
            .set(box.eq(i), {display: 'block', scale: 1}, 'set')
            .set(box.eq(i), {css:{className: 'item-container js-show'}}, 'set');
          sorting.eventCallback('onComplete', function () {
            resizeAllGridItems();
            practiceHeight();
            gridOrder();
            let sorting = gsap.timeline({default: {ease: Power3.easeInOut}});
            sorting.to($('.item-container.js-show'), 0.35, {opacity: 1}, 0.15);
            console.log('$itemContainerWidth: ' + box.width());
          });
        } else {
          sorting.to(box.eq(i), 0.35, {scale: 0, opacity: 0, display: "none"}, 'hide');
        };

        if (tag == 'all') {
          showAll
            .to(box, 0.35, {scale: 0, opacity: 0, display: 'none'}, 0.3, 'hide')
            .set(box, {display: 'block', scale: 1}, 'set')
            .set(box, {css:{className: 'item-container js-all'}}, 'set');
          showAll.eventCallback('onComplete', function () {
            resizeAllGridItems();
            practiceHeight();
            gridOrder();
            let showAll = gsap.timeline({default: {ease: Power3.easeInOut}});
            showAll.to($('.item-container.js-all'), 0.35, {opacity: 1}, 0.15);
          });
        }
      });

    }
    ////////// Function: Click and Sort //////////
    //////////////////////////////////////////////

  }


});

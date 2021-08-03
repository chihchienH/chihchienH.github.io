//傳至後端之資料用Json包起來
var sJson = JSON.stringify({
  sCustId: cid,
  sActivityId: activitVal
});

$.ajax({
  type: 'POST',
  //async為false -> 同步
  //async為true  -> 非同步
  async: false,
  dataType: 'json',
  url: '從根目錄開始或者相對路徑等等/指到的.aspx/function_01',
  //↑↑↑↑↑↑反正就是要指到你寫的aspx拉↑↑↑↑↑↑↑↑
  contentType: 'application/json; charset=UTF-8',
  data: sJson,
  success: function (msg) {
    //後端回傳的東西包成Object回來,
    //ex:{sResult = 例如在後端自己命名的某型別sResult物件}
    var sResult = msg.d.sResult;
    //後端回傳的東西包成Object回來,
    //ex:{db_Result = 例如在後端自己命名的DataTable物件}
    var db_Result = msg.d.db_Result;

    //do something
  },
  //statusCode範例
  statusCode: {
    403: function (response) {
      LocationHerf();
    }
  }
});

var LocationHerf = function () {
  window.location.href = '你要轉page的URL拉';
};

////////////////
$.ajax({
  data: {
    zipcode: 97201
  },
  success: function (result) {
    $('#weather-temp').html('<strong>' + result + '</strong> degrees');
  }
});

//////////////////

///// Run Json /////
// get_timeline('js/timeline-list.json');
// $timelineWrapper.fadeIn(1000);
///// Get Json /////
function get_timeline(file) {
  $.getJSON(file, function (data) {
    // console.log(data);
    // console.log(data.time_article);
    // console.log(typeof data.time_article);
    // console.log(data.time_article[2].title);
    let articleArray = data.time_article;
    $timelineWrapper.empty();

    let output = [];

    $.each(articleArray, function (i) {
      let article = `<article class="post" data-filter= "${articleArray[i].type}">`;
      article += `<svg class="node"><circle class="node-circle" cx="15" cy="15" r="12"/></svg>`;
      article += `<div class="post-content-wrapper">`;
      article += `<h3 class="post-title">${articleArray[i].title}</h3>`;
      article += `<div class="content-container display-none">`;
      article += `<div class="content-img">`;
      article += `<img src="${articleArray[i].img}"/>`;
      article += `<figcaption>${articleArray[i].fig}</figcaption>`;
      article += `</div>`;
      article += `<div class="content-quote">${articleArray[i].quote}</div>`;
      article += `</div></div></article>`;
      $timelineWrapper.append(article);
      // $('.post').filter(`[data-filter*= projects]`).addClass('display-none');
      $('.post').addClass('active');
      $('.content-container').addClass('active');
      output.push(article);
    });
  });
  return false;
}

/////////////////
var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'js/timeline-list.json', true);
xhttp.onreadystatechange = function () {
  //if(xhttp.status >=200 && xhttp.status <400) //success
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    var article = response.time_article;
    renderHTML(article);
    cHTML();
  }
};
xhttp.send();
// function: insert HTML
function renderHTML(data) {
  var output = '';
  $.each(data, function (i) {
    output += `
          <article class="post" data-filter= "${data.type}>"
            <svg class="node">
              <circle class="node-circle" cx="0" cy="0" r="12"/>
            </svg>
            <div class="post-content-wrapper">
              <h3 class="post-title">${data.title}</h3>
              <div class="content-container display-none">
                <div class="content-img">
                  <img src="${data.img}"/>
                  <figcaption>${data.fig}</figcaption>
                </div>
                <div class="content-quote">${data.quote}</div>
              </div>
            </div>
          </article>`;
  });
  $timelineWrapper.append(output);
}

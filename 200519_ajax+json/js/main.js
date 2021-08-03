////////// the page to load has to be same layer with index.html
$(document).ready(function () {
  $('nav').load('menu.html'); // loading the navmenu with js
  $('footer').load('footer.html');

  var pageNumber = $('body').data('pagenum');
  switch (pageNumber) {
    case 0:
      get_configuration('js/list_1.json');
      break;
    case 1:
      get_configuration('js/list_2.json');
      break;
    case 2:
      get_configuration('js/list_3.json');
      break;
  }
  $('section').css({ display: 'none' }).fadeIn(2000);
  $('footer').css({ display: 'none' }).fadeIn(2000);
  // $('section').fadeToggle();
});


///////////get json function///////////
function get_configuration(file_name) {
  //get json file and run the function "data"
  $.getJSON(file_name, function (data) {
    //empty section first
    $('section').empty();
    //for each loop in "data"
    $.each(data, function (index, arrayName) {
      var html = '<div class="box">';
      html += '<div class="imgbox">';
      html += '<img src=" ' + arrayName['pic'] + ' " />';
      html += '</div>';
      html += '<h3>' + arrayName['title'] + '</h3>';
      html += '<p>' + arrayName['detail'] + '</p>';
      html += '<div class="head">';
      html += '<img src="' + arrayName['head'] + '" alt="head" />';
      html += '<span>' + arrayName['wdate'] + '</span>';
      html += '</div>';
      html += '</div>';

      // put json data inside <section>
      $('section').append(html);
      console.log(html);
    });
  });
  return false;
}

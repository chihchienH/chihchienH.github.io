// var menu = document.getElementById('menu');
// var open = document.getElementById('open');
// var exit = document.getElementById('exit');

// menu.addEventListener('click', function (e) {
//   open.classList.toggle('hide');
//   menu.classList.add('hide');
//   e.preventDefault();
// });
// exit.addEventListener('click', function (e) {
//   open.classList.add('hide');
//   menu.classList.remove('hide')
//   e.preventDefault();
// });
$(document).ready(function (){
  $('#menu').click(function () {
    $('#open').removeClass('hide');
    $(this).addClass('hide');
  });
  $('#exit').click(function () {
    $('#open').addClass('hide');
    $('#menu').removeClass('hide');
  });
});

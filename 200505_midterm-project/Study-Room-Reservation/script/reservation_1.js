$(document).ready(function () {
  // var btns = $('button').length;
  // for (var i = 0; i < btns.length; i++) {
  //   var start = 4;
  //   var end = start + 6;
  //   $('.date-num')[i].addClass('inactive');
  //   for (var n = 4; n < 6; n++) {
  //     $('button')[n].removeClass('inactive');
  //   }
  // }
  $('.date-num').click(function () {
    var isActive = $(this).hasClass('active');
    $('.active').removeClass('active');
    $('.inactive').removeClass('inactive');
    if (!isActive) {
      $(this).addClass('active');
      $('button:not(.active)').addClass('inactive');
    }
  });
  $('#menu').click(function () {
    $('#open').removeClass('hide');
    $(this).addClass('hide');
  });
  $('#exit').click(function () {
    $('#open').addClass('hide');
    $('#menu').removeClass('hide');
  });
});

// // Get the container element
// var btnContainer = document.getElementById("myDIV");

// // Get all buttons with class="btn" inside the container
// var btns = btnContainer.getElementsByClassName("btn");

// // Loop through the buttons and add the active class to the current/clicked button
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");

//     // If there's no active class
//     if (current.length > 0) {
//       current[0].className = current[0].className.replace(" active", "");
//     }

//     // Add the active class to the current/clicked button
//     this.className += " active";
//   });
// }

$(function(){
  $('#l-btn').click(function(){
    var isLeft = $('.the-btn').hasClass('btn-left');
    if (!isLeft){
      $('.the-btn').addClass('btn-left');
      $('.the-btn').removeClass('btn-right');
    }
  });
  $('#r-btn').click(function(){
    var isRight = $('.the-btn').hasClass('btn-right');
    if (!isRight){
      $('.the-btn').addClass('btn-right');
      $('.the-btn').removeClass('btn-left');
    }
  });
});

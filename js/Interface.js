$(function() {

  //SETUP
  var questions;
  $.ajax({
    beforeSend: function(xhr) {
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType("application/json");
      }
    }
  });

  // COLLECTS DATA FROM THE JSON FILE
  function loadQuestions() {
    $.getJSON('data/house.json')
    .done( function(data){
      questions = data;
    }).fail( function() {
      $('#room').html('Sorry! We could not load the questions at the moment');
    });
  }

  loadQuestions();

  // LOADS THE ROOM TIPS ON CLICK
  $('#container').on('click', '#room a', function(e) {
    e.preventDefault();
    var loc = this.id.toUpperCase();

    var newContent = '';
    for (var i = 0; i < questions[loc].length; i++) {
      newContent += '<li><a href="descriptions.html#">';
      newContent += questions[loc][i].title + '</a></li>';
    }

    $('#tips').html('<ul>' + newContent + '</ul>');

    $('#room a.current').removeClass('current');
    $(this).addClass('current');

    $('#details').text('');
  });

  // LOADS THE DESCRIPTION WHEN A TIP IS CLICKED
  $('#container').on('click', '#tips li a', function(e) {
    e.preventDefault();
    var fragment = this.href;

    fragment = fragment.replace('#', '  #');
    $('#details').load(fragment);

    $('#tips a.current').removeClass('current');
    $(this).addClass('current');
  });

});
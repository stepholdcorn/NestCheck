$(function() {

  //SETUP
  var userProfile = new UserProfile;
  $.ajax({
    beforeSend: function(xhr) {
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType("application/json");
      }
    }
  });

  // COLLECTS DATA FROM THE HOUSE JSON FILE
  function loadHouse() {
    $.getJSON('data/house.json')
    .done( function(data){
      areas = data;
    }).fail( function() {
      $('#choice').html('Sorry! We could not load the house at the moment');
    });
  }

  // COLLECTS DATA FROM THE APARTMENT JSON FILE
  function loadApartment() {
    $.getJSON('data/apartment.json')
    .done( function(data){
      areas = data;
    }).fail( function() {
      $('#choice').html('Sorry! We could not load the apartment at the moment');
    });
  }

  // ASSIGNS THE USER'S CHOICE TO THEIR PROFILE
  $('#choice').on('click', '#type a', function(e) {
    e.preventDefault();
    var property = this.id.toUpperCase();
    userProfile.selectPropertyType(property);
    if (userProfile.propertyType === "HOUSE"){
      loadHouse();
    }
    else {
      loadApartment();
    };
    var newList = '';
    for (var i = 0; i < areas[property].length; i++) {
      newList += '<a href="' + areas[property][i].title + '.html"';
      newList += 'id="' + areas[property][i].title + '">';
      newList += areas[property][i].title + '</a>';
    }

    $('#room').html('<ul>' + newList + '</ul>');

    $('#type a.current').removeClass('current');
    $(this).addClass('current');

    $('#tips').text('');
    $('#details').text('');

  });

  // COLLECTS DATA FROM THE TIPS JSON FILE
  function loadQuestions() {
    $.getJSON('data/rooms.json')
    .done( function(data){
      questions = data;
    }).fail( function() {
      $('#room').html('Sorry! We could not load the tips at the moment');
    });
  }
  loadQuestions();

  // LOADS THE ROOM TIPS ON CLICK
  $('#container').on('click', '#room a', function(e) {
    e.preventDefault();
    var loc = this.id.toUpperCase();

    var newContent = '';
    for (var i = 0; i < questions[loc].length; i++) {
      newContent += '<li><a href="descriptions.html#';
      newContent += questions[loc][i].title.replace(/ /g, '-') + '">';
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

    fragment = fragment.replace('#', ' #');
    $('#details').load(fragment);

    $('#tips a.current').removeClass('current');
    $(this).addClass('current');
  });

});
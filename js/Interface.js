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

  // LOADS THE ROOMS BASED ON PROPERTY SELECTION
  $('#choice').on('click', '#type a', function(e) {
    e.preventDefault();
    property = this.id.toUpperCase();
    userProfile.selectPropertyType(property);
    loadProperty();
    createRoomList();

    $('#type a.current').removeClass('current');
    $(this).addClass('current');

    $('#tips').text('');
    $('#details').text('');

  });

  // SELECTS THE CORRECT JSON FILE
  function loadProperty() {
    if (userProfile.propertyType === "HOUSE"){
      loadHouse();
    }
    else {
      loadApartment();
    };
  }

  // CREATES THE LIST OF ROOMS
  function createRoomList() {
    var newList = '';
    for (var i = 0; i < areas[property].length; i++) {
      newList += '<a href="' + areas[property][i].title + '.html"';
      newList += 'id="' + areas[property][i].title + '">';
      newList += areas[property][i].title + '</a>';
    }
    $('#room').html('<ul>' + newList + '</ul>');
  }

  // COLLECTS DATA FROM THE TIPS JSON FILE
  function loadTips() {
    $.getJSON('data/rooms.json')
    .done( function(data){
      tips = data;
    }).fail( function() {
      $('#room').html('Sorry! We could not load the tips at the moment');
    });
  }

  // LOADS THE ROOM TIPS ON CLICK
  $('#container').on('click', '#room a', function(e) {
    e.preventDefault();
    loadTips();
    heading = this.id.toUpperCase();
    createTipList();

    $('#room a.current').removeClass('current');
    $(this).addClass('current');

    $('#details').text('');
  });

  // CREATES THE TIPS LIST
  function createTipList() {
    var newContent = '';
    for (var i = 0; i < tips[heading].length; i++) {
      newContent += '<li><a href="descriptions.html#';
      newContent += tips[heading][i].title.replace(/ /g, '-') + '">';
      newContent += tips[heading][i].title + '</a></li>';
    }

    $('#tips').html('<ul>' + newContent + '</ul>');
  }

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
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

  $('#choice').hide();
  $('#content').hide();
  $(':submit').hide();

  // DISPLAYS ENTER BUTTON ON CLICK
  $('#user').on('click', function(e) {
    $(':submit').fadeIn(1500);
  });

  // DISPLAYS WELCOME MESSAGE
  $('#user').on('submit', function(e) {
    e.preventDefault();
    var newName = $('input:text').val();
    userProfile.enterName(newName);
    $('#welcome').text('Welcome to NestCheck ' + userProfile.userName);
    $('#location').show();
    $('html, body').animate({
        scrollTop: $("#location").offset().top
    }, 1000);
    $textInput.val('');
  });

  // MOVES FROM MAP TO CHOICE PAGE
  $('#next').on('click', function() {
    $('#choice').show();
    $('html, body').animate({
        scrollTop: $("#choice").offset().top
    }, 1000);
  });

  // COLLECTS DATA FROM THE HOUSE JSON FILE
  function loadHouse() {
    $.getJSON('data/house.json')
    .done( function(data){
      houseAreas = data;
    }).fail( function() {
      $('#choice').html('Sorry! We could not load the house at the moment');
    });
  }
  loadHouse();

  // COLLECTS DATA FROM THE APARTMENT JSON FILE
  function loadApartment() {
    $.getJSON('data/apartment.json')
    .done( function(data){
      apartmentAreas = data;
    }).fail( function() {
      $('#choice').html('Sorry! We could not load the apartment at the moment');
    });
  }
  loadApartment();

  // LOADS THE ROOMS ON CLICK
  $('#choice').on('click', '#type a', function(e) {
    e.preventDefault();
    $('#content').show();
    $('html, body').animate({
        scrollTop: $("#content").offset().top
    }, 1000);
    property = this.id.toUpperCase();
    userProfile.selectPropertyType(property);
    listCheck();

    $('#type a.current').removeClass('current');
    $(this).addClass('current');

    $('#tips').text('Select a room from the left');
    $('#details').text('');
  });

  // CHECKS WHICH LIST TO LOAD BASED ON USER'S SELECTION
  function listCheck() {
    if (userProfile.propertyType === "HOUSE"){
      createHouseRoomList();
    }
    else {
      createApartmentRoomList();
    };
  }

  // CREATES THE LIST OF HOUSE ROOMS
  function createHouseRoomList() {
    var newList = '';
    for (var i = 0; i < houseAreas[property].length; i++) {
      newList += '<li><a href="' + houseAreas[property][i].title + '.html"';
      newList += 'id="' + houseAreas[property][i].title + '">';
      newList += houseAreas[property][i].title + '</a></li>';
    }
    $('#room').html('<ul>' + newList + '</ul>');
  }

  // CREATES THE LIST OF APARTMENT ROOMS
  function createApartmentRoomList() {
    var newList = '';
    for (var i = 0; i < apartmentAreas[property].length; i++) {
      newList += '<li><a href="' + apartmentAreas[property][i].title + '.html"';
      newList += 'id="' + apartmentAreas[property][i].title + '">';
      newList += apartmentAreas[property][i].title + '</a></li>';
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
  loadTips();

  // LOADS THE ROOM TIPS ON CLICK
  $('#content').on('click', '#room a', function(e) {
    e.preventDefault();
    heading = this.id.toUpperCase();
    createTipList();

    $('#room a.current').removeClass('current');
    $(this).addClass('current');

    $('#details').text('Click on a tip for more information');
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
  $('#content').on('click', '#tips li a', function(e) {
    e.preventDefault();
    var fragment = this.href;

    fragment = fragment.replace('#', ' #');
    $('#details').hide().load(fragment, function() {
      $(this).fadeIn(1500);
    });

    $('#tips a.current').removeClass('current');
    $(this).addClass('current');
  });

});
var UserProfile = function() {

  this.userName = null;
  this.propertyType = null;
  this.roomList = null;

};

UserProfile.prototype.enterName = function(name) {
  if (name === '') {
    throw new Error ('Please enter your name');
  }
  else {
  this.userName = name;
  };
};


describe('UserProfile', function() {

  var userProfile

  beforeEach(function() {
    userProfile = new UserProfile();
  });

  describe('by default', function() {

    it('should not have a user name', function() {
      expect(userProfile.userName).toBeNull();
    });

    it('should not have a property type', function() {
      expect(userProfile.propertyType).toBeNull();
    });

    it('should not have a list of rooms', function() {
      expect(userProfile.roomList).toBeNull();
    });

  });

  describe('user input', function() {

    it('should allow a name to be entered', function() {
      userProfile.enterName('Steph');
      expect(userProfile.userName).toEqual('Steph');
    });

    it('should prevent a blank name being entered', function() {
      expect(function() { userProfile.enterName('') }).toThrow(new Error ('Please enter your name'));
    });

  });

});
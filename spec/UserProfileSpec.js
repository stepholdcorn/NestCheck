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

});
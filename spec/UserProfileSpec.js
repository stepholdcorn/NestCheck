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

  describe('user name', function() {

    it('should be able to be entered', function() {
      userProfile.enterName('Steph');
      expect(userProfile.userName).toEqual('Steph');
    });

    it('should not be blank', function() {
      expect(function() { userProfile.enterName('') }).toThrow(new Error ('Please enter your name'));
    });

  });

  describe('property type', function() {

    it('should be able to be selected', function() {
      userProfile.selectPropertyType('Apartment');
      expect(userProfile.propertyType).toEqual('Apartment');
    });

  });

});
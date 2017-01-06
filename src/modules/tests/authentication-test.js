var authService = require('./../authentication/service')
let service = new AuthService()

describe('Login', function() {
  describe('connection with firebase', function() {
    it('should return a connection with firebase`s API', function() {
      assert.equal('ok', service.test())
    })
  })
})

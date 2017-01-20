require('module-alias/register')
var assert = require('assert')
let AuthService = require('@modules/authentication/service')
let service = new AuthService()

describe('Login', function() {
  describe('connection with firebase', function(done) {
    it('should return true', function() {
      assert.equal(true, service.login('casottoalves'))
    })
    done()
  })

  // describe('Cheking a current user', function() {
  //   it('should return a current user ', function() {
  //     assert.equal(true, service.singup('casotto@hotmail.com', 'rosovampeta'))
  //   })
  // })
})

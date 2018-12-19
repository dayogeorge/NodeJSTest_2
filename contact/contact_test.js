const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

describe('Contact Test', function(){

	it('it should create Contact List', function(done){
		let contact = {
			name: 'dayo',
			phone_number: '0801234579',
			email: 'personame@domain.com'
		}
	   request(app)
      .post('/')
      .send(contact)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.name, 'dayo');
        done();
      })
	})

    it('it should create User Signup', function(done){
		let user = {
			name: 'dayo',
			email: 'personame@domain.com',
			phone: '0801234579',
			password: 'dayo890'
		}
	   request(app)
      .post('/signup')
      .send(user)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.password, 'dayo890');
        done();
	  })
  })

});
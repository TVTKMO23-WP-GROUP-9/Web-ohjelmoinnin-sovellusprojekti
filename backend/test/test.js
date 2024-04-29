// test/authRoutes.test.js
require('dotenv').config({ path: '../../.env' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const authService = require('../auth/authService');
const profileModel = require('../profile/profileModel'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API', () => {
  describe('User Registration', () => {
    it('should register a new user', async () => {
      const res = await chai
        .request(server)
        .post('/auth/register')
        .send({ username: 'testuser2', password: 'testpassword', email: 'test@example.com' })
        .timeout(10000); 
    
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('message').equal('Rekisteröinti onnistui');
    });

    it('should return an error if username is already taken', async () => {
      const res = await chai
        .request(server)
        .post('/auth/register')
        .send({ username: 'testuser2', password: 'testpassword', email: 'test@example.com' });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').equal('Käyttäjätunnus varattu');
    });

      it('should have all info when one registers a new user', async () => {
        const res = await chai
          .request(server)
          .post('/auth/register')
          .send({ username: null, password: 'password', email: 'test23@example.com' })
          .timeout(10000); 
      
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Rekisteröinti epäonnistui');
      });      
      
      it('should have unique email', async () => {
        const res = await chai
          .request(server)
          .post('/auth/register')
          .send({ username: 'testuser54', password: 'testpassword', email: 'test@example.com' })
          .timeout(10000); 
      
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').equal('Rekisteröinti epäonnistui');
      });
  
  });

  describe('User Login', () => {
    it('should login an existing user', async () => {
      const res = await chai
        .request(server)
        .post('/auth/login')
        .send({ username: 'testuser2', password: 'testpassword' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('jwtToken');
    });

    it('should return an error if username is incorrect', async () => {
      const res = await chai
        .request(server)
        .post('/auth/login')
        .send({ username: 'wrongusername', password: 'testpassword' });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').equal('Käyttäjätunnusta ei löydy');
    });

    it('should return an error if password is incorrect', async () => {
      const res = await chai
        .request(server)
        .post('/auth/login')
        .send({ username: 'testuser2', password: 'wrongpassword' });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').equal('Kirjautuminen epäonnistui');
    });

    it('should return an error if login fails, when not all send data goes through', async () => {
      const res = await chai
          .request(server)
          .post('/auth/login')
          .send({ username: 'testuser2' });
  
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message').equal('Kirjautumisvirhe');
    });
  });

  describe('User Deletion', () => {
    let token; 

    it('should not delete an existing user profile without token', async () => {
      const res = await chai
        .request(server)
        .delete('/profile')
  
      expect(res).to.have.status(403);
    });

    before(async () => {
      const res = await chai
        .request(server)
        .post('/auth/login')
        .send({ username: 'testuser2', password: 'testpassword' });
  
      token = res.body.jwtToken;
    });
  
    it('should delete an existing user profile', async () => {
      const res = await chai
        .request(server)
        .delete('/profile')
        .set('Authorization', `Bearer ${token}`); 
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').equal('Tietue poistettu onnistuneesti');
    });
  });

  
});
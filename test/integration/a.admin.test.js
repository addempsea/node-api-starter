import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { updateAdmin } from '../fixtures';

const { expect } = chai;
chai.use(chaiHttp);
const baseUrl = '/api/v1/auth/admin/login';

// eslint-disable-next-line max-lines-per-function
describe('Admin Routes', () => {
  it('should fail to sign in admin, bad request body', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        email: 'admin01@api.io'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done(err);
      });
  });
  it('should fail to sign in admin, wrong email', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        email: 'admin01@api.io',
        password: '123456789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done(err);
      });
  });
  it('should fail to sign in admin, wrong password', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        email: 'admin@api.io',
        password: '5678762345678'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done(err);
      });
  });
  it('should sign in admin', (done) => {
    chai
      .request(app)
      .post(baseUrl)
      .send({
        email: 'admin@api.io',
        password: '123456789'
      })
      .end((err, res) => {
        process.env.ADMIN_TOKEN = res.body.data.token;
        process.env.ADMIN_EMAIL = res.body.data.email.toLowerCase();
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should update a admin profile', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin')
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .send(updateAdmin)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should get admin profile', (done) => {
    chai
      .request(app)
      .get('/api/v1/admin')
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        process.env.ADMIN_ID = res.body.data.id;
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should do reset password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/admin/reset-password')
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should do forgot password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/admin/forgot-password')
      .send({
        email: process.env.ADMIN_EMAIL
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
});

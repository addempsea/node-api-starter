/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { createRole, editRole } from '../fixtures';

const { expect } = chai;
chai.use(chaiHttp);
const baseURL = '/api/v1/role';
const fakeID = '12345';

describe('Role Routes', () => {
  it('should fail to get a role', (done) => {
    chai
      .request(app)
      .get(`${baseURL}/${fakeID}`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('should fail to edit a role', (done) => {
    chai
      .request(app)
      .put(`${baseURL}/${fakeID}`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .send(editRole)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('should fail to delete a role', (done) => {
    chai
      .request(app)
      .delete(`${baseURL}/${fakeID}`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('should create a role', (done) => {
    chai
      .request(app)
      .post(baseURL)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .send(createRole)
      .end((err, res) => {
        process.env.roleId = res.body.data.id;
        expect(res).to.have.status(201);
        done(err);
      });
  });
  it('should fail to create a role, 409', (done) => {
    chai
      .request(app)
      .post(baseURL)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .send(createRole)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done(err);
      });
  });
  it('should edit a role', (done) => {
    chai
      .request(app)
      .put(`${baseURL}/${process.env.roleId}`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .send(editRole)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
  it('should get a role', (done) => {
    chai
      .request(app)
      .get(`${baseURL}/${process.env.roleId}`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
  it('should get all roles', (done) => {
    chai
      .request(app)
      .get(baseURL)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
  it('should delete a role', (done) => {
    chai
      .request(app)
      .delete(`${baseURL}/${process.env.roleId}`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(204);
        done(err);
      });
  });
  it('should get all roles paginated', (done) => {
    chai
      .request(app)
      .get(`${baseURL}?page=1`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.roles.length).to.be.lessThanOrEqual(10);
        done(err);
      });
  });
  it('should get all searched roles paginated', (done) => {
    chai
      .request(app)
      .get(`${baseURL}?search=a`)
      .set({ Authorization: process.env.ADMIN_TOKEN })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.roles).to.be.an('array');
        done(err);
      });
  });
});

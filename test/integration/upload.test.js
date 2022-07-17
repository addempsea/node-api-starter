import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;
chai.use(chaiHttp);

const path = '';
describe('Upload', () => {
  it('Should fail to upload image', (done) => {
    chai
      .request(app)
      .post('/api/v1/upload')
      .attach('file', path)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done(err);
      });
  });
});

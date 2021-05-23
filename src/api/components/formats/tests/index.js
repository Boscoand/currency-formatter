/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const { connect, disconnect } = require('../../../../services/mongoMock');
const { app } = require('../../../../index');

chai.use(chaiHttp);

before(async () => {
  await connect();
});

after(async () => {
  await disconnect();
});

describe('POST /formats', () => {
  it('creates a Format successfully', (done) => {
    const body = {
      market: 'Ecuador',
      code: 'USD',
      symbol: '$',
      currency: 'code',
      currencyOnLeft: true,
      thousandsSeparator: ',',
      decimalSeparator: '.',
      decimalDigits: 2,
    };

    chai.request(app)
      .post('/formats')
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('market');
        done();
      });
  });

  it('market not sent', (done) => {
    const body = {
      code: 'USD',
      symbol: '$',
    };

    chai.request(app)
      .post('/formats')
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("body must have required property 'market'");
        done();
      });
  });
});

describe('GET /formats', () => {
  it('gets a Format successfully', (done) => {
    chai.request(app)
      .get('/formats?market=Ecuador')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('format');
        res.body.data.format.should.have.property('market');
        res.body.data.format.should.have.property('code');
        res.body.data.format.should.have.property('symbol');
        res.body.data.format.should.have.property('currency');
        res.body.data.format.should.have.property('currencyOnLeft');
        res.body.data.format.should.have.property('thousandsSeparator');
        res.body.data.format.should.have.property('decimalSeparator');
        res.body.data.format.should.have.property('decimalDigits');
        done();
      });
  });
  it('market not sent', (done) => {
    chai.request(app)
      .get('/formats')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The market param is mandatory');
        done();
      });
  });
});

describe('PATCH /formats', () => {
  it('updates a Format successfully', (done) => {
    const body = {
      market: 'Ecuador',
      code: 'USD',
      symbol: '$$',
    };

    chai.request(app)
      .patch('/formats')
      .send(body)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });
  it('market not sent', (done) => {
    const body = {
      code: 'USD',
    };

    chai.request(app)
      .patch('/formats')
      .send(body)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("body must have required property 'market'");
        done();
      });
  });
});

describe('DELETE /formats', () => {
  it('deletes a Format successfully', (done) => {
    chai.request(app)
      .delete('/formats?market=Ecuador')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data').eql(null);
        done();
      });
  });
  it('market not sent', (done) => {
    chai.request(app)
      .delete('/formats')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The market param is mandatory');
        done();
      });
  });
});

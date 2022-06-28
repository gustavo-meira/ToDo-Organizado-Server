import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../../app';

chai.use(chaiHttp);

import { UserRepository } from '../../repositories/prisma/UserRepository';
import { ConflictError } from '../../errors/ConflictError';

const { expect } = chai;

describe('Create User Use Case', () => {
  beforeEach(() => {
    sinon.stub(UserRepository.prototype, 'create')
      .resolves();
  });

  afterEach(() => {
    (UserRepository.prototype.create as sinon.SinonStub).restore();
  });

  const defaultUser = {
    username: 'test',
    email: 'test@test.com',
    password: 'testtest',
  };

  it('should create a user', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send(defaultUser);

    expect(response.status).to.equal(201);
    expect(response.body.token).to.be.a('string');
  });

  it('should return an error if username is missing', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({
        password: 'testtest',
        email: 'test@test.com',
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" is required');
  });

  it('should return an error if email is missing', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({
        username: 'test',
        password: 'testtest',
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" is required');
  });

  it('should return an error if password is missing', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({
        username: 'test',
        email: 'test@test.com',
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"password" is required');
  });

  it('should return an error if username is not a string', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, username: 1 });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" must be a string');
  });

  it('should return an error if username is too short or too long', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, username: 't' });

    const response2 = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, username: 'testtesttesttesttesttest' });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"username" must be at least 3 characters long');
    expect(response2.status).to.equal(400);
    expect(response2.body.message).to.equal('"username" must be at most 20 characters long');
  });

  it('should return an error if password is not a string', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, password: 1 });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"password" must be a string');
  });

  it('should return an error if password is too short or too long', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, password: 't' });

    const response2 = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, password: 'testtesttesttesttesttest' });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"password" must be at least 6 characters long');
    expect(response2.status).to.equal(400);
    expect(response2.body.message).to.equal('"password" must be at most 20 characters long');
  });

  it('should return an error if email is not a string', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, email: 1 });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" must be a string');
  });

  it('should return an error if email is invalid', async () => {
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, email: 'test@test' });
    
    const response2 = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, email: 'test' });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"email" must be a valid email');
    expect(response2.status).to.equal(400);
    expect(response2.body.message).to.equal('"email" must be a valid email');
  });

  it('should return an error if email is already taken', async () => {
    (UserRepository.prototype.create as sinon.SinonStub).throwsException(new ConflictError('"email" must be unique'));
    const response = await chai.request(app)
      .post('/user')
      .send({ ...defaultUser, email: 'test@test.com' });

    expect(response.status).to.equal(409);
    expect(response.body.message).to.equal('"email" must be unique');
  });
});

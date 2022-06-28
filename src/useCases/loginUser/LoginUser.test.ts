import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../../app';

chai.use(chaiHttp);

import { UserRepository } from '../../repositories/prisma/UserRepository';
import { UserEntity } from '../../entities/UserEntity';
import { CryptoPasswordProvider } from '../../providers/implementations/CryptoPasswordProvider';

const { expect } = chai;

describe('Login User Use Case', () => {

  
  beforeEach(async () => {
    const cryptoPassword = new CryptoPasswordProvider();
  
    const password = await cryptoPassword.hash('123456');

    const user = new UserEntity({
      email: 'test@test.com',
      password,
      username: 'test',
      id: '1',
    });

    sinon.stub(UserRepository.prototype, 'getByEmail')
      .resolves(user);
  });

  afterEach(() => {
    (UserRepository.prototype.getByEmail as sinon.SinonStub).restore();
  });

  it('should be able to login', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(response.status).to.be.equal(200);
    expect(response.body.token).to.be.a('string');
  });

  it('should not be able to login with non-existing user', async () => {
    (UserRepository.prototype.getByEmail as sinon.SinonStub).resolves(null);

    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"email" or "password" is invalid');
  });

  it('should not be able to login with wrong password', async () => {
    const user = new UserEntity({
      email: 'test@test.com',
      password: 'wrong-password',
      username: 'test',
      id: '1',
    });

    (UserRepository.prototype.getByEmail as sinon.SinonStub).resolves(user);

    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"email" or "password" is invalid');
  });

  it('should return an error if email is missing', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        password: '123456',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"email" is required');
  });

  it('should return an error if password is missing', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('"password" is required');
  });
});
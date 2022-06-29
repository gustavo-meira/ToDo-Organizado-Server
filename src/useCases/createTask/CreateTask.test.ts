import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../../app';

chai.use(chaiHttp);

import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { JWTProvider } from '../../providers/implementations/JWTProvider';
import { UserRepository } from '../../repositories/prisma/UserRepository';
import { UserEntity } from '../../entities/UserEntity';

const { expect } = chai;

describe('Create Task Use Case', () => {
  beforeEach(() => {
    sinon.stub(TaskRepository.prototype, 'create')
      .resolves();

    sinon.stub(UserRepository.prototype, 'getById')
      .resolves(new UserEntity({
        id: 'test',
        username: 'username',
        email: 'test@test.com',
        password: 'password',
      }))
  });

  afterEach(() => {
    (TaskRepository.prototype.create as sinon.SinonStub).restore();
    (UserRepository.prototype.getById as sinon.SinonStub).restore();
  });

  const jwtProvider = new JWTProvider();

  const token = jwtProvider.sign({ id: 'test' });

  const defaultTask = {
    title: 'test',
  };

  it('should create a task', async () => {
    const response = await chai.request(app)
      .post('/task')
      .set('authorization', token)
      .send(defaultTask);

    expect(response.status).to.equal(201);
    expect(response.body.id).to.be.a('string');
  });

  it('should return an error if token is not provided', async () => {
    const response = await chai.request(app)
      .post('/task')
      .send(defaultTask);

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('"token" not provided');
  });

  it('should return an error if token is invalid', async () => {
    const response = await chai.request(app)
      .post('/task')
      .set('authorization', 'invalid')
      .send(defaultTask);

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('"token" is invalid or expired');
  });

  it('should return an error if title is not provided', async () => {
    const response = await chai.request(app)
      .post('/task')
      .set('authorization', token)
      .send({ ...defaultTask, title: undefined });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('"title" is required');
  });
});
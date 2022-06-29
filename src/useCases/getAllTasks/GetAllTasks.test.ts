import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../../app';

chai.use(chaiHttp);

import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { JWTProvider } from '../../providers/implementations/JWTProvider';
import { UserRepository } from '../../repositories/prisma/UserRepository';
import { UserEntity } from '../../entities/UserEntity';
import { TaskEntity } from '../../entities/TaskEntity';

const { expect } = chai;

describe('Get All Tasks Use Case', () => {
  beforeEach(() => {
    sinon.stub(TaskRepository.prototype, 'getAll')
      .resolves([new TaskEntity({
        id: 'test',
        title: 'test',
        userId: 'test',
      })]);

    sinon.stub(UserRepository.prototype, 'getById')
      .resolves(new UserEntity({
        id: 'test',
        username: 'username',
        email: 'test@test.com',
        password: 'password',
      }))
  });

  afterEach(() => {
    (TaskRepository.prototype.getAll as sinon.SinonStub).restore();
    (UserRepository.prototype.getById as sinon.SinonStub).restore();
  });

  const jwtProvider = new JWTProvider();

  const token = jwtProvider.sign({ id: 'test' });

  it('should return all tasks', async () => {
    const response = await chai.request(app)
      .get('/task')
      .set('authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body.tasks).to.be.an('array');
  });

  it('should return an error if token is not provided', async () => {
    const response = await chai.request(app)
      .get('/task');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('"token" not provided');
  });

  it('should return an error if token is invalid', async () => {
    const response = await chai.request(app)
      .get('/task')
      .set('authorization', 'invalid token');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('"token" is invalid or expired');
  });

  it('should return an empty array if no tasks were found', async () => {
    (TaskRepository.prototype.getAll as sinon.SinonStub).resolves([]);

    const response = await chai.request(app)
      .get('/task')
      .set('authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body.tasks).to.deep.equal([]);
  });

});
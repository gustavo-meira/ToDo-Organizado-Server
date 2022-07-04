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

describe('Update Task Status Use Case', () => {
  beforeEach(() => {
    sinon.stub(TaskRepository.prototype, 'updateStatus')
      .resolves();

    sinon.stub(UserRepository.prototype, 'getById')
      .resolves(new UserEntity({
        id: 'test',
        username: 'username',
        email: 'test@test.com',
        password: 'password',
      }));

    sinon.stub(TaskRepository.prototype, 'getById')
      .resolves(new TaskEntity({
        id: 'test',
        title: 'test',
        userId: 'test',
      }));
  });

  afterEach(() => {
    (TaskRepository.prototype.updateStatus as sinon.SinonStub).restore();
    (UserRepository.prototype.getById as sinon.SinonStub).restore();
    (TaskRepository.prototype.getById as sinon.SinonStub).restore();
  });

  const jwtProvider = new JWTProvider();

  const token = jwtProvider.sign({ id: 'test' });

  it('should return an ok status if the task is updated', async () => {
    const response = await chai.request(app)
      .patch('/task/test?status=in progress')
      .set('authorization', token)

    expect(response.status).to.be.equal(204);
  });

  it('should return an unauthorized status if the user is not authenticated', async () => {
    const response = await chai.request(app)
      .patch('/task/test?status="in progress"')

    expect(response.status).to.be.equal(401);
  });

  it('should return an bad request status if the status is invalid', async () => {
    const response = await chai.request(app)
      .patch('/task/test?status="invalid"')
      .set('authorization', token)

    expect(response.status).to.be.equal(400);
  });

  it('should return an bad request status if the status is missing', async () => {
    const response = await chai.request(app)
      .patch('/task/test')
      .set('authorization', token)

    expect(response.status).to.be.equal(400);
  });
});
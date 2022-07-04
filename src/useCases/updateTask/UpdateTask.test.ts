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

describe('Update Task Use Case', () => {
  beforeEach(() => {
    sinon.stub(TaskRepository.prototype, 'update')
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
    (TaskRepository.prototype.update as sinon.SinonStub).restore();
    (UserRepository.prototype.getById as sinon.SinonStub).restore();
  });

  const jwtProvider = new JWTProvider();

  const token = jwtProvider.sign({ id: 'test' });

  const defaultTask = new TaskEntity({
    id: 'test',
    title: 'test',
    userId: 'test',
  });

  it('should return an ok status if the task is updated', async () => {
    const response = await chai.request(app)
      .put('/task/test')
      .set('authorization', token)
      .send(defaultTask);

    expect(response.status).to.be.equal(204);
  });

  it('should return an unauthorized status if the user is not authenticated', async () => {
    const response = await chai.request(app)
      .put('/task/test')
      .send(defaultTask);

    expect(response.status).to.be.equal(401);
  });
});
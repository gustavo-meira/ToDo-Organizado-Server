import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { app } from '../../app';

chai.use(chaiHttp);

import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { JWTProvider } from '../../providers/implementations/JWTProvider';
import { TaskEntity } from '../../entities/TaskEntity';

const { expect } = chai;

describe('Delete Task Use Case', () => {
  beforeEach(() => {
    sinon.stub(TaskRepository.prototype, 'delete')
      .resolves();

    sinon.stub(TaskRepository.prototype, 'getAll')
      .resolves([new TaskEntity({
        id: 'test',
        title: 'test',
        userId: 'test',
      })]);

    sinon.stub(TaskRepository.prototype, 'getById')
      .resolves(new TaskEntity({
        id: 'test',
        title: 'test',
        userId: 'test',
      }));
  });

  afterEach(() => {
    (TaskRepository.prototype.delete as sinon.SinonStub).restore();
    (TaskRepository.prototype.getAll as sinon.SinonStub).restore();
    (TaskRepository.prototype.getById as sinon.SinonStub).restore();
  });

  const jwtProvider = new JWTProvider();

  const token = jwtProvider.sign({ id: 'test' });

  it('should delete a task', async () => {
    const response = await chai.request(app)
      .delete('/task/test')
      .set('authorization', token);

    expect(response.status).to.equal(204);
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
      .set('authorization', 'invalid');

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('"token" is invalid or expired');
  });

  it('should return an error if task is not found', async () => {
    (TaskRepository.prototype.getAll as sinon.SinonStub).resolves([]);

    const response = await chai.request(app)
      .delete('/task/test')
      .set('authorization', token);

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('"task" not found');
  });

  it('should return an error if user is not authorized to delete task', async () => {
    (TaskRepository.prototype.getAll as sinon.SinonStub).resolves([new TaskEntity({
      id: 'invalid',
      title: 'invalid',
      userId: 'invalid',
    })]);

    const response = await chai.request(app)
      .delete('/task/test')
      .set('authorization', token);


    expect(response.status).to.equal(403);
    expect(response.body.message).to.equal('"user" is not authorized to delete task');
  });
});
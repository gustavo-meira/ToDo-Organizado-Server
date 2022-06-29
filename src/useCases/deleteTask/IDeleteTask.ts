interface IDeleteTask {
  execute(id: string, userId: string): Promise<void>;
}

export { IDeleteTask };

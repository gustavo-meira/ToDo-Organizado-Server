type UserProps = {
  username: string;
  email: string;
  password: string;
}

interface ICreateUser {
  execute(user: UserProps): Promise<string>;
}

export { UserProps, ICreateUser };

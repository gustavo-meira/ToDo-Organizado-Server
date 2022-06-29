type UserEntityProps = {
  id: string;
  username: string;
  email: string;
  password: string;
};

class UserEntity {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly username: string;

  constructor(userProps: UserEntityProps) {
    this.email = userProps.email;
    this.password = userProps.password;
    this.username = userProps.username;
    this.id = userProps.id;
  }
}

export { UserEntity };

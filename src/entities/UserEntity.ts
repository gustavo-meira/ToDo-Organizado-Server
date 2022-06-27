type UserEntityProps = {
  id: string;
  username: string;
  email: string;
  password: string;
};

class UserEntity {
  private _id: string;
  private _email: string;
  private _password: string;
  private _username: string;

  constructor(userProps: UserEntityProps) {
    this._email = userProps.email;
    this._password = userProps.password;
    this._username = userProps.username;
    this._id = userProps.id;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get username(): string {
    return this._username;
  }
}

export { UserEntity };

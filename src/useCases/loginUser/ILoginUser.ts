type LoginUserProps = {
  email: string;
  password: string;
};

interface ILoginUser {
  execute(loginUserProps: LoginUserProps): Promise<string>;
}

export { ILoginUser, LoginUserProps };

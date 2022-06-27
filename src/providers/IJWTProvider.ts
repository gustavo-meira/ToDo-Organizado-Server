interface IJWTProvider {
  sign(payload: any): string;
  verify<T>(token: string): T | null;
}

export { IJWTProvider };

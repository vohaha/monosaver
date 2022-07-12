export interface IUser {
  id: number;
  email: string;
  password_hash: string;
  salt: string;
}

export interface UIUser {
  sub: IUser["id"];
  email: IUser["email"];
  iat: number;
  exp: number;
}

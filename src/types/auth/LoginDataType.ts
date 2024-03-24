import { UserDataType } from "./UserDataType";

export interface LoginDataType {
  email: string;
  password: string;
  fcmToken: string;
}

export interface TokenType {
  "access-token": string;
}

export interface LoginResponseType {
  headers: TokenType;
  userInfo: UserDataType;
}

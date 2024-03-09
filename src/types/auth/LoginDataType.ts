export interface LoginDataType {
  email: string;
  password: string;
}

export interface TokenType {
  "access-token": string;
}

export interface LoginResponseType {
  headers: TokenType;
}

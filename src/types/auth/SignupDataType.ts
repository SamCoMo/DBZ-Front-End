export interface SignupDataType {
  email: string;
  nickname: string;
  phone: string;
  password: string;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

export interface LocationInitType {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

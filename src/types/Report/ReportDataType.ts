export interface ReportDataType {
  reportId: number;
  title: string;
  pet_type: string;
  shows_phone: boolean;
  species: string;
  pet_name: string;
  feature: string;
  street_address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  image_list: [];
}
export interface ReportDetailType {
  feature: string;
  title: string;
  petType: string;
  shows_phone: boolean;
  descriptions:string;
  species: string;
  petName: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  status?: string;
  image_list: [];
  createdAt:string,
  views: number;
  phone:string;
}
export interface ReportDetailIdType {
  reportId: string;
  writer: boolean;
}
export interface ReportPinDataType {
  pinId: number;
  foundAt: string;
  address: string;
  latitude: number;
  longitude: number;
  pinImageDtoList: [];
}

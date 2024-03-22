export interface ReportParamsType {
  curlatitude: number | null;
  curlongitude: number | null;
  showsInprocessOnly: boolean;
  pageParam?: {
    lastlatitude: number | null;
    lastlongitude: number | null;
  };
}

export interface ReportListProps {
  curlatitude: number | null;
  curlongitude: number | null;
  lastlatitude?: number | null;
  lastlongitude?: number | null;
  InProcessOnly: boolean;
}

export interface ReportListDataType {
  reportId: number;
  memberId: number;
  title: string;
  petName: string;
  petType: string;
  species: string;
  streetAddress: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  reportStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportDataType {
  reportId: number;
  title: string;
  pet_type: string;
  shows_phone: boolean;
  species: string;
  pet_name: string;
  descriptions:string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  image_list: [];
  pinId:number;
}
export interface ReportDetailType {
  organizedId:number;
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

export interface ReportDeleteType {
  isReportDelete: boolean;
}
export interface ReportEditDataType {
  report: ReportDetailType;
  reportId: number;
}
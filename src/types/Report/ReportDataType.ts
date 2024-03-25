export interface ReportParamsType {
  curLatitude: number | null;
  curLongitude: number | null;
  showsInprocessOnly: boolean;
  pageParam?: {
    lastLatitude: number | null;
    lastLongitude: number | null;
  };
}

export interface ReportListProps {
  curLatitude: number | null;
  curLongitude: number | null;
  lastLatitude?: number | null;
  lastLongitude?: number | null;
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
  descriptions: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  image_list: [];
}
export interface ReportDetailType {
  pinId: any;
  organizedId: number;
  feature: string;
  title: string;
  petType: string;
  shows_phone: boolean;
  descriptions: string;
  species: string;
  petName: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  status?: string;
  image_list: [];
  createdAt: string;
  views: number;
  phone: string;
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
export interface ReportPinRequestDataType {
  reportId: number; // 보고서 ID
  pinData: ReportPinDataType; // 핀 데이터
}

export interface ReportDeleteType {
  isReportDelete: boolean;
}
export interface ReportEditDataType {
  report: ReportDetailType;
  reportId: number;
}

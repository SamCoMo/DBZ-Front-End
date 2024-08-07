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
  content: {
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
  }[];
  last?: boolean;
}
export interface ReportDefaultDataType {
  title: string;
  petType: string;
  showsPhone: boolean;
  species: string;
  petName: string;
  descriptions: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  imageList: File[];
}
export interface ReportDataType {
  writerId:number;
  forEach: any;
  map?: any;
  title: string;
  petType: string;
  showsPhone: boolean;
  species: string;
  petName: string;
  descriptions: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  imageUrl:string;
  imageList: File[];
}
export interface WriterDataType {
    id: number;
    nickname: string;
    profileImageUrl: string;

}
export interface ReportDetailType {
  reportId:number;
  memberId:number;
  writerProfile:WriterDataType;
  title: string;
  petType: string;
  showsPhone: boolean;
  descriptions: string;
  species: string;
  petName: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  reportStatus: string;
  imageUrl:string;
  imageList:File[];
  createdAt: string;
  views: number;
  phone: string;
}
export interface ReportDetailIdType {
  reportId: number;
}

export interface ReportPinDataType {
  description: string;
  pinId:number;
  reportId?:number;
  foundAt: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl?:string;
  multipartFileList:File[];
  pinImageDtoList:File[];
  
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
export interface ReportEditStatusType {
  reportId: number;
  status:string;
}

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
  writer?: boolean;
  reportId: number;
  title: string;
  pet_type: string;
  shows_phone: boolean;
  species: string;
  pet_name: string;

  scheduleAt: string;

  street_address: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  status?: string;
}

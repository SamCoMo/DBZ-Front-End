import {
  postSignUp,
  getUserProfile,
  postLogin,
  postLogout,
  postWithDraw,
} from "./auth/handler";
import {
  getReport,
  deleteReport,
  getReportDetail,
  patchMyReport,
  postPin,
  postReport,
} from "./report/handler";
import { getKaKaoAPI, patchLocation, putProfileImg } from "./user/handler";

const handlers = [
  postSignUp,
  postLogin,
  getUserProfile,
  putProfileImg,
  getReportDetail,
  getReport,
  postLogout,
  postWithDraw,
  postReport,
  patchMyReport,
  deleteReport,
  postPin,
  patchLocation,
  getKaKaoAPI,
];

export default handlers;

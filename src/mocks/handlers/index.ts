
import { postSignUp, getUserProfile, postLogin } from "./auth/handler";
import { deleteReport, getReportDetail, patchMyReport, postPin, postReport } from "./report/handler";
import { putProfileImg } from "./user/handler";

const handlers = [postSignUp, postLogin, getUserProfile, putProfileImg, getReportDetail, postReport,patchMyReport,deleteReport, postPin] ;

export default handlers;

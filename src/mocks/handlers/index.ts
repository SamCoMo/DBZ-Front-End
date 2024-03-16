
import { postSignUp, getUserProfile, postLogin } from "./auth/handler";
import { getReportDetail, postReport } from "./report/handler";
import { putProfileImg } from "./user/handler";

const handlers = [postSignUp, postLogin, getUserProfile, putProfileImg, getReportDetail] ;

export default handlers;

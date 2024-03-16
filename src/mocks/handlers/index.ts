import { postSignUp } from "./auth/handler";
import { getReportDetail, postReport } from "./report/handler";
const handlers = [postSignUp, postReport, getReportDetail];
export default handlers;

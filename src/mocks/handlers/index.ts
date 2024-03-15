import { postSignUp } from "./auth/handler";
import { postReport } from "./report/handler";
const handlers = [postSignUp, postReport];
export default handlers;

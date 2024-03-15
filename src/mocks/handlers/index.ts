import { getUserProfile, postLogin, postSignUp } from "./auth/handler";
import { putProfileImg } from "./user/handler";

const handlers = [postSignUp, postLogin, getUserProfile, putProfileImg];
export default handlers;

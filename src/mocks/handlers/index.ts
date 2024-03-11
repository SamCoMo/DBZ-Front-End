import { getUserProfile, postLogin, postSignUp } from "./auth/handler";

const handlers = [postSignUp, postLogin, getUserProfile];
export default handlers;

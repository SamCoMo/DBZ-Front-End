import { postLogin, postSignUp } from "./auth/handler";

const handlers = [postSignUp, postLogin];
export default handlers;

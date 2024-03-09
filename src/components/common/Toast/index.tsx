import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  text: string;
  type: string;
}
export const notify = ({ type, text }: Props) => {
  switch (type) {
    case "default":
      toast(text);
      break;
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warning(text);
      break;
    case "error":
      toast.error(text);
      break;
  }
};

const autoClose = 1000;

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default Toast;

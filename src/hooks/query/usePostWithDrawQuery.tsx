import { axiosAuth } from "@/apis";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchAPI = async () => {
  const res = await axiosAuth.post("/member/withdraw");
  return res.data;
};

const usePostWithDrawQuery = () => {
  const navigate = useNavigate();

  const { mutate: withDrawMutate } = useMutation({
    mutationKey: ["withDrawMember"],
    mutationFn: () => fetchAPI(),
    onSuccess: () => {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("userInfo");
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/", { replace: true });
    },
  });

  return { withDrawMutate };
};

export default usePostWithDrawQuery;

import useUserProfileQuery from "@/hooks/query/useUserProfileQuery";
import useUserState from "@/hooks/useUserState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useUserProfileQuery();
  const { updateUser } = useUserState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      updateUser({
        ...user,
        isLogin: true,
      });
    }
  }, [user]);

  const handleLogout = () => {
    const checkLogout = window.confirm("로그아웃을 하시겠습니까?");
    if (checkLogout) {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("userInfo");
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <div className="mt-5 flex justify-center">
        <div className="avatar flex-col items-center">
          {user?.profile_image_url ? (
            <div className="w-24 rounded-full">
              <img src={user?.profile_image_url} alt={user?.name} />
            </div>
          ) : (
            <div>프로필사진없음</div>
          )}
          <div className="justify-center">
            <p className="mt-5 font-medium">{user?.nickname}</p>
          </div>
        </div>
      </div>
      {user?.profile_image_url && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <button type="button">프로필 사진 삭제하기</button>
        </div>
      )}
      <div className="absolute bottom-20 left-0 w-full flex justify-center text-sm text-slate-300">
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
        <div className="mx-3">|</div>
        <button>회원탈퇴</button>
      </div>
    </>
  );
};

export default UserProfile;

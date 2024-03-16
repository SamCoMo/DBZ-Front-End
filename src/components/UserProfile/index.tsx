import useUserProfileQuery from "@/hooks/query/useUserProfileQuery";
import useUserState from "@/hooks/useUserState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCameraFill } from "react-icons/bs";
import usePutProfileImgEditQuery from "@/hooks/query/usePutProfileImgEditQuery";
import usePostWithDrawQuery from "@/hooks/query/usePostWithDrawQuery";

const UserProfile = () => {
  const { user } = useUserProfileQuery();
  const { userState, updateUser } = useUserState();
  const [profileImgUrl, setProfileImgUrl] = useState<
    string | ArrayBuffer | null
  >(userState.profile_image_url);
  const { profileImgEditMutate } = usePutProfileImgEditQuery();
  const { withDrawMutate } = usePostWithDrawQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      updateUser({
        ...user,
        isLogin: true,
      });
    }
  }, [user]);

  const handleProfileImgEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();

    if (!file) return;

    formData.append("profile_image_url", file);

    // 이미지 미리보기 처리
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setProfileImgUrl(reader.result);
    };

    profileImgEditMutate(formData);
  };

  const handleProfileImgDel = () => {};

  const handleLogout = () => {
    const checkLogout = window.confirm("로그아웃을 하시겠습니까?");
    if (checkLogout) {
      localStorage.removeItem("Access-Token");
      localStorage.removeItem("userInfo");
      navigate("/", { replace: true });
    }
  };

  const handleWithdraw = () => {
    const checkWithdraw = window.confirm("정말 회원 탈퇴를 하시겠습니까?");
    if (checkWithdraw) {
      withDrawMutate();
    }
  };

  return (
    <>
      <div className="mt-5 flex justify-center">
        <div className="avatar flex-col relative items-center">
          {profileImgUrl ? (
            <div className="w-24 rounded-full">
              <img src={`${profileImgUrl}`} alt={userState?.nickname} />
            </div>
          ) : (
            <div className="w-24 rounded-full bg-gray3"></div>
          )}
          <label
            htmlFor="profileImgEdit"
            className="absolute w-6 h-6 rounded-full bg-slate-300 right-0 flex justify-center items-center"
          >
            <BsCameraFill />
          </label>
          <input
            type="file"
            accept="image/*"
            name="profileImgEdit"
            id="profileImgEdit"
            onChange={handleProfileImgEdit}
            className="hidden"
          />
          <div className="justify-center">
            <p className="mt-5 font-medium">{userState?.nickname}</p>
          </div>
        </div>
      </div>
      {userState?.profile_image_url && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <button type="button" onClick={handleProfileImgDel}>
            프로필 사진 삭제하기
          </button>
        </div>
      )}
      <div className="absolute bottom-20 left-0 w-full flex justify-center text-sm text-slate-300">
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
        <div className="mx-3">|</div>
        <button type="button" onClick={handleWithdraw}>
          회원탈퇴
        </button>
      </div>
    </>
  );
};

export default UserProfile;

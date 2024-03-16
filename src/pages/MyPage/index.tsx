import UserProfile from "@/components/UserProfile";
import HeaderTitle from "@/components/common/HeaderTitle";
import Nav from "@/components/common/Nav";

const MyPage = () => {
  return (
    <>
      <HeaderTitle title="" back={true} />
      <UserProfile />
      <Nav />
    </>
  );
};

export default MyPage;

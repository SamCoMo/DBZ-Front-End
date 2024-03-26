import { FaUser } from "react-icons/fa6";

const DefaultProfile = () => {
  return (
    <>
      <div className="w-24 rounded-full bg-gray3">
        <div className="flex justify-center items-center h-full text-white">
          <FaUser size={50} />
        </div>
      </div>
    </>
  );
};

export default DefaultProfile;

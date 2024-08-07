interface AlarmItemProps {
  type: string;
  message: string;
}

const AlarmItem = (data: AlarmItemProps) => {

  return (
    <>
      <div className="flex items-center my-5">
        <div className="w-12">
          <img
            src="/image/DBZ_profile.jpg"
            className="rounded-full object-cover"
          ></img>
        </div>
        <p className="flex-1 ml-4">{`${data.type} 알림이 왔습니다! ${data.message}`}</p>
      </div>
    </>
  );
};

export default AlarmItem;

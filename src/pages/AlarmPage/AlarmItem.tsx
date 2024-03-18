interface AlarmItemProps {
  body: string;
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
        <p className="flex-1 ml-4">{data.body}</p>
      </div>
    </>
  );
};

export default AlarmItem;

interface AlarmItemProps {
  body: string;
}

const AlarmItem = (data: AlarmItemProps) => {
  return (
    <>
      <div className="my-5">
        <p>{data.body}</p>
      </div>
    </>
  );
};

export default AlarmItem;

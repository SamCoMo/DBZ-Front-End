interface NoDataTextProps {
  text: string;
}

const DataNull = ({ text }: NoDataTextProps) => (
  <div className="py-10 text-center">{text}</div>
);

export default DataNull;
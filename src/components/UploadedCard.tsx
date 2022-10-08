interface UploadedCardProps {
  FilePic?: string;
  FileName?: string;
  FileAddedTime?: Array<string>; //["01", "DEC", "2022"]



}
const UploadedCard = ({FilePic, FileName, FileAddedTime}: UploadedCardProps) => {
  return <div className={`flex w-12 bg-gray-200`}>test</div>;
};

export { UploadedCard };
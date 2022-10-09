interface NewUploadedCardProps {

}


const img_address = "https://icons.veryicon.com/png/o/miscellaneous/real-cool/live-cool-background-picture-upload.png"
const NewUploadedCard = ({}: NewUploadedCardProps) => {
  return(
  <div className={`flex w-166 h-24 gap-5 items-center justify-center bg-gray-50 rounded-2xl border-dashed border-4 border-gray-400`}>
    <div className={`flex flex-col items-center justify-center gap-1`}>
      <img src={img_address} className={`flex w-10 h-10`}/>
      <div className={`text-xs text-gray-100`}>Drag and Drop</div>
    </div>

  </div>
  );
};

export { NewUploadedCard };
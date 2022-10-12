import { Button } from "./Button";
interface NewUploadedCardProps {

}


const img_address = "https://icons.veryicon.com/png/o/miscellaneous/real-cool/live-cool-background-picture-upload.png"
const NewUploadedCard = ({ }: NewUploadedCardProps) => {
  return (
    <div className={`flex w-166 h-24 gap-5 ml-8 items-center justify-center bg-gray-50 rounded-2xl border-dashed border-2 border-gray-400 relative`}>
      <div className={`flex flex-row items-center gap-1`}>

        <input type="file" className={`block file:opacity-100 w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 content-center`} />
        <Button
          theme={"blue"}
          label={"Upload"}
          onClick={() => {
          }}
          size={"hug"}
        ></Button>
      </div>

    </div>
  );
};

export { NewUploadedCard };
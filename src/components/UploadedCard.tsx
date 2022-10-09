interface UploadedCardProps {
  FilePic?: string;
  FileName?: string;
  FileAddedTime?: string;

}


const img_address = "https://cdn-icons-png.flaticon.com/128/1702/1702912.png"
const temp_img_address = "https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_960_720.png"
const waste_icon = "https://freesvg.org/img/trash.png"

const UploadedCard = ({FilePic, FileName, FileAddedTime}: UploadedCardProps) => {
  return(
    <div className={`flex flex-col w-176 h-44`}> 
        <div className={`flex flex-row w-176 h-auto`}> 
            <div className={`flex font-bold text-2xl items-center`}><img src={img_address} className={`w-10 h-10 mr-3`} />Attachment</div>
        </div>
  
        <div className={`flex item-start items-center flex-row w-166 h-32 bg-gray-50 rounded-2xl relative mt-4 ml-10`}>
            <div className={`flex h-32 w-30`}>
                <img src={temp_img_address} className={`h-32 w-30`}/>
            </div>
            <div className={`flex flex-col ml-5 w-auto h-auto gap-3`}>
                <div className={`text-xl font-bold`}>CarPlay_screen_01.jpg</div>
                <div className={`text-xs text-gray-100`}>Added at {FileAddedTime}</div>
            </div>
            <div className={`flex flex-row absolute right-5 items-center`}>
                <img src={waste_icon} className={`flex w-5 h-5`} />
            </div>
        
        </div>
    </div>
    );
  }

export { UploadedCard };


interface CommentboxProps {
    TotalComment?: number;
    Name?: string;
    Avator?: string;
    Comments?: string;
    CommentDate: string; 
  
  }
  
  
  const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
  const comment_icon = "https://static.thenounproject.com/png/62334-200.png"
  const waste_icon = "https://freesvg.org/img/trash.png"

  const CommentBox = ({Name, Avator, Comments, CommentDate, TotalComment}: CommentboxProps) => {
    return(
    <div className={`flex flex-col w-176 h-44`}> 
        <div className={`flex flex-row w-176 h-auto`}> 
            <div className={`flex`}><img src={comment_icon} className={`w-10 h-10 mr-3`}></img></div>
            <div className={`flex font-bold text-2xl items-center`}>Comment({TotalComment})</div>
        </div>

        <div className={`flex item-start flex-row w-176 h-32 pl-5 pt-5 bg-gray-50 mt-4 rounded-2xl relative`}>
            <div className={`flex w-20`}>
                <img src={img_address} className={`w-10 h-10 gap-5 rounded-full`}/>
            </div>
            <div className={`flex flex-col w-auto h-auto gap-3`}>
                <div className={`text-sm font-bold`}>Linda Hsu</div>
                <div className={`text-xs text-gray-100`}>Can you send me the preview image of task management projec?</div>
                <div className={`text-xs text-gray-100 pt-3`}>Reply</div>
            </div>
            <div className={`flex flex-row absolute right-5`}>
                <div className={`flex pr-2 text-xs text-gray-100`}>{CommentDate}</div>
                <img src={waste_icon} className={`flex w-5 h-5`} />
            </div>
        
        </div>
    </div>
    );
  };
  
  export { CommentBox };
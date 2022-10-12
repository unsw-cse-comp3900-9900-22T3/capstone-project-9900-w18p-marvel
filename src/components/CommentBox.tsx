interface CommentboxProps {
    TotalComment: number;
    Name: string;
    CommenterAvator: string;
    Comments: string;
    CommentDate: string; 
  
  }
  
  
  const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

  const waste_icon = "https://freesvg.org/img/trash.png"

  const CommentBox = ({Name, CommenterAvator, Comments, CommentDate, TotalComment}: CommentboxProps) => {
    return(
    <div className={`flex flex-col w-176 h-auto mb-2`}> 
        

        <div className={`flex item-start flex-row w-176 h-32 pl-5 pt-5 bg-gray-50 rounded-2xl relative`}>
            <div className={`flex w-20`}>
                <img src={CommenterAvator} className={`w-10 h-10 gap-5 rounded-full`}/>
            </div>
            <div className={`flex flex-col w-auto h-auto gap-3`}>
                <div className={`text-sm font-bold text-lg`}>{Name}</div>
                <div className={`text-xs text-gray-100`}>{Comments}</div>
                <div className={`text-xs text-gray-100 pt-1`}>Reply</div>
            </div>
            <div className={`flex flex-row absolute right-5 items-center`}>
                <div className={`flex pr-2 text-xs text-gray-100`}>{CommentDate}</div>
                <img src={waste_icon} className={`flex w-5 h-5`} />
            </div>
        
        </div>
    </div>
    );
  };
  
  export { CommentBox };
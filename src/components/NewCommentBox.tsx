interface NewCommentBoxProps {
    Avator?: string;

  }
  
  
  const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

  const NewCommentBox = ({Avator}: NewCommentBoxProps) => {
    return(
    <div className={`flex flex-col w-176 h-auto mb-5`}> 

        <div className={`flex item-start flex-row w-176 h-20 bg-gray-50 items-center rounded-2xl relative`}>
            <div className={`flex w-20`}>
                <img src={img_address} className={`ml-5 w-10 h-10 rounded-full`}/>
            </div>

                <input className={`placeholder:italic placeholder:text-slate-400 w-135 block bg-white h-10 border border-slate-200 rounded-sx py-2 pl-4 pr-3 focus:outline-none focus:border-sky-200 focus:ring-sky-500 focus:ring-1 sm:text-sm" `} placeholder="Write a Comment!..." type="text" name="Comments"/>
            <div className={`flex flex-row absolute right-5`}>
                <div className={`flex w-5 h-5`}>icon</div>
            </div>
        
        </div>
    </div>
    );
  };
  
  export { NewCommentBox };


const comment_icon = "https://static.thenounproject.com/png/62334-200.png"

interface TotalCommentItemProps {
    TotalComment: string;
  }
  
  const TotalCommentItem = ({}: TotalCommentItemProps) => {
    const TotalComment= '2'
    return (
        
<div className={`flex flex-row w-190`}> 
<div className={`flex`}><img src={comment_icon} className={`w-12 h-12 mr-3`}></img></div>
<div className={`flex font-bold text-2xl items-center`}>
  Comment(
    {TotalComment}
    )</div>
</div>

    );
  };
  
  export { TotalCommentItem };
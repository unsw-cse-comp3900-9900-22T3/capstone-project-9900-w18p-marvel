
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
const comment_icon = "https://static.thenounproject.com/png/62334-200.png"

interface TotalCommentItemProps {
    TotalComment: string;
}

const TotalCommentItem = ({ TotalComment }: TotalCommentItemProps) => {

    return (

        <div className={`flex flex-row w-full gap-4 pl-2`}>
            <div className={`flex font-bold text-lg text-zinc-600 items-center`}>
                <QuestionAnswerOutlinedIcon fontSize="large" />
            </div>
            <div className={`flex font-bold text-lg text-zinc-600 items-center`}>
                Comment(
                {TotalComment}
                )</div>
        </div>

    );
};

export { TotalCommentItem };
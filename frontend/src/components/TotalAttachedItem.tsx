
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
const comment_icon = "https://static.thenounproject.com/png/62334-200.png"

interface TotalAttachedItemProps {
    TotalAttached: string;
}

const TotalAttachedItem = ({ TotalAttached }: TotalAttachedItemProps) => {

    return (

        <div className={`flex flex-row w-full gap-4 pl-2`}>
            <div className={`flex font-bold text-lg text-zinc-600 items-center`}>
                <AttachFileOutlinedIcon fontSize="large" />
            </div>
            <div className={`flex font-bold text-lg text-zinc-600 items-center`}>
                Attachment(
                {TotalAttached}
                )</div>
        </div>

    );
};

export { TotalAttachedItem };
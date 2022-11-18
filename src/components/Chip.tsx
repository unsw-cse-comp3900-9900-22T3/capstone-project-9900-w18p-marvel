import AttachFile from "@mui/icons-material/AttachFile"

interface Props{
    icon?:JSX.Element
    label:string
    theme?:Theme
}

export type Theme = "default"|"warning"|"error"|"success"

const themeMapping = new Map<Theme,string>([
    ["default","text-gray-100 bg-gray-10"],
    ["error","text-red-100 bg-red-20"],
    ["warning","text-yellow-100 bg-yellow-10"],
])

export const Chip = ({icon,label,theme="default"}:Props)=>{
    return (
      <div
        className={`rounded-lg flex flex-row gap-1 items-center ${themeMapping.get(
          theme
        )} px-2 py-1`}
      >
        {icon && icon}
        {label && (
          <div className="text-inherit font-medium text-sm leading-5">{label}</div>
        )}
      </div>
    );
}
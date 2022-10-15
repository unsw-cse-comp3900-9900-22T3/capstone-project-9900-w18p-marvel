import defaultSrc from "/default-portrait.png"

type Size = 
| 'xs'
| 'sm'
| 'md'
| 'lg'
| 'xl'

type Rounded = 
| 'sm'
| 'full'

interface Props{
    size:Size
    rounded:Rounded
    src:string
    onClick?:()=>void
}

const sizeMapping = new Map<Size,string>(
    [
        ['xs','w-4 h-4'],
        ['sm','w-6 h-6'],
        ['md','w-8 h-8'],
        ['lg','w-10 h-10'],
        ['xl','w-14 h-14'],
    ]
)

const roundedMapping = new Map<Rounded,string>(
    [
        ['sm','rounded-2xl'],
        ['full','rounded-full'],
    ]
)

const hover = ""

export const Avatar = ({ size, rounded, src, onClick }: Props) => {
  return (
    <div className="select-none">
      <img
        src={src === "" ? defaultSrc : src}
        className={`transition ${sizeMapping.get(size)} ${roundedMapping.get(
          rounded
        )} select-none cursor-pointer hover:brightness-50`}
        onClick={()=>{
            onClick?.()
        }}
      />
    </div>
  );
};
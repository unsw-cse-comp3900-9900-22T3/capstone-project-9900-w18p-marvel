type Size = 
| 'sm'
| 'md'
| 'lg'

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
        ['sm','w-6 h-6'],
        ['md','w-8 h-8'],
        ['lg','w-14 h-14'],
    ]
)

const roundedMapping = new Map<Rounded,string>(
    [
        ['sm','rounded-2xl'],
        ['full','rounded-full'],
    ]
)

export const AAvatar = ({size,rounded,src,onClick}:Props)=>{
    return (
        <div className="relative">
            <img src={src} className={`${sizeMapping.get(size)} ${roundedMapping.get(rounded)} select-none`}/>
            <input className={`cursor-pointer ${sizeMapping.get(size)} absolute top-0 left-0 opacity-0`} type={"file"} onChange={(e)=>{console.log(e)}}/>
        </div>
    )
}
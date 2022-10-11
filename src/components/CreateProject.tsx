import { Button } from "./Button"

interface Props{
    src:string
    name:string
}

export const CreateProject = ({src,name}:Props)=>{
    
    const create = (name:string,id:string)=>{
        console.log('传的数据',name, id)
    }
    return (
        <div onClick={()=>{create(name,'xx')}} className="flex flex-row justify-center items-center" style={{width:'260px',height:'304px',borderRadius:'16px',backgroundColor:'white',display:'grid',flexDirection:'column'}}>
            <div className="flex flex-row justify-center items-center">
            
            <img src={src} style={{borderRadius:'16px',width:'228px',height:'160px', display:'flex'}}/>
            </div>
            <div className="bg-white-100 p-4" style={{whiteSpace:'normal',width:'233px',height:'44px',borderRadius:'16px',backgroundColor:'#ffffff',display:'flex',flexDirection:'column'}}>
                {name}
            </div>
            
        </div>
    )
}
import { Button } from "./Button"

interface Props{
    src:string
    name:string
}

export const CreateProject2 = ({src,name}:Props)=>{

    const create2 = (name:string,id:string)=>{
        console.log('创建表单传的数据',name, id)
    }
    
    return (
        <div style={{width:'265px',height:'398px',borderRadius:'24px',backgroundColor:'yellow',display:'flex',flexDirection:'column'}}>
            <img src={src} style={{borderRadius:'24px 24px 0px 0px',width:'full',height:'160px'}}/>
            <div className="bg-white-100 p-4" style={{whiteSpace:'normal',width:'217px',height:'44px',backgroundColor:'#ffffff'}}>
                {name}
            </div>
            <Button theme={"blue"} size={"hug"} label={"Create Project"} onClick={()=>{create2('aaaaa','bbbbb')}} />
        </div>
    )
}
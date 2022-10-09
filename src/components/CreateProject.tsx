interface Props{
    src:string
    name:string
}

export const CreateProject = ({src,name}:Props)=>{
    
    return (
        <div className="bg-white-100 p-4" style={{width:'260px',height:'304px',borderRadius:'16px',backgroundColor:'#ffffff',display:'flex',flexDirection:'column'}}>
            <img src={src}/>
            {name}
        </div>
    )
}
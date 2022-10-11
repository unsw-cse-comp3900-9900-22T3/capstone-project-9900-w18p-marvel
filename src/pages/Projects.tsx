import { CreateProject } from "../components/CreateProject"

interface ProjectProps {}

const data=[
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()},
  {image: '', name:123, time:new Date()}
]


export const Project = ({}: ProjectProps) => {
  return (
    <>
      <div style={{fontFamily: 'DM Sans',fontStyle: 'normal',fontWeight: '700',fontSize: '12px',lineHeight: '20px',height: '20px',padding:"20px"}}>My Project</div>
      <div className='grid grid-flow-col auto-cols-max' style={{padding:'8px'}}>
      {data.map((item: any)=>(
        <CreateProject src={item.image} name={item.name}/>
      ))}
        
      </div>
      
      
    </>
  );
};

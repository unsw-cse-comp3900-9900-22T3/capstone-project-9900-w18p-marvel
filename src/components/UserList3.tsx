import { Notification } from "./Notification"
import { Notification2 } from "./Notification2"

export const UserList3 = ()=>{
    const data = [
        {src:'',name:'11',description:'@11'},
        {src:'',name:'22',description:'@22'},
    ]

    const data2 = [
        {src:'',name:'33',description:'@33'},
    ]

    
    return (
      <div className="flex flex-col gap-0 w-[480px]">
        <div className="h-20 w-full pl-6 pt-7 text-sm font-bold">
            Notifications
        </div>
        <div className="h-0 w-full border-t border-gray-100"></div>
        <div className="w-full flex flex-col pt-7 pb-3 pl-6 pr-6 gap-3">
          {data.map((item) => (
            <Notification
              src={item.src}
              name={item.name}
              description={item.description}
            ></Notification>
          ))}
        </div>
        <div className="w-full flex flex-col pl-6 pr-6 gap-3">
          {data2.map((item) => (
            <Notification2
              src={item.src}
              name={item.name}
              description={item.description}
            ></Notification2>
          ))}
        </div>
      </div>
    );
}
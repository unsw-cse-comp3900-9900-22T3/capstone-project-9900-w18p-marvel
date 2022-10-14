import { Avatar, AvatarGroup, Chip, Stack } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { faker } from "@faker-js/faker";

interface TaskCardProps {
  id:string
  title: string;
  description: string;
  dueDate: Date;
  onClick?:(id:string)=>void
}
const image = ""
const TaskCard = ({id,title,description,dueDate,onClick}: TaskCardProps) => {
  return (
    <div
      className="transition-all w-80 h-fit bg-white-100 flex flex-col p-6 gap-4 rounded-2xl hover:scale-95"
      onClick={() => {
        onClick?.(id);
      }}
    >
      <div className="h-2 w-8 bg-blue-100 rounded"></div>
      <div className="font-bold text-base">{title}</div>
      <div className="font-semibold text-xs">{description}</div>
      <div className="h-7 w-fit flex flex-row gap-4">
        <Chip
          sx={{ borderRadius: 6 }}
          icon={<AttachFileIcon />}
          label="5"
          color="default"
          variant="outlined"
        />
        <Chip icon={<AccessTimeIcon />} label="10 days left" color="primary" />
      </div>
      <div className="h-20 w-50 bg-yellow-100">
        <img src={image} />
      </div>
      <div className="h-fit w-fit">
        <AvatarGroup sx={{ height: 24 }}>
          <Avatar sx={{ width: 24, height: 24 }} src={faker.image.avatar()} />
          <Avatar sx={{ width: 24, height: 24 }} src={faker.image.avatar()} />
          <Avatar sx={{ width: 24, height: 24 }} src={faker.image.avatar()} />
          <Avatar sx={{ width: 24, height: 24 }} src={faker.image.avatar()} />
        </AvatarGroup>
      </div>
    </div>
  );
};

export { TaskCard };

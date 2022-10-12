

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: Date;
}

const TaskCard = ({title,description,dueDate}: TaskCardProps) => {
  return (
    <div className="w-80 h-fit bg-white-100 flex flex-col p-6 gap-4 rounded-2xl">
      <div className="h-2 w-8 bg-blue-100 rounded"></div>
      <div className="font-bold text-base">{title}</div>
      <div className="font-semibold text-xs">{description}</div>
      <div className="h-7 w-8 bg-yellow-100"></div>
      <div className="h-4 w-full bg-yellow-100"></div>
      <div className="h-8 w-40 bg-yellow-100"></div>
    </div>
  );
};

export { TaskCard };

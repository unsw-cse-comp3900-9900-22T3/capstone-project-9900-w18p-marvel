interface TaskCardProps {
  title: string;
  description: string;
  dueDate: Date;
}

const TaskCard = ({}: TaskCardProps) => {
  return <div className="text-yellow-500">Write ur component here</div>;
};

export { TaskCard };

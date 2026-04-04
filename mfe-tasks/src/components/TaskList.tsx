import { useTasks } from "../utils/useTasks";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {
  const { handleDelete, handleToggleStatus, tasks, processingTaskId } =
    useTasks();

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          isProcessing={processingTaskId === task._id}
        />
      ))}
    </div>
  );
};

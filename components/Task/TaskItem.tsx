import { Edit } from "@/icons/Edit";
import styles from "../Task/TaskItem.module.scss";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import { TaskCompleted } from "@/icons/Completed";
import { Pending } from "@/icons/Pending";
import { Delete } from "@/icons/Delete";
import { useModal } from "@/context/ModalContext";
import Modal from "../UI/Modal";
import UpdateTaskForm from "../UpdateTaskFrom";
import { Chevron } from "@/icons/Chevron";

export interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3;
  status: "completed" | "pending";
  createdAt: string;
  onEdit?: (initFormData: any) => void;
  onDelete?: (id: string) => void;
  onComplete?: (id: string, status: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  description,
  priority,
  status,
  createdAt,
  onEdit,
  onDelete,
  onComplete,
}) => {
  return (
    <div
      className={`${styles.taskCard} ${styles[priority]} ${
        status === "completed" ? styles.completed : ""
      }`}
    >
      <header className={styles.taskHeader}>
        <h2 className={styles.taskTitle}>{title}</h2>
        <time dateTime={createdAt} className={styles.taskDate}>
          {new Date(createdAt).toLocaleString("en-In")}
        </time>
      </header>

      <div className={styles.taskContent}>
        <p>{description}</p>
      </div>

      <footer className={styles.taskFooter}>
        <Badge
          text={status}
          variant={status === "completed" ? "success" : "warning"}
        />
        <Chevron
          height={24}
          width={24}
          color={priority === 1 ? "red" : priority === 2 ? "orange" : "green"}
          className="mr-auto"
        />
        <div className=" flex gap-2">
          {onComplete && (
            <button onClick={() => onComplete(id, status)}>
              {status === "pending" ? (
                <TaskCompleted height={24} width={24} />
              ) : (
                <Pending height={24} width={24} />
              )}
            </button>
          )}
          {onEdit && (
            <button
              onClick={() =>
                onEdit({ id, title, description, priority, status })
              }
            >
              <Edit height={24} width={24} />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(id)}>
              <Delete height={24} width={24} color="#c82333" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default TaskItem;

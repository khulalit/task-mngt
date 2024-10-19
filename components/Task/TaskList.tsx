import { useModal } from "@/context/ModalContext";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.scss";
import Modal from "../UI/Modal";
import UpdateTaskForm from "../UpdateTaskFrom";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TaskList = ({ tasks }: { tasks: any }) => {
  const { openModals, openModal, closeModal } = useModal();
  const [editData, setEditData] = useState<any>({});
  const router = useRouter();

  const handleEditTask = (initFormData: any) => {
    setEditData(initFormData);
    openModal("UPDATE_FORM");
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/task`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: status === "completed" ? "pending" : "completed",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Task status updated:", data.message);
      alert("Task status updated: " + data.message);
      router.refresh();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteChange = async (id: number) => {
    try {
      const response = await fetch(`/api/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting task:", errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Task deleted:", data.message);
      alert("Task deleted: " + data.message);
      router.refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.taskList}>
      {openModals.includes("UPDATE_FORM") && (
        <Modal
          isOpen={openModals.includes("UPDATE_FORM")}
          onClose={() => {
            closeModal("UPDATE_FORM");
            setEditData({});
          }}
          title="Add Task"
        >
          <UpdateTaskForm
            onCancel={() => {
              closeModal("UPDATE_FORM");
              setEditData({});
            }}
            onSubmit={() => {
              closeModal("UPDATE_FORM");
              setEditData({});
            }}
            initFormData={editData}
          />
        </Modal>
      )}
      {tasks.map((task: any) => (
        <div
          className="basis-[300px] shrink-0 items-stretch flex-1"
          key={task.id}
        >
          <TaskItem
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            status={task.status}
            createdAt={task.createdAt}
            onEdit={handleEditTask}
            onDelete={(id) => handleDeleteChange(+id)}
            onComplete={(id, status) => handleStatusChange(+id, status)}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;

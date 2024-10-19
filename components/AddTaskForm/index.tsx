import { useState } from "react";
import styles from "./styles.module.scss";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";

interface FormDataType {
  title: string;
  description: string;
  priority: 1 | 2 | 3;
}

const AddTaskForm = ({
  onSubmit,
}: {
  onSubmit: () => void;
  onCancel?: () => void;
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    priority: 2,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetch(`api/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          priority: Number(formData.priority),
          status: "pending",
        }),
      });
      onSubmit();
      router.refresh();
    } catch (error) {
      alert("Failed to add task");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return "Loading....";

  return (
    <form className={styles.form} onSubmit={handleSubmit} key="addform">
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev: FormDataType) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFormData((prev: FormDataType) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="priority">Priority:</label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData((prev: FormDataType) => ({
              ...prev,
              priority: 2,
            }));
          }}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
      </div>
      <Button type="submit" variant="primary" className=" w-fit">
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;

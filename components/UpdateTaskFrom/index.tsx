import { useReducer, useState } from "react";
import styles from "./styles.module.scss";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

console.log(BASE_URL);

interface FormDataType {
  title: string;
  description: string;
  priority: number;
  status: string;
}

const UpdateTaskForm = ({
  initFormData,
  onSubmit,
  onCancel,
}: {
  initFormData: any;
  onSubmit: () => void;
  onCancel?: () => void;
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    title: initFormData?.title,
    description: initFormData?.description,
    priority: initFormData?.priority,
    status: initFormData?.status,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await fetch(`/api/task`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          priority: formData.priority,
          status: "pending",
          id: initFormData.id,
        }),
      });

      onSubmit();
      router.refresh();
    } catch (error) {
      alert("Failed to update task");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return "Loading....";

  return (
    <form className={styles.form} onSubmit={handleSubmit} key="updateFORM">
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
              priority: +e.target.value,
            }));
          }}
        >
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
      </div>
      <Button type="submit" variant="secondary" className=" w-fit">
        Update Task
      </Button>
    </form>
  );
};

export default UpdateTaskForm;

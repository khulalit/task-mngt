import styles from "./styles.module.scss";
import SearchBar from "../SearchBar.tsx";
import Button from "../UI/Button";
import { AddTask } from "@/icons/AddTask";
import Modal from "../UI/Modal";
import { useModal } from "@/context/ModalContext";
import AddTaskForm from "../AddTaskForm";

export default function Header({ setFilterTerm }: any) {
  const { openModals, openModal, closeModal } = useModal();
  return (
    <header className={styles.header}>
      <SearchBar setFilterTerm={setFilterTerm} />
      <Button
        variant="outlinePrimary"
        onClick={() => {
          openModal("ADD_FORM");
        }}
      >
        <AddTask /> Add a task
      </Button>
      {openModals.includes("ADD_FORM") && (
        <Modal
          isOpen={openModals.includes("ADD_FORM")}
          onClose={() => closeModal("ADD_FORM")}
          title="Add Task"
        >
          <AddTaskForm
            onCancel={() => closeModal("ADD_FORM")}
            onSubmit={() => closeModal("ADD_FORM")}
          />
        </Modal>
      )}
    </header>
  );
}

import React, { createContext, useContext, useState } from "react";

// Define a type for modal identifiers
type ModalId = string;

interface ModalContextType {
  openModals: ModalId[]; // Array to store identifiers of open modals
  openModal: (id: ModalId) => void; // Function to open a modal by its identifier
  closeModal: (id: ModalId) => void; // Function to close a modal by its identifier
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openModals, setOpenModals] = useState<ModalId[]>([]);

  const openModal = (id: ModalId) => {
    setOpenModals((prev) => [...prev, id]); // Add the modal ID to the openModals array
  };

  const closeModal = (id: ModalId) => {
    setOpenModals((prev) => prev.filter((modalId) => modalId !== id)); // Remove the modal ID from the openModals array
  };

  return (
    <ModalContext.Provider value={{ openModals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

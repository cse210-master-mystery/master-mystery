import React, { createContext, useContext, useState } from "react";
import Button from "./Button";
import Modal from "../modal/Modal";

export const MenuModalContext = createContext<{ closeModal: () => void } | null>(null);

export function useMenuModalClose() {
  const ctx = useContext(MenuModalContext);
  return ctx?.closeModal ?? (() => {});
}

interface MenuButtonProps {
  children?: React.ReactNode;
  ariaLabel?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, ariaLabel = "Open menu" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <MenuModalContext.Provider value={{ closeModal }}>
      <Button variant="round" onClick={() => setIsOpen(true)} aria-label={ariaLabel}>
        Menu
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {children ?? <div>Menu not implemented</div>}
      </Modal>
    </MenuModalContext.Provider>
  );
};

export default MenuButton;

import React, { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "../modal/Modal";
import { MenuModalContext } from "./MenuModalContext";

interface MenuButtonProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  /** Notify parent when the menu modal opens or closes. */
  onOpenChange?: (open: boolean) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  ariaLabel = "Open menu",
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <MenuModalContext.Provider value={{ closeModal }}>
      <Button variant="round" onClick={() => setIsOpen(true)} aria-label={ariaLabel}>
        Menu
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} showCloseButton={false}>
        {children ?? <div>Menu not implemented</div>}
      </Modal>
    </MenuModalContext.Provider>
  );
};

export default MenuButton;

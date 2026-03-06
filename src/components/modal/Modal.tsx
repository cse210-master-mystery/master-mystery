import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** When false, the top-right × close button is hidden. Default true. */
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

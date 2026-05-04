import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const modalRoot = document.getElementById("modal-root") as HTMLElement;

const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;

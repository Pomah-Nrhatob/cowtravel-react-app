import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createContainer, Portal } from "../Portal/Portal";
import styles from "./modal.module.css";

const MODAL_CONTAINER_ID = "modal-container-id";

type Props = { onClose?: () => void; title: string; children: ReactNode };

export const Modal: FC<Props> = ({ onClose, title, children }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={styles.wrap} ref={rootRef}>
        <div className={styles.content}>
          <button
            className={styles.closeButton}
            type="button"
            onClick={handleClose}
          >
            X
          </button>
          <p className={styles.title}>{title}</p>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

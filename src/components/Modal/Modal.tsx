import React, {ReactNode, useRef} from "react";
import styles from "./Modal.module.scss";

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

export const Modal = ({isOpen, onClose, children}: IModalProps) => {
    const outsideRef = useRef(null);
    const classes = `${styles.modal} ${isOpen ? styles['modal-open'] : ''}`

    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    };

    return (
        <div className={classes}>
            <div
                ref={outsideRef}
                className={styles['modal__overlay']}
                onClick={handleCloseOnOverlay}
            />
            <div className={styles['modal__box']}>
                <button className={styles['modal__close']} onClick={onClose}>
                    &#10006;
                </button>
                <div className={styles['modal__content']}>
                    {children}
                </div>
            </div>
        </div>
    )
};

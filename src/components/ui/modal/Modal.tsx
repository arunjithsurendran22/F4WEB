import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "../Buttons/CloseButton";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children?: ReactNode;
  showCloseButton?: boolean; // New prop to control the visibility of the close button
  showCloseBtnRounded?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  showCloseBtnRounded = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      if (typeof window !== 'undefined') document.addEventListener("keydown", handleKeyDown);
    } else {
      if (typeof window !== 'undefined') document.removeEventListener("keydown", handleKeyDown);
    }

    if (typeof window !== 'undefined'){
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
    
  }, [isOpen, onClose]);

  // Change backdrop to transparent black instead of blur
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Black transparent background
      transition: { duration: 0.1 },
    },
  };

  const modalVariants = {
    hidden: { scale: 0.75, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 20,
      },
    },
    exit: {
      scale: 0.75,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 20,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 w-full h-screen "
          aria-hidden={!isOpen}
          role="dialog"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with transparent black background */}
          <motion.div
            className="absolute inset-0"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          ></motion.div>

          {/* Modal content */}
          <motion.div
            className="relative bg-white rounded-xl border border-gray-200 shadow-md shadow-black"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="flex justify-between items-center ">
              <h2
                id="modal-title"
                className="text-lg font-semibold text-gray-800"
              >
                {title}
              </h2>
              {showCloseButton && (
                <button
                  className="p-2 text-2xl text-gray-500 hover:text-gray-300"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              )}
            </div>
            {showCloseBtnRounded && (
              <div className="ml-5 mt-5">
                <CloseButton onClick={onClose} />
              </div>
            )}

            <div className="overflow-y-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

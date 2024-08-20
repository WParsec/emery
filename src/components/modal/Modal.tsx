"use client";

import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  // Handle escape key to close modal and prevent background scrolling
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Allow background scrolling when the modal is closed
      document.body.style.overflow = "";
      document.body.style.position = "";
    }

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = ""; // Reset scrolling on unmount
      document.body.style.position = "";
    };
  }, [isOpen, onClose]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 z-50 p-4 flex justify-center items-center">
        {/* Modal Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-90"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-card-bg dark:bg-dark-gray w-full max-w-xl mx-auto rounded-lg shadow-lg transform transition-all duration-300 ease-in-out max-h-full overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center py-4 px-8">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-xl font-bold">
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
}

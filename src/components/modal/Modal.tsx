"use client";

import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group"; // Import CSSTransition for animations

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
  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 z-50 p-4">
        {/* Modal Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-card-bg dark:bg-dark-gray w-full max-w-xl mx-auto mt-24 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-300">
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

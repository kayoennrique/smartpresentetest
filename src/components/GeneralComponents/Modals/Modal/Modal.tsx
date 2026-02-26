"use client";

import { Icon } from "@iconify/react";
import { ModalProps } from "./interface";

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#F9FAFB] p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <Icon icon="ph:x" width={22} />
        </button>

        {children}
      </div>
    </div>
  );
}

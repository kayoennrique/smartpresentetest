"use client";

import { FiSearch } from "react-icons/fi";
import { SearchInputProps } from "../interfaces";

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Procure por uma palavra-chave"
        className="
          w-full
          rounded-full
          border
          border-gray-200
          bg-white
          py-3
          pl-11
          pr-4
          text-sm
          text-gray-700
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-color-red-10
        "
      />
    </div>
  );
};

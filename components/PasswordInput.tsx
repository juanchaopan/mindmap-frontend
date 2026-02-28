"use client";

import { useState } from "react";

interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
}

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? name;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="current-password"
          className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            transition-colors"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium
            text-gray-500 hover:text-gray-800 disabled:cursor-not-allowed select-none"
          tabIndex={-1}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

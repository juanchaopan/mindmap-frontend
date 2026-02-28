"use client";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export default function TextInput({
  label,
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled,
  autoComplete,
}: TextInputProps) {
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
      <input
        id={inputId}
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
          transition-colors"
      />
    </div>
  );
}

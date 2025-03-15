import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ResetButton from "./ResetButton";

interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "select" | "checkbox" | "radio";
  value: string | boolean;
  options?: { value: string; label: string }[]; // For select/radio
  onChange: (value: string | boolean) => void;
  placeholder?: string;
  onReset?: () => void;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  options,
  onChange,
  placeholder,
  onReset,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full max-w-md ${className}`}>
      <label className="text-primary-text font-medium">{label}</label>

      {type === "text" && (
        <div className="relative w-full group">
          <input
            type="text"
            name={name}
            value={value as string}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent placeholder:text-[#333] dark:placeholder:text-white text-primary-text text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow pr-8"
          />

          {onReset && value && <ResetButton onReset={onReset} />}
        </div>
      )}

      {type === "select" && options && (
        <div className="relative w-full group">
          <select
            name={name}
            value={
              typeof value === "string" || typeof value === "number"
                ? value
                : ""
            }
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent
            text-primary-text text-sm border border-slate-200 dark:bg-card 
            rounded-md px-3 py-2 transition duration-300 ease 
            focus:outline-none focus:border-accent 
            hover:border-accent shadow-sm focus:shadow appearance-none pr-8 cursor-pointer"
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* only visible on hover if onReset exists */}
          {onReset && value && <ResetButton onReset={onReset} />}

          {/* hidden on hover if onReset exists - always hidden on mobile if onReset exists */}
          <span
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 transition-opacity pointer-events-none
          ${
            onReset && value
              ? "opacity-0 md:opacity-100 md:group-hover:opacity-0"
              : ""
          }`}
          >
            <ChevronDownIcon className="stroke-current w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
};

export default FormField;

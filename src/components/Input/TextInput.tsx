"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef, useState } from "react";
import FormErrorHint from "../FormErrorHint";

export type TextInputType = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  error?: string;
  hint?: string;
  inputClass?: string;
  labelClass?: string;
  currency?: boolean;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependClick?: () => void;
  appendClick?: () => void;
  labelUp?: boolean;
  fullWidth?: boolean;
  size?: "small" | "normal";
  darkMode?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputType>((props, ref) => {
  const [focus, setFocus] = useState(false);

  // const { getFormattedCurrency } = useCurrencyFormatter();

  const {
    type = "text",
    inputMode = "text",
    label,
    error = "",

    disabled = false,
    placeholder,
    hint,
    currency = false,
    darkMode = true,
    value,
    id,
    name,
    className,
    inputClass,
    prepend,
    append,
    size = "normal",
    prependClick,
    appendClick,
    onChange,
    onFocus,
    onBlur,
    ...restAttr
  } = props;

  // Define the container style based on component state.
  const containerStyle = cn(
    focus
      ? `border border-neutral-300 ${
          darkMode && "dark:border-accent-700 dark:ring-accent-400"
        }`
      : `border border-neutral-200 ${darkMode && "dark:border-neutral-200 "}`,
    disabled && "cursor-not-allowed opacity-80",
    error && "border-error ring-error",
    darkMode && "dark:bg-background-dark",
    "relative border bg-white px-3 rounded-lg text-sm flex gap-2 items-center h-[50px]",
    size === "normal" ? "h-[50px]" : "h-12",
    className
  );

  // Define input styling based on props and state.
  const inputStyles = cn(
    label && "-mb-1",
    disabled && "cursor-not-allowed opacity-80",
    darkMode && "dark:placeholder:text-accent-300 dark:text-accent-50",
    "text-[16px] !leading-normal text-left bg-transparent h-full w-full caret-secondary-800 dark:caret-accent-50 text-gray-2 leading-2 focus:outline-none block appearance-none",
    ["date", "time", "datetime-local"].includes(type) && "pt-3 sm:pt-0",
    inputClass
  );

  // Handle input value changes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!currency) {
      onChange?.(e);
      return;
    }

    // For currency inputs, sanitize the value.
    let val = e.target.value.replace(/[^0-9.]/g, "");
    // Remove commas.
    val = val.split(",").join("");

    // Trigger onChange with the sanitized value.
    onChange?.({
      ...e,
      target: { ...e.target, value: val, name },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Main container for the input with optional prepend and append */}
      <div className={containerStyle}>
        {/* Prepend element with optional click handler */}
        {prepend && (
          <div
            onClick={prependClick}
            className="flex-shrink-0 text-sm flex items-center text-neutral-500"
          >
            {prepend}
          </div>
        )}

        {/* Input field with dynamic properties and event handlers */}
        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          inputMode={inputMode}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onFocus={(e) => {
            onFocus?.(e);
            setFocus(true);
          }}
          onBlur={(e) => {
            onBlur?.(e);
            setFocus(false);
          }}
          className={inputStyles}
          placeholder={placeholder}
          {...restAttr}
        />

        {/* Append element with optional click handler */}
        {append && (
          <div
            onClick={appendClick}
            className={cn(
              "flex-shrink-0 text-sm flex items-center text-gray-500 cursor-pointer",
              disabled && "pointer-events-none"
            )}
          >
            {append}
          </div>
        )}

        {["time", "datetime-local"].includes(type) && (
          <span
            className={cn(
              "bg-white w-8 absolute top-1/2 right-0 transform -translate-y-1/2 pointer-events-none",
              disabled && "pointer-events-none"
            )}
          >
            <Image
              src={
                // type == "time" ? clockIcon("#a1a1a1") : calendarIcon("#a1a1a1")
                "/"
              }
              alt={type}
              width={24}
              height={24}
              className="w-6 "
            />
          </span>
        )}
      </div>

      {/* Hint or error message below the input field */}
      <FormErrorHint error={error} hint={hint} />
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;

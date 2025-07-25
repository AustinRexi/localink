import React from "react";

interface FormErrorHintType {
  error?: string;
  hint?: string;
}

export default function FormErrorHint({ error, hint }: FormErrorHintType) {
  if (!error && !hint) return null;

  return (
    <div className="text-xs text-left mt-1 ml-1">
      {error && <span className="text-error">{error}</span>}
      {hint && !error && <span className="text-gray-2">{hint}</span>}
    </div>
  );
}

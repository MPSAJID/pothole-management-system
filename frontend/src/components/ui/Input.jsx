import React from "react";

export function Input({ type = "text", ...props }) {
  return <input type={type} className="border rounded px-2 py-1 w-full" {...props} />;
}

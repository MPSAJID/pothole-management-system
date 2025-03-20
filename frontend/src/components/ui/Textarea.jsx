import React from "react";

export function Textarea({ ...props }) {
  return <textarea className="border rounded px-2 py-1 w-full h-24" {...props} />;
}

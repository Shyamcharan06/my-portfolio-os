"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface BaseProps {
  label: string;
  id: string;
  error?: string;
}

type InputFieldProps = BaseProps & { as?: "input" } & InputHTMLAttributes<HTMLInputElement>;
type TextareaFieldProps = BaseProps & { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormField(props: InputFieldProps | TextareaFieldProps) {
  const { label, id, error, className, as, ...rest } = props;
  const describedBy = error ? `${id}-error` : undefined;
  const fieldClassName = cn(
    "w-full rounded-md border bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400",
    "focus:outline-none focus:ring-2 focus:ring-accent",
    error ? "border-red-400" : "border-zinc-300",
    className
  );

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(fieldClassName, "resize-none")}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={fieldClassName}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

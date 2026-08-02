"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { useOSStore } from "@/store/os-store";
import { profile } from "@/data/profile";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validate(values: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.length > 2000) {
    errors.message = "Keep it under 2000 characters.";
  }
  return errors;
}

export function ContactForm() {
  const notify = useOSStore((state) => state.notify);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      notify({ type: "success", title: "Message sent!", message: "Thanks for reaching out — I'll reply soon." });
    } catch {
      setStatus("error");
      notify({
        type: "error",
        title: "Couldn't send message",
        message: `Try emailing me directly at ${profile.email}.`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4" noValidate>
      <FormField
        label="Name"
        id="contact-name"
        value={values.name}
        onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
        error={errors.name}
        autoComplete="name"
      />
      <FormField
        label="Email"
        id="contact-email"
        type="email"
        value={values.email}
        onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
        error={errors.email}
        autoComplete="email"
      />
      <FormField
        as="textarea"
        label="Message"
        id="contact-message"
        rows={5}
        value={values.message}
        onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
        error={errors.message}
      />

      <Button type="submit" loading={status === "submitting"} className="self-start">
        <Send className="size-4" aria-hidden="true" />
        Send Message
      </Button>

      {status === "success" && <p className="text-sm text-emerald-600">Message sent — thanks!</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please email me directly instead.</p>
      )}
    </form>
  );
}

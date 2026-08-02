import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(1, "Message is required.").max(2000, "Message is too long."),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // TODO: send via a real email provider (e.g. Resend, EmailJS) once credentials exist.
  // The request/response contract above is already final, so wiring one up shouldn't
  // require any changes to ContactForm.tsx.
  console.log("Contact form submission:", parsed.data);

  return NextResponse.json({ ok: true });
}

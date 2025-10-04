
"use server";

import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const registrationSchema = z.object({
  registrationType: z.enum(["student", "professional", "member"]),
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(10),
  biography: z.string().max(2000).min(10),
  photo: z.string().url(),
  socials: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
});

export async function handleRegistration(data: unknown) {
  const validatedData = registrationSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data: " + validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const docData = {
      ...validatedData.data,
      createdAt: new Date(),
    };
    await addDoc(collection(db, "registrations"), docData);

    // In a real application, you might also want to:
    // - Upload the base64 photo to a file storage (like Firebase Storage) and save the URL.
    // - Send a confirmation email.

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred during database operation.",
    };
  }
}

    
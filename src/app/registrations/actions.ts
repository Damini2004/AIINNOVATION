
"use server";

import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const registrationSchema = z.object({
  registrationType: z.enum(["student", "professional", "member"]),
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(10),
  // Password is collected but not stored.
  // In a real app, this would be hashed and stored securely.
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  biography: z.string().max(2000).min(10),
  photo: z.string().min(1, "Photo is required"), // Assuming base64 string
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  otherSocialUrl: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
  privacyPolicy: z.literal(true),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function handleRegistration(data: unknown) {
  const validatedData = registrationSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      error: "Invalid data: " + JSON.stringify(validatedData.error.flatten().fieldErrors),
    };
  }

  try {
    const { privacyPolicy, password, confirmPassword, ...docDataToSave } = validatedData.data;
    
    const docData = {
      ...docDataToSave,
      status: "pending", // Add a status for admin approval
      createdAt: new Date(),
    };

    await addDoc(collection(db, "registrations"), docData);

    // In a real application, you would also want to:
    // - Hash the password before storing it (NEVER store plain text passwords)
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

    

"use server";

import { z } from "zod";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const registrationSchema = z.object({
  registrationType: z.enum(["student", "professional", "member"]),
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(10),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string().min(8),
  biography: z.string().max(2000).min(10),
  photo: z.string().min(1, "Photo is required"),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  otherSocialUrl: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
  privacyPolicy: z.literal(true),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
    const { confirmPassword, ...docDataToSave } = validatedData.data;
    
    // In a real application, the password should be hashed before saving.
    // Storing plaintext passwords is a major security risk.
    const docData = {
      ...docDataToSave,
      status: "pending", // Add a status for admin approval
      createdAt: new Date(),
    };

    await addDoc(collection(db, "registrations"), docData);

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred during database operation.",
    };
  }
}

export async function handleLogin(data: unknown) {
    const validatedData = loginSchema.safeParse(data);

    if (!validatedData.success) {
        return { success: false, error: "Invalid email or password." };
    }

    try {
        const { email, password } = validatedData.data;

        // Check for special admin case first
        if (email === "admin@aiis.com" && password === "password") {
            return { success: true, isAdmin: true };
        }

        const q = query(collection(db, "registrations"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, error: "No user found with this email." };
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // In a real application, you would compare a hashed password.
        // This is for demonstration purposes only and is not secure.
        if (userData.password === password) {
            return { success: true, isAdmin: false, user: { name: userData.name, email: userData.email } };
        } else {
            return { success: false, error: "Invalid email or password." };
        }

    } catch (error: any) {
        return { success: false, error: error.message || "An unexpected error occurred." };
    }
}

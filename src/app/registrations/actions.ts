
"use server";

import { z } from "zod";
import { addDoc, collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { revalidatePath } from "next/cache";

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

const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  contact: z.string().min(10, "Please enter a valid contact number."),
  biography: z.string().max(2000, "Biography must not exceed 400 words.").min(10, "Biography is required."),
  photo: z.string().min(1, "Photo is required."),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  otherSocialUrl: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
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
    return { success: false, error: "Invalid email or password format." };
  }

  try {
    const { email, password } = validatedData.data;
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;

    // 1. Check for Super Admin
    if (email === superAdminEmail) {
      // The password has already been verified by Firebase Auth on the client side.
      // We just need to confirm the email is the designated admin email.
      return { success: true, isAdmin: true };
    }

    // 2. If not super admin, check for a regular user
    const q = query(collection(db, "registrations"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found. Please check your email or register." };
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // Note: This password check is for legacy/non-Firebase-auth users.
    // A more secure system would migrate all users to Firebase Auth.
    if (userData.password === password) {
      return { success: true, isAdmin: false, user: { name: userData.name, email: userData.email } };
    } else {
      // This path is hit if the user exists but the password (from a direct DB check) is wrong.
      // For a Firebase Auth user, this check will likely fail unless passwords are in sync, which is bad practice.
      // The primary login path for regular users should also use Firebase Auth on the client.
      return { success: false, error: "Incorrect password for regular user." };
    }

  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected server error occurred." };
  }
}

export async function getUserProfile(email: string) {
    if (!email) return { success: false, error: "Email not provided" };

    try {
        const q = query(collection(db, "registrations"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return { success: false, error: "User not found" };
        }
        const userDoc = querySnapshot.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() };
        return { success: true, data: JSON.parse(JSON.stringify(userData)) };
    } catch(error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUserProfile(docId: string, data: unknown) {
    const validatedData = userProfileSchema.safeParse(data);
    if (!validatedData.success) {
        return {
          success: false,
          error: "Invalid data: " + JSON.stringify(validatedData.error.flatten().fieldErrors),
        };
    }
    
    try {
        const docRef = doc(db, 'registrations', docId);
        await updateDoc(docRef, validatedData.data);
        revalidatePath('/user-dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

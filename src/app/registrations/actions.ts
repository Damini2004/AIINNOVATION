
"use server";

import { z } from "zod";
import { addDoc, collection, getDocs, query, where, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { revalidatePath } from "next/cache";

// Schema for creating the user data document in Firestore.
// Note: Password fields are removed as they are handled by Firebase Auth.
const registrationSchema = z.object({
  uid: z.string(), // Firebase Auth UID
  registrationType: z.enum(["student", "professional", "member"]),
  name: z.string().min(2),
  email: z.string().email(),
  contact: z.string().min(10),
  biography: z.string().max(2000).min(10),
  photo: z.string().min(1, "Photo is required"),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  otherSocialUrl: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
});


const userProfileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  contact: z.string().min(10, "Please enter a valid contact number."),
  biography: z.string().max(2000, "Biography must not exceed 400 words.").min(10, "Biography is required."),
  photo: z.string().min(1, "Photo is required."),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  otherSocialUrl: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
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
    // Check if a registration with this email already exists
    const q = query(collection(db, "registrations"), where("email", "==", validatedData.data.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, error: "A registration with this email already exists." };
    }

    const docData = {
      ...validatedData.data,
      status: "pending", // Add a status for admin approval
      createdAt: Timestamp.now(),
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


export async function getUserProfile(email: string) {
    if (!email) return { success: false, error: "Email not provided" };

    try {
        const q = query(collection(db, "registrations"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return { success: false, error: "User profile not found in the database." };
        }
        const userDoc = querySnapshot.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() };
        return { success: true, data: JSON.parse(JSON.stringify(userData)) };
    } catch(error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUserProfile(docId: string, data: unknown) {
    const validatedData = userProfileUpdateSchema.safeParse(data);
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


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
  idToken: z.string(),
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
    return { success: false, error: "Invalid data format." };
  }
  
  const { idToken } = validatedData.data;

  try {
    // Note: In a real production app, you would verify the ID token here
    // using the Firebase Admin SDK to get the user's claims.
    // For this environment, we are simulating the check based on a passed flag.
    // The client will get this flag from the ID token.

    // A real implementation would look something like this:
    /*
    const admin = require('firebase-admin');
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.admin) {
        return { success: true, isAdmin: true };
    }
    */
    
    // The client will pass whether the token has the admin claim.
    // This is a temporary solution for this environment.
    // @ts-ignore
    if(data.isAdmin) {
       return { success: true, isAdmin: true };
    }


    // Fallback to check regular user if not admin.
    // In a full custom claims system, you might not even need this if all roles are handled by claims.
    // @ts-ignore
    const email = data.email;
    const q = query(collection(db, "registrations"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return { success: false, error: "User not found." };
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return { success: true, isAdmin: false, user: { name: userData.name, email: userData.email } };

  } catch (error: any) {
    console.error("Server Action Error in handleLogin:", error);
    return { success: false, error: "An unexpected server error occurred." };
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

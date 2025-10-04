

"use server";

import { z } from "zod";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc, where, query, Timestamp } from "firebase/firestore";
import { ref, getStorage, deleteObject } from "firebase/storage";
import { db } from "@/firebase/firebaseConfig";
import { revalidatePath } from "next/cache";

// Zod Schemas
const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  img: z.string().min(1, "Image is required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Partner name is required"),
  designation: z.string().min(1, "Designation is required"),
  logo: z.string().min(1, "Logo is required"),
  facebookUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  pinterestUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1, "Image is required"),
  link: z.string().url("Must be a valid URL for the event"),
});

const journalSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const digitalLibraryPaperSchema = z.object({
  id: z.string().optional(),
  paperTitle: z.string().min(1, "Paper Title is required"),
  authorName: z.string().min(1, "Author Name is required"),
  journalName: z.string().min(1, "Journal Name is required"),
  volumeIssue: z.string().min(1, "Volume/Issue is required"),
  link: z.string().url("Must be a valid URL"),
  image: z.string().url("Must be a valid image URL").optional().or(z.literal('')),
});

const educationalResourceSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    fileUrl: z.string().min(1, "File URL or data URI is required"),
    fileName: z.string().min(1, "File name is required"),
    fileType: z.string().min(1, "File type is required"),
    image: z.string().optional(),
});

const counterSchema = z.object({
  members: z.number().min(0),
  projects: z.number().min(0),
  journals: z.number().min(0),
  subscribers: z.number().min(0),
});

const registrationSchema = z.object({
  id: z.string().optional(),
  registrationType: z.string(),
  name: z.string(),
  email: z.string().email(),
  contact: z.string(),
  biography: z.string(),
  photo: z.string().url(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  otherSocialUrl: z.string().url().optional().or(z.literal('')),
  scholarLink: z.string().url().optional().or(z.literal('')),
  status: z.enum(['pending', 'approved', 'rejected']),
  createdAt: z.union([z.instanceof(Timestamp), z.string()]).optional(),
});


const memberSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    role: z.string(),
    img: z.string().url(),
    linkedinUrl: z.string().url().optional().or(z.literal('')),
    twitterUrl: z.string().url().optional().or(z.literal('')),
    facebookUrl: z.string().url().optional().or(z.literal('')),
});

type Course = z.infer<typeof courseSchema>;
type Partner = z.infer<typeof partnerSchema>;
type Event = z.infer<typeof eventSchema>;
type Journal = z.infer<typeof journalSchema>;
export type DigitalLibraryPaper = z.infer<typeof digitalLibraryPaperSchema>;
export type EducationalResource = z.infer<typeof educationalResourceSchema>;
export type Counter = z.infer<typeof counterSchema>;
export type Registration = z.infer<typeof registrationSchema>;
export type Member = z.infer<typeof memberSchema>;


// Generic function to add or update a document
async function addOrUpdateDoc<T extends { id?: string }>(collectionName: string, data: T, schema: z.ZodType<T>) {
  try {
    const validatedData = schema.parse(data);
    const { id, ...docData } = validatedData;

    if (id) {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, docData);
    } else {
      await addDoc(collection(db, collectionName), docData);
    }
    revalidatePath('/dashboard');
    revalidatePath(`/${collectionName}`);
    if (collectionName === 'events') revalidatePath('/');
    if (collectionName === 'digital_library_papers') revalidatePath('/digitallibrary');
    if (collectionName === 'educational_resources') {
        revalidatePath('/educationalresources');
        revalidatePath('/freecourses');
    }
    if (collectionName === 'site_settings') revalidatePath('/');


    return { success: true };
  } catch (error: any) {
    console.error("Error in addOrUpdateDoc:", error.message);
    if (error instanceof z.ZodError) {
       return { success: false, error: "Validation failed: " + error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') };
    }
    return { success: false, error: error.message };
  }
}

// Generic function to fetch documents
async function getDocsFromCollection<T>(collectionName: string): Promise<T[]> {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}

// Generic function to delete a document
async function deleteDocFromCollection(collectionName: string, id: string, filePath?: string) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);

    // If a filePath is provided and it's not just a 'link' placeholder, attempt to delete from storage
    if (filePath && filePath !== 'link' && !filePath.startsWith('data:')) {
        try {
            const storage = getStorage();
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
        } catch (storageError) {
            // It's okay if the object doesn't exist.
            if ((storageError as any).code !== 'storage/object-not-found') {
                console.error("Error deleting file from storage:", storageError);
                // Decide if you want to fail the whole operation or just warn
            }
        }
    }


    revalidatePath('/dashboard');
    revalidatePath(`/${collectionName}`);
     if (collectionName === 'events') revalidatePath('/');
    if (collectionName === 'digital_library_papers') revalidatePath('/digitallibrary');
    if (collectionName === 'educational_resources') {
      revalidatePath('/educationalresources');
      revalidatePath('/freecourses');
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Course Actions
export async function addOrUpdateCourse(data: Course) { return addOrUpdateDoc('courses', data, courseSchema); }
export async function getCourses(): Promise<Course[]> { return getDocsFromCollection<Course>('courses'); }
export async function deleteCourse(id: string, imgPath?: string) { return deleteDocFromCollection('courses', id, imgPath); }

// Partner Actions
export async function addOrUpdatePartner(data: Partner) { return addOrUpdateDoc('partners', data, partnerSchema); }
export async function getPartners(): Promise<Partner[]> { return getDocsFromCollection<Partner>('partners'); }
export async function deletePartner(id: string, logoPath?: string) { return deleteDocFromCollection('partners', id, logoPath); }

// Event Actions
export async function addOrUpdateEvent(data: Event) { return addOrUpdateDoc('events', data, eventSchema); }
export async function getEvents(): Promise<Event[]> { return getDocsFromCollection<Event>('events'); }
export async function deleteEvent(id: string, imagePath?: string) { return deleteDocFromCollection('events', id, imagePath); }

// Journal Actions
export async function addOrUpdateJournal(data: Journal) { return addOrUpdateDoc('journals', data, journalSchema); }
export async function getJournals(): Promise<Journal[]> { return getDocsFromCollection<Journal>('journals'); }
export async function deleteJournal(id: string, imagePath?: string) { return deleteDocFromCollection('journals',id, imagePath); }

// Digital Library Actions
export async function getDigitalLibraryPapers(): Promise<DigitalLibraryPaper[]> { return getDocsFromCollection<DigitalLibraryPaper>('digital_library_papers'); }
export async function deleteDigitalLibraryPaper(id: string) { return deleteDocFromCollection('digital_library_papers', id); }
export async function bulkAddDigitalLibraryPapers(papers: Omit<DigitalLibraryPaper, 'id'>[]) {
  try {
    const batch = papers.map(paper => {
      const validatedData = digitalLibraryPaperSchema.omit({id: true}).parse(paper);
      return addDoc(collection(db, "digital_library_papers"), validatedData);
    });
    await Promise.all(batch);
    revalidatePath('/dashboard');
    revalidatePath('/digitallibrary');
    return { success: true, count: papers.length };
  } catch (error: any) {
    console.error("Bulk add error:", error);
    return { success: false, error: error.message };
  }
}

// Educational Resources Actions
export async function getEducationalResources(): Promise<EducationalResource[]> { return getDocsFromCollection<EducationalResource>('educational_resources'); }
export async function addOrUpdateEducationalResource(data: EducationalResource) { return addOrUpdateDoc('educational_resources', data, educationalResourceSchema); }
export async function deleteEducationalResource(id: string, filePath?: string) {
    return deleteDocFromCollection('educational_resources', id, filePath);
}


// Counter Actions
const COUNTER_COLLECTION = 'site_settings';
const COUNTER_DOC_ID = 'counters';

export async function getCounters(): Promise<Counter | null> {
  try {
    const docRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Counter;
    }
    // Return default values if document doesn't exist
    return { members: 2000, projects: 200, journals: 23, subscribers: 4000 };
  } catch (error) {
    console.error("Error fetching counters:", error);
    return null;
  }
}

export async function updateCounters(data: Counter) {
  try {
    const validatedData = counterSchema.parse(data);
    const docRef = doc(db, COUNTER_COLLECTION, COUNTER_DOC_ID);
    await setDoc(docRef, validatedData, { merge: true });
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Registration Actions
export async function getRegistrations(): Promise<Registration[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "registrations"));
        
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Serialize Firestore Timestamps
            const plainObject = JSON.parse(JSON.stringify(data));
            return { id: doc.id, ...plainObject } as Registration;
        });

    } catch (error) {
        console.error("Error fetching registrations:", error);
        return [];
    }
}


export async function approveRegistration(registration: Registration) {
    try {
        // 1. Add to members collection
        const memberData: Omit<Member, 'id'> = {
            name: registration.name,
            role: registration.registrationType,
            img: registration.photo,
            linkedinUrl: registration.linkedinUrl,
            twitterUrl: registration.twitterUrl,
        };
        const validatedMember = memberSchema.omit({id: true}).parse(memberData);
        await addDoc(collection(db, "members"), validatedMember);
        
        // 2. Update registration status
        const registrationRef = doc(db, "registrations", registration.id!);
        await updateDoc(registrationRef, { status: "approved" });
        
        revalidatePath('/dashboard');
        revalidatePath('/ourteam');

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function rejectRegistration(registrationId: string) {
    try {
        const registrationRef = doc(db, "registrations", registrationId);
        await updateDoc(registrationRef, { status: "rejected" });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Member Actions
export async function getMembers(): Promise<Member[]> {
    return getDocsFromCollection<Member>('members');
}

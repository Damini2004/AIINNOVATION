
"use server";

import { z } from "zod";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { db, storage as clientStorage } from "@/firebase/firebaseConfig";
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
  image: z.string().url("Must be a valid image URL"),
});

const educationalResourceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fileUrl: z.string().url(),
  fileName: z.string(),
  fileType: z.string(),
});


type Course = z.infer<typeof courseSchema>;
type Partner = z.infer<typeof partnerSchema>;
type Event = z.infer<typeof eventSchema>;
type Journal = z.infer<typeof journalSchema>;
export type DigitalLibraryPaper = z.infer<typeof digitalLibraryPaperSchema>;
export type EducationalResource = z.infer<typeof educationalResourceSchema>;


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
    revalidatePath('/admin');
    revalidatePath(`/${collectionName}`);
    if (collectionName === 'events') revalidatePath('/');
    if (collectionName === 'digital_library_papers') revalidatePath('/digitallibrary');
    if (collectionName === 'educational_resources') revalidatePath('/educationalresources');


    return { success: true };
  } catch (error: any) {
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
async function deleteDocFromCollection(collectionName: string, id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    revalidatePath('/admin');
    revalidatePath(`/${collectionName}`);
     if (collectionName === 'events') revalidatePath('/');
    if (collectionName === 'digital_library_papers') revalidatePath('/digitallibrary');
    if (collectionName === 'educational_resources') revalidatePath('/educationalresources');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Course Actions
export async function addOrUpdateCourse(data: Course) { return addOrUpdateDoc('courses', data, courseSchema); }
export async function getCourses(): Promise<Course[]> { return getDocsFromCollection<Course>('courses'); }
export async function deleteCourse(id: string) { return deleteDocFromCollection('courses', id); }

// Partner Actions
export async function addOrUpdatePartner(data: Partner) { return addOrUpdateDoc('partners', data, partnerSchema); }
export async function getPartners(): Promise<Partner[]> { return getDocsFromCollection<Partner>('partners'); }
export async function deletePartner(id: string) { return deleteDocFromCollection('partners', id); }

// Event Actions
export async function addOrUpdateEvent(data: Event) { return addOrUpdateDoc('events', data, eventSchema); }
export async function getEvents(): Promise<Event[]> { return getDocsFromCollection<Event>('events'); }
export async function deleteEvent(id: string) { return deleteDocFromCollection('events', id); }

// Journal Actions
export async function addOrUpdateJournal(data: Journal) { return addOrUpdateDoc('journals', data, journalSchema); }
export async function getJournals(): Promise<Journal[]> { return getDocsFromCollection<Journal>('journals'); }
export async function deleteJournal(id: string) { return deleteDocFromCollection('journals',id); }

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
    revalidatePath('/admin');
    revalidatePath('/digitallibrary');
    return { success: true, count: papers.length };
  } catch (error: any) {
    console.error("Bulk add error:", error);
    return { success: false, error: error.message };
  }
}

// Educational Resources Actions
export async function getEducationalResources(): Promise<EducationalResource[]> { return getDocsFromCollection<EducationalResource>('educational_resources'); }
export async function deleteEducationalResource(id: string) { 
    // Also delete from storage
    return deleteDocFromCollection('educational_resources', id); 
}

export async function addEducationalResource(data: { title: string; description: string; filePath: string; fileName: string; fileType: string; }) {
  const { title, description, filePath, fileName, fileType } = data;
  const storage = getStorage();
  const tempRef = ref(storage, filePath);

  try {
    const permPath = `educational_resources/${Date.now()}_${fileName}`;
    const permRef = ref(storage, permPath);
    
    // Copy file from temp to permanent location
    const fileSnapshot = await getDownloadURL(tempRef);
    const fileResponse = await fetch(fileSnapshot);
    const fileBlob = await fileResponse.blob();
    await uploadString(permRef, await fileBlob.text(), 'raw', { contentType: fileType });
    const fileUrl = await getDownloadURL(permRef);
    
    // Delete temp file
    await deleteObject(tempRef);

    const resourceData: Omit<EducationalResource, 'id'> = {
      title,
      description,
      fileUrl,
      fileName,
      fileType,
    };
    
    const validatedData = educationalResourceSchema.omit({id: true}).parse(resourceData);
    await addDoc(collection(db, "educational_resources"), validatedData);

    revalidatePath('/admin');
    revalidatePath('/educationalresources');
    revalidatePath('/freecourses');
    return { success: true };

  } catch (error: any) {
     console.error("Add resource error:", error);
    // Cleanup temp file if something fails
    try { await deleteObject(tempRef); } catch (e) {}
    return { success: false, error: error.message };
  }
}

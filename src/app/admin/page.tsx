

"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addOrUpdateCourse,
  addOrUpdatePartner,
  addOrUpdateEvent,
  addOrUpdateJournal,
  addEducationalResource,
  getCourses,
  getPartners,
  getEvents,
  getJournals,
  getEducationalResources,
  deleteCourse,
  deletePartner,
  deleteEvent,
  deleteJournal,
  deleteEducationalResource,
  getDigitalLibraryPapers,
  bulkAddDigitalLibraryPapers,
  deleteDigitalLibraryPaper,
} from "./actions";
import type { DigitalLibraryPaper, EducationalResource } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Edit, LogOut, Upload, FileText, CheckCircle, XCircle, File as FileIcon, Presentation, FileCode } from "lucide-react";
import Image from "next/image";
import { ref, uploadBytes } from "firebase/storage";
import { storage as clientStorage } from "@/firebase/firebaseConfig";


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
  file: z.any().refine(file => file.length == 1, 'File is required.'),
});


type Course = z.infer<typeof courseSchema>;
type Partner = z.infer<typeof partnerSchema>;
type Event = z.infer<typeof eventSchema>;
type Journal = z.infer<typeof journalSchema>;
type EducationalResourceFormType = z.infer<typeof educationalResourceSchema>;

function CourseForm({ course, onSave }: { course?: Course; onSave: () => void }) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(course?.img || null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: course || { category: 'ug', img: '' },
  });

  useEffect(() => {
    if (course) {
        setValue('img', course.img);
        setPreview(course.img)
    }
  }, [course, setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("img", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsUploading(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Course> = async (data) => {
    if (!data.img) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload an image." });
        return;
    }
    const result = await addOrUpdateCourse(data);
    if (result.success) {
      toast({ title: "Success", description: `Course ${course ? 'updated' : 'added'}.` });
      onSave();
      reset();
      setPreview(null);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
      <Input type="hidden" {...register("img")} />
      <div>
        <Label htmlFor="courseTitle">Title</Label>
        <Input id="courseTitle" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseDescription">Description</Label>
        <Textarea id="courseDescription" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseDuration">Duration</Label>
        <Input id="courseDuration" {...register("duration")} />
        {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseCategory">Category</Label>
        <Input id="courseCategory" placeholder="e.g. school, ug, pgphd" {...register("category")} />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseLink">Link</Label>
        <Input id="courseLink" placeholder="https://example.com/course-details" {...register("link")} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseImgFile">Upload Image</Label>
        <Input id="courseImgFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading}/>
        {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
        {isUploading && <div className="flex items-center text-sm text-muted-foreground pt-2"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading file...</div>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-48">
             <Image src={preview} alt="Image preview" width={400} height={300} className="object-contain max-h-full" />
          </div>
        </div>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isUploading}>
           {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Course
        </Button>
      </DialogFooter>
    </form>
  );
}

function PartnerForm({ partner, onSave }: { partner?: Partner; onSave: () => void }) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(partner?.logo || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Partner>({
    resolver: zodResolver(partnerSchema),
    defaultValues: partner || { logo: '' },
  });
  
  useEffect(() => {
    if (partner) {
        setValue('logo', partner.logo);
        setPreview(partner.logo)
    }
  }, [partner, setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("logo", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsUploading(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Partner> = async (data) => {
     if (!data.logo) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload a logo file." });
        return;
    }
    const result = await addOrUpdatePartner(data);
    if (result.success) {
      toast({ title: "Success", description: `Partner ${partner ? 'updated' : 'added'}.` });
      onSave();
      reset();
      setPreview(null);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
      <Input type="hidden" {...register("logo")} />
      <div>
        <Label htmlFor="partnerName">Partner Name</Label>
        <Input id="partnerName" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="partnerDesignation">Designation</Label>
        <Input id="partnerDesignation" {...register("designation")} />
        {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
      </div>
       <div>
        <Label htmlFor="logoFile">Upload Logo</Label>
        <Input id="logoFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
        {errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>}
        {isUploading && <div className="flex items-center text-sm text-muted-foreground pt-2"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading file...</div>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Logo Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-24">
             <Image src={preview} alt="Logo preview" width={150} height={80} className="object-contain max-h-full" />
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="partnerFacebookUrl">Facebook URL</Label>
        <Input id="partnerFacebookUrl" {...register("facebookUrl")} />
        {errors.facebookUrl && <p className="text-red-500 text-sm">{errors.facebookUrl.message}</p>}
      </div>
      <div>
        <Label htmlFor="partnerTwitterUrl">Twitter URL</Label>
        <Input id="partnerTwitterUrl" {...register("twitterUrl")} />
        {errors.twitterUrl && <p className="text-red-500 text-sm">{errors.twitterUrl.message}</p>}
      </div>
      <div>
        <Label htmlFor="partnerPinterestUrl">Pinterest URL</Label>
        <Input id="partnerPinterestUrl" {...register("pinterestUrl")} />
        {errors.pinterestUrl && <p className="text-red-500 text-sm">{errors.pinterestUrl.message}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Partner
        </Button>
      </DialogFooter>
    </form>
  );
}

function EventForm({ event, onSave }: { event?: Event; onSave: () => void }) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(event?.image || null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: event || { image: '' },
  });

  useEffect(() => {
    if (event) {
        setValue('image', event.image);
        setPreview(event.image)
    }
  }, [event, setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsUploading(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Event> = async (data) => {
    if (!data.image) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload an image." });
        return;
    }
    const result = await addOrUpdateEvent(data);
    if (result.success) {
      toast({ title: "Success", description: `Event ${event ? 'updated' : 'added'}.` });
      onSave();
      reset();
      setPreview(null);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Input type="hidden" {...register("id")} />
       <Input type="hidden" {...register("image")} />
       <div>
        <Label htmlFor="eventTitle">Title</Label>
        <Input id="eventTitle" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
        <div>
        <Label htmlFor="eventSubtitle">Subtitle</Label>
        <Input id="eventSubtitle" {...register("subtitle")} />
        {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventDescription">Description</Label>
        <Textarea id="eventDescription" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventCategory">Category</Label>
        <Input id="eventCategory" {...register("category")} />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventImgFile">Upload Image</Label>
        <Input id="eventImgFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading}/>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        {isUploading && <div className="flex items-center text-sm text-muted-foreground pt-2"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading file...</div>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-48">
             <Image src={preview} alt="Image preview" width={400} height={300} className="object-contain max-h-full" />
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="eventLink">Event Link</Label>
        <Input id="eventLink" {...register("link")} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Event
        </Button>
      </DialogFooter>
    </form>
  );
}

function JournalForm({ journal, onSave }: { journal?: Journal; onSave: () => void }) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(journal?.image || null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Journal>({
    resolver: zodResolver(journalSchema),
    defaultValues: journal || { image: '' },
  });

  useEffect(() => {
    if (journal) {
        setValue('image', journal.image);
        setPreview(journal.image)
    }
  }, [journal, setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsUploading(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Journal> = async (data) => {
    if (!data.image) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload an image." });
        return;
    }
    const result = await addOrUpdateJournal(data);
    if (result.success) {
      toast({ title: "Success", description: `Journal ${journal ? 'updated' : 'added'}.` });
      onSave();
      reset();
      setPreview(null);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Input type="hidden" {...register("id")} />
       <Input type="hidden" {...register("image")} />
       <div>
        <Label htmlFor="journalTitle">Title</Label>
        <Input id="journalTitle" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="journalDescription">Description</Label>
        <Textarea id="journalDescription" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="journalLink">Link</Label>
        <Input id="journalLink" placeholder="https://example.com/journal-details" {...register("link")} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <div>
        <Label htmlFor="journalImgFile">Upload Image</Label>
        <Input id="journalImgFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isUploading}/>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        {isUploading && <div className="flex items-center text-sm text-muted-foreground pt-2"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Reading file...</div>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-48">
             <Image src={preview} alt="Image preview" width={400} height={300} className="object-contain max-h-full" />
          </div>
        </div>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Journal
        </Button>
      </DialogFooter>
    </form>
  );
}

function EducationalResourceForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EducationalResourceFormType>({
    resolver: zodResolver(educationalResourceSchema),
    defaultValues: { title: "", description: "" },
  });

  const selectedFile = watch("file");

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      setFileName(selectedFile[0].name);
    } else {
      setFileName(null);
    }
  }, [selectedFile]);

  const onSubmit: SubmitHandler<EducationalResourceFormType> = async (data) => {
    setIsSubmitting(true);
    const file = data.file[0];

    try {
      // 1. Upload file to a temporary path on client-side
      const tempPath = `temp/${Date.now()}_${file.name}`;
      const storageRef = ref(clientStorage, tempPath);
      await uploadBytes(storageRef, file);

      // 2. Call server action with metadata and temp path
      const result = await addEducationalResource({
        title: data.title,
        description: data.description,
        filePath: tempPath,
        fileName: file.name,
        fileType: file.type,
      });

      if (result.success) {
        toast({ title: "Success", description: "Educational resource added." });
        onSave();
        reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to save the resource.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: `Failed to upload file: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="resourceTitle">Title</Label>
        <Input id="resourceTitle" {...register("title")} disabled={isSubmitting} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="resourceDescription">Description</Label>
        <Textarea
          id="resourceDescription"
          {...register("description")}
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="resourceFile">Upload File</Label>
        <Input
          id="resourceFile"
          type="file"
          {...register("file")}
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          disabled={isSubmitting}
        />
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file.message as string}</p>
        )}
        {fileName && (
          <p className="text-sm text-muted-foreground mt-2">Selected: {fileName}</p>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={isSubmitting}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Resource
        </Button>
      </DialogFooter>
    </form>
  );
}


function DigitalLibraryManager({ papers: initialPapers, onUpdate }: { papers: DigitalLibraryPaper[], onUpdate: () => void }) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<Omit<DigitalLibraryPaper, 'id'>[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const text = event.target?.result as string;
          // Basic CSV parsing
          const rows = text.split('\n').filter(row => row.trim() !== '');
          const headers = rows[0].split(',').map(h => h.trim());
          const expectedHeaders = ["paperTitle", "authorName", "journalName", "volumeIssue", "link", "image"];
          
          if (headers.length !== expectedHeaders.length || !expectedHeaders.every((h, i) => h === headers[i])) {
            throw new Error("CSV headers do not match expected format: " + expectedHeaders.join(', '));
          }

          const data: Omit<DigitalLibraryPaper, 'id'>[] = rows.slice(1).map(row => {
            const values = row.split(',').map(v => v.trim());
            return {
              paperTitle: values[0] || '',
              authorName: values[1] || '',
              journalName: values[2] || '',
              volumeIssue: values[3] || '',
              link: values[4] || '',
              image: values[5] || '',
            };
          });

          // Validate with Zod
          const validatedData = z.array(digitalLibraryPaperSchema.omit({id: true})).safeParse(data);
          if (!validatedData.success) {
            console.error(validatedData.error);
            throw new Error("CSV data is invalid. Check console for details.");
          }

          setParsedData(validatedData.data);
          toast({ title: "File Parsed", description: `${data.length} records found in ${file.name}.` });
        } catch (error: any) {
          toast({ variant: "destructive", title: "Error parsing file", description: error.message });
          setParsedData(null);
          setFileName(null);
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleBulkUpload = async () => {
    if (!parsedData) return;
    setIsUploading(true);
    const result = await bulkAddDigitalLibraryPapers(parsedData);
    if (result.success) {
      toast({ title: "Success", description: `${result.count} papers have been uploaded.` });
      onUpdate();
      setParsedData(null);
      setFileName(null);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteDigitalLibraryPaper(id);
    if (result.success) {
      toast({ title: "Success", description: "Paper deleted successfully." });
      onUpdate();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Digital Library</CardTitle>
        <CardDescription>Upload a CSV file to bulk-add papers or manage existing ones.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 border-2 border-dashed rounded-lg text-center">
            <Label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="font-medium">
                    {fileName ? `Selected: ${fileName}` : "Click to upload a CSV file"}
                </span>
                <span className="text-xs text-muted-foreground">
                    Headers: paperTitle, authorName, journalName, volumeIssue, link, image
                </span>
            </Label>
            <Input id="csv-upload" type="file" className="hidden" accept=".csv" onChange={handleFileChange} disabled={isUploading}/>
        </div>
        
        {parsedData && (
          <div className="flex justify-end gap-2">
             <Button variant="outline" onClick={() => { setParsedData(null); setFileName(null); }}>Clear</Button>
            <Button onClick={handleBulkUpload} disabled={isUploading}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle className="mr-2 h-4 w-4" />}
              Confirm & Upload {parsedData.length} Records
            </Button>
          </div>
        )}
        
        <div className="space-y-2 pt-4">
             <h4 className="font-semibold">Existing Papers ({initialPapers.length})</h4>
             <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {initialPapers.map((paper) => (
                    <div key={paper.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="truncate">
                          <p className="font-medium text-sm truncate">{paper.paperTitle}</p>
                          <p className="text-xs text-muted-foreground truncate">{paper.authorName}</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 flex-shrink-0"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action will permanently delete the paper: "{paper.paperTitle}".
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(paper.id!)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}
            </div>
        </div>

      </CardContent>
    </Card>
  )
}


export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [partners, setPartners] =useState<Partner[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [papers, setPapers] = useState<DigitalLibraryPaper[]>([]);
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");

  useEffect(() => {
    const checkAuth = () => {
      const adminLoggedIn = localStorage.getItem("isAdminLoggedIn");
      if (adminLoggedIn !== "true") {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
        fetchData();
      }
    };
    checkAuth();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    const [coursesData, partnersData, eventsData, journalsData, papersData, resourcesData] = await Promise.all([
      getCourses(),
      getPartners(),
      getEvents(),
      getJournals(),
      getDigitalLibraryPapers(),
      getEducationalResources(),
    ]);
    setCourses(coursesData);
    setPartners(partnersData);
    setEvents(eventsData);
    setJournals(journalsData);
    setPapers(papersData);
    setResources(resourcesData);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/");
  };


  const handleDelete = async (collection: 'courses' | 'partners' | 'events' | 'journals' | 'digital_library_papers' | 'educational_resources', id: string) => {
    let result;
    if (collection === 'courses') result = await deleteCourse(id);
    if (collection === 'partners') result = await deletePartner(id);
    if (collection === 'events') result = await deleteEvent(id);
    if (collection === 'journals') result = await deleteJournal(id);
    if (collection === 'digital_library_papers') result = await deleteDigitalLibraryPaper(id);
    if (collection === 'educational_resources') result = await deleteEducationalResource(id);

    if (result?.success) {
      toast({ title: "Success", description: "Item deleted successfully." });
      fetchData();
    } else {
      toast({ variant: "destructive", title: "Error", description: result?.error });
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileCode className="h-5 w-5 text-red-500" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-5 w-5 text-orange-500" />;
    if (fileType.includes("document") || fileType.includes("word")) return <FileIcon className="h-5 w-5 text-blue-500" />;
    return <FileIcon className="h-5 w-5 text-gray-500" />;
  };

  if (!isAuthenticated) {
     return <div className="container mx-auto py-10 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (loading) {
    return <div className="container mx-auto py-10 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto py-10">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="journals">Journals</TabsTrigger>
          <TabsTrigger value="library">Digital Library</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Courses</CardTitle>
                <CardDescription>Add, edit, or delete courses.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Course</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <CourseForm onSave={() => {fetchData();}} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-2 border rounded-md">
                     <div className="flex items-center gap-4">
                        <Image src={course.img || "https://picsum.photos/seed/placeholder/60/45"} alt={course.title} width={60} height={45} className="rounded-md" />
                        <div>
                          <p className="font-semibold">{course.title}</p>
                          <p className="text-sm text-muted-foreground">{course.category} - {course.duration}</p>
                        </div>
                     </div>
                    <div className="flex items-center gap-2">
                       <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Course</DialogTitle>
                          </DialogHeader>
                          <CourseForm course={course} onSave={() => fetchData()} />
                        </DialogContent>
                      </Dialog>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the course.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete('courses', course.id!)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                <CardTitle>Partners</CardTitle>
                <CardDescription>Add, edit, or delete partners.</CardDescription>
              </div>
               <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Partner</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Partner</DialogTitle>
                  </DialogHeader>
                  <PartnerForm onSave={() => fetchData()} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-2 border rounded-md">
                     <div className="flex items-center gap-4">
                        <Image src={partner.logo || `https://picsum.photos/seed/placeholder/40/40`} alt={partner.name} width={40} height={40} className="rounded-md object-contain" />
                        <div>
                          <p className="font-semibold">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">{partner.designation}</p>
                        </div>
                     </div>
                    <div className="flex items-center gap-2">
                       <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Partner</DialogTitle>
                          </DialogHeader>
                          <PartnerForm partner={partner} onSave={() => fetchData()} />
                        </DialogContent>
                      </Dialog>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the partner.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete('partners', partner.id!)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Events</CardTitle>
                <CardDescription>Add, edit, or delete events.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Event</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <EventForm onSave={() => fetchData()} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-4">
                        <Image src={event.image} alt={event.title} width={60} height={45} className="rounded-md object-cover" />
                        <div>
                          <p className="font-semibold">{event.title}</p>
                           <p className="text-sm text-muted-foreground">{event.category} - {event.subtitle}</p>
                        </div>
                     </div>
                    <div className="flex items-center gap-2">
                       <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Event</DialogTitle>
                          </DialogHeader>
                          <EventForm event={event} onSave={() => fetchData()} />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the event.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete('events', event.id!)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journals">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Journals</CardTitle>
                <CardDescription>Add, edit, or delete journals.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Journal</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Journal</DialogTitle>
                  </DialogHeader>
                  <JournalForm onSave={() => fetchData()} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journals.map((journal) => (
                  <div key={journal.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-4">
                        <Image src={journal.image} alt={journal.title} width={60} height={45} className="rounded-md object-cover" />
                        <div>
                          <p className="font-semibold">{journal.title}</p>
                        </div>
                     </div>
                    <div className="flex items-center gap-2">
                       <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Journal</DialogTitle>
                          </DialogHeader>
                          <JournalForm journal={journal} onSave={() => fetchData()} />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the journal.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete('journals', journal.id!)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="library">
          <DigitalLibraryManager papers={papers} onUpdate={fetchData} />
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Add or delete educational resources like PDFs, PPTs, etc.</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Resource</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Resource</DialogTitle>
                  </DialogHeader>
                  <EducationalResourceForm onSave={() => fetchData()} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-4">
                      {getFileIcon(resource.fileType)}
                      <div className="truncate">
                        <p className="font-semibold truncate">{resource.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{resource.fileName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action will permanently delete the resource: "{resource.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete('educational_resources', resource.id!)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

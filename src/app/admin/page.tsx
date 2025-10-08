

"use client";

import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  addOrUpdateCourse,
  addOrUpdatePartner,
  addOrUpdateEvent,
  addOrUpdateJournal,
  addOrUpdateEducationalResource,
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
  getCounters,
  updateCounters,
  getRegistrations,
  approveRegistration,
  rejectRegistration,
  updateRegistrationStatus,
  getContactMessages,
  deleteContactMessage,
} from "./actions";
import type { DigitalLibraryPaper, EducationalResource, Counter, Registration, ContactMessage, Course as CourseType } from "./actions";
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
import { Loader2, Trash2, Edit, LogOut, Upload, FileText, CheckCircle, XCircle, File as FileIcon, Presentation, Link as LinkIcon, FileCode, Check, X, Linkedin, Twitter, RefreshCw, Mail, CalendarIcon, LayoutDashboard, Book, Handshake, Calendar as CalendarLucide, Library, GraduationCap, CircleUserRound, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Sidebar, SidebarContent, SidebarGroup, SidebarItem, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";


// Zod Schemas
const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one category.",
  }),
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
  date: z.string().min(1, "Date is required"),
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
  file: z.any().optional(),
  link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  image: z.any().optional(),
}).refine(data => (data.file && data.file.length > 0) || !!data.link || !!data.id, {
  message: "Either a file or a link is required.",
  path: ["file"],
});

const counterSchema = z.object({
  members: z.coerce.number().min(0, "Must be a positive number"),
  projects: z.coerce.number().min(0, "Must be a positive number"),
  journals: z.coerce.number().min(0, "Must be a positive number"),
  subscribers: z.coerce.number().min(0, "Must be a positive number"),
});


type CourseFormValues = z.infer<typeof courseSchema>;
type Course = Omit<CourseFormValues, 'category'> & { category: string, id?: string };
type Partner = z.infer<typeof partnerSchema>;
type Event = z.infer<typeof eventSchema>;
type Journal = z.infer<typeof journalSchema>;
type EducationalResourceFormType = z.infer<typeof educationalResourceSchema>;
type CounterFormType = z.infer<typeof counterSchema>;

const courseCategories = [
    { id: 'school', label: 'School' },
    { id: 'ug', label: 'Undergraduate' },
    { id: 'pgphd', label: 'PG / PhD' },
    { id: 'rm', label: 'Research Methodology' },
    { id: 'free', label: 'Free Course' },
];

function CourseForm({ course, onSave }: { course?: Course; onSave: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(course?.img || null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
        id: course?.id,
        title: course?.title || "",
        description: course?.description || "",
        duration: course?.duration || "",
        img: course?.img || "",
        link: course?.link || "",
        category: typeof course?.category === 'string' ? course.category.split(',').map(s => s.trim()) : [],
    },
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
      setIsSubmitting(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("img", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsSubmitting(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsSubmitting(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    setIsSubmitting(true);
    if (!data.img) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload an image." });
        setIsSubmitting(false);
        return;
    }

    const courseData: Course = {
        ...data,
        category: data.category.join(','),
    }

    const result = await addOrUpdateCourse(courseData);
    if (result.success) {
      toast({ title: "Success", description: `Course ${course ? 'updated' : 'added'}.` });
      onSave();
      reset();
      setPreview(null);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
      <Input type="hidden" {...register("img")} />
      <div>
        <Label htmlFor="courseTitle">Title</Label>
        <Input id="courseTitle" {...register("title")} disabled={isSubmitting} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseDescription">Description</Label>
        <Textarea id="courseDescription" {...register("description")} disabled={isSubmitting} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseDuration">Duration</Label>
        <Input id="courseDuration" {...register("duration")} disabled={isSubmitting} />
        {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
      </div>
       <div>
        <Label>Category</Label>
        <Controller
            control={control}
            name="category"
            render={({ field }) => (
                <div className="grid grid-cols-2 gap-2 p-2 border rounded-md">
                    {courseCategories.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                           <Checkbox
                                id={item.id}
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id));
                                }}
                            />
                            <Label htmlFor={item.id} className="font-normal">{item.label}</Label>
                        </div>
                    ))}
                </div>
            )}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseLink">Link</Label>
        <Input id="courseLink" placeholder="https://example.com/course-details" {...register("link")} disabled={isSubmitting} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseImgFile">Upload Image</Label>
        <Input id="courseImgFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isSubmitting}/>
        {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-48 bg-muted/50">
             <Image src={preview} alt="Image preview" width={400} height={300} className="object-contain max-h-full rounded-md" />
          </div>
        </div>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Course
        </Button>
      </DialogFooter>
    </form>
  );
}

function PartnerForm({ partner, onSave }: { partner?: Partner; onSave: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("logo", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsSubmitting(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsSubmitting(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Partner> = async (data) => {
    setIsSubmitting(true);
     if (!data.logo) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload a logo file." });
        setIsSubmitting(false);
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
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
      <Input type="hidden" {...register("logo")} />
      <div>
        <Label htmlFor="partnerName">Partner Name</Label>
        <Input id="partnerName" {...register("name")} disabled={isSubmitting} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="partnerDesignation">Designation</Label>
        <Input id="partnerDesignation" {...register("designation")} disabled={isSubmitting} />
        {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
      </div>
       <div>
        <Label htmlFor="logoFile">Upload Logo</Label>
        <Input id="logoFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isSubmitting} />
        {errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Logo Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-24 bg-muted/50">
             <Image src={preview} alt="Logo preview" width={150} height={80} className="object-contain max-h-full" />
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="partnerFacebookUrl">Facebook URL</Label>
        <Input id="partnerFacebookUrl" {...register("facebookUrl")} disabled={isSubmitting} />
        {errors.facebookUrl && <p className="text-red-500 text-sm">{errors.facebookUrl.message}</p>}
      </div>
      <div>
        <Label htmlFor="partnerTwitterUrl">Twitter URL</Label>
        <Input id="partnerTwitterUrl" {...register("twitterUrl")} disabled={isSubmitting} />
        {errors.twitterUrl && <p className="text-red-500 text-sm">{errors.twitterUrl.message}</p>}
      </div>
      <div>
        <Label htmlFor="partnerPinterestUrl">Pinterest URL</Label>
        <Input id="partnerPinterestUrl" {...register("pinterestUrl")} disabled={isSubmitting} />
        {errors.pinterestUrl && <p className="text-red-500 text-sm">{errors.pinterestUrl.message}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Partner
        </Button>
      </DialogFooter>
    </form>
  );
}

function EventForm({ event, onSave }: { event?: Event; onSave: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(event?.image || null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: event || { image: '', date: '' },
  });

  const dateValue = watch("date");

  useEffect(() => {
    if (event) {
        setValue('image', event.image);
        setPreview(event.image);
        setValue('date', event.date);
    }
  }, [event, setValue]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSubmitting(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsSubmitting(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsSubmitting(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Event> = async (data) => {
    setIsSubmitting(true);
    if (!data.image) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload an image." });
        setIsSubmitting(false);
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
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Input type="hidden" {...register("id")} />
       <Input type="hidden" {...register("image")} />
       <Input type="hidden" {...register("date")} />
       <div>
        <Label htmlFor="eventTitle">Title</Label>
        <Input id="eventTitle" {...register("title")} disabled={isSubmitting} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
        <div>
        <Label htmlFor="eventSubtitle">Subtitle</Label>
        <Input id="eventSubtitle" {...register("subtitle")} disabled={isSubmitting} />
        {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventDescription">Description</Label>
        <Textarea id="eventDescription" {...register("description")} disabled={isSubmitting} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
       <div>
        <Label>Event Date</Label>
         <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateValue && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue ? format(new Date(dateValue), "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                mode="single"
                selected={dateValue ? new Date(dateValue) : undefined}
                onSelect={(date) => setValue('date', date ? format(date, 'yyyy-MM-dd') : '', {shouldValidate: true})}
                initialFocus
                />
            </PopoverContent>
        </Popover>
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventCategory">Category</Label>
        <Input id="eventCategory" {...register("category")} disabled={isSubmitting} />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventImgFile">Upload Image</Label>
        <Input id="eventImgFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isSubmitting}/>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-48 bg-muted/50">
             <Image src={preview} alt="Image preview" width={400} height={300} className="object-contain max-h-full rounded-md" />
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="eventLink">Event Link</Label>
        <Input id="eventLink" {...register("link")} disabled={isSubmitting} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Event
        </Button>
      </DialogFooter>
    </form>
  );
}

function JournalForm({ journal, onSave }: { journal?: Journal; onSave: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue("image", base64String, { shouldValidate: true });
        setPreview(base64String);
        setIsSubmitting(false);
      };
      reader.onerror = () => {
         toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
         setIsSubmitting(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<Journal> = async (data) => {
    setIsSubmitting(true);
    if (!data.image) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please upload an image." });
        setIsSubmitting(false);
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
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Input type="hidden" {...register("id")} />
       <Input type="hidden" {...register("image")} />
       <div>
        <Label htmlFor="journalTitle">Title</Label>
        <Input id="journalTitle" {...register("title")} disabled={isSubmitting} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="journalDescription">Description</Label>
        <Textarea id="journalDescription" {...register("description")} disabled={isSubmitting} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div>
        <Label htmlFor="journalLink">Link</Label>
        <Input id="journalLink" placeholder="https://example.com/journal-details" {...register("link")} disabled={isSubmitting} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <div>
        <Label htmlFor="journalImgFile">Upload Image</Label>
        <Input id="journalImgFile" type="file" onChange={handleFileChange} accept="image/*" disabled={isSubmitting}/>
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>
       {preview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 p-4 border rounded-md flex justify-center items-center h-48 bg-muted/50">
             <Image src={preview} alt="Image preview" width={400} height={300} className="object-contain max-h-full rounded-md" />
          </div>
        </div>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Journal
        </Button>
      </DialogFooter>
    </form>
  );
}

function EducationalResourceForm({ onSave, resource }: { onSave: () => void; resource?: EducationalResource }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(resource?.image || null);
  
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue, clearErrors } = useForm<EducationalResourceFormType>({
    resolver: zodResolver(educationalResourceSchema),
    defaultValues: resource ? { ...resource, file: undefined, link: resource.fileType === 'link' ? resource.fileUrl : '', image: resource.image } : { title: "", description: "", link: "", image: '' },
  });

  const fileRef = register("file");
  const selectedFile = watch("file");
  const linkValue = watch("link");

  useEffect(() => {
    if (resource) {
      reset({ ...resource, file: undefined, link: resource.fileType === 'link' ? resource.fileUrl : '', image: resource.image });
      if(resource.image) setImagePreview(resource.image);
    }
  }, [resource, reset]);

  useEffect(() => {
    if (linkValue) {
      setValue("file", undefined);
      if (errors.file) clearErrors("file");
    }
  }, [linkValue, setValue, errors.file, clearErrors]);

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
       setValue("link", "");
       if (errors.link) clearErrors("link");
    }
  }, [selectedFile, setValue, errors.link, clearErrors]);

  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
  }

  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSubmitting(true);
      try {
        const base64String = await fileToDataURL(file);
        setValue("image", base64String, { shouldValidate: true });
        setImagePreview(base64String);
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to read image file." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const onSubmit: SubmitHandler<EducationalResourceFormType> = async (data) => {
    setIsSubmitting(true);
    
    try {
      let fileUrl = data.link || "";
      let fileName = "link";
      let fileType = "link";
      
      const isEditing = !!data.id;

      if (data.file && data.file.length > 0) {
        const file = data.file[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
             toast({
                variant: "destructive",
                title: "File Too Large",
                description: "Please upload files smaller than 5MB. For larger files, use the link option.",
            });
            setIsSubmitting(false);
            return;
        }
        fileUrl = await fileToDataURL(file);
        fileName = file.name;
        fileType = file.type;
      } else if (isEditing && !data.link) {
          const originalResource = resource!;
          fileUrl = originalResource.fileUrl;
          fileName = originalResource.fileName;
          fileType = originalResource.fileType;
      }


      if (!fileUrl) {
         throw new Error("No file or link provided.");
      }
      
      const resourceData: EducationalResource = {
        id: data.id,
        title: data.title,
        description: data.description,
        fileUrl,
        fileName,
        fileType,
        image: data.image || '',
      };

      const result = await addOrUpdateEducationalResource(resourceData);

      if (result.success) {
        toast({ title: "Success", description: `Educational resource ${isEditing ? 'updated' : 'saved'}.` });
        onSave();
        reset();
        setImagePreview(null);
      } else {
        throw new Error(result.error || "Failed to save resource to the database.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
      <Input type="hidden" {...register("image")} />
      <div>
        <Label htmlFor="resourceTitle">Title</Label>
        <Input id="resourceTitle" {...register("title")} disabled={isSubmitting} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="resourceDescription">Description</Label>
        <Textarea id="resourceDescription" {...register("description")} disabled={isSubmitting} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="resourceCoverImage">Upload Cover Image</Label>
        <Input
            id="resourceCoverImage"
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            disabled={isSubmitting}
        />
        {errors.image && <p className="text-red-500 text-sm">{(errors.image as any).message}</p>}
        {imagePreview && (
          <div className="mt-2 p-2 border rounded-md flex justify-center items-center h-32 bg-muted/50">
              <Image src={imagePreview} alt="Cover preview" width={200} height={120} className="object-contain max-h-full rounded-md" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="resourceFile">Upload Resource File (PDF, DOC, PPT, etc.)</Label>
        <Input
          id="resourceFile"
          type="file"
          {...fileRef}
          disabled={isSubmitting || !!linkValue}
        />
        {selectedFile && selectedFile.length > 0 && !linkValue && (
            <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile[0].name}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-grow border-t"></div>
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="flex-grow border-t"></div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="resourceLink">Link to Resource</Label>
        <Input id="resourceLink" {...register("link")} placeholder="https://example.com/resource.pdf" disabled={isSubmitting || (!!selectedFile && selectedFile.length > 0)} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
       {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}


      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost" disabled={isSubmitting}>Cancel</Button>
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
            <Label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2 p-4">
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
                    <div key={paper.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
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

function CounterForm({ onSave }: { onSave: () => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CounterFormType>({
    resolver: zodResolver(counterSchema),
    defaultValues: async () => {
        const counters = await getCounters();
        return counters || { members: 0, projects: 0, journals: 0, subscribers: 0 }
    }
  });

  const onSubmit: SubmitHandler<CounterFormType> = async (data) => {
    setIsSubmitting(true);
    const result = await updateCounters(data);
    if (result.success) {
      toast({ title: "Success", description: "Counters updated successfully." });
      onSave();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage Counters</CardTitle>
        <CardDescription>Update the statistics displayed on the homepage.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="members">Members</Label>
              <Input id="members" type="number" {...register("members")} />
              {errors.members && <p className="text-red-500 text-sm">{errors.members.message}</p>}
            </div>
            <div>
              <Label htmlFor="projects">Projects</Label>
              <Input id="projects" type="number" {...register("projects")} />
              {errors.projects && <p className="text-red-500 text-sm">{errors.projects.message}</p>}
            </div>
            <div>
              <Label htmlFor="journals">International Journals</Label>
              <Input id="journals" type="number" {...register("journals")} />
              {errors.journals && <p className="text-red-500 text-sm">{errors.journals.message}</p>}
            </div>
            <div>
              <Label htmlFor="subscribers">Subscribers</Label>
              <Input id="subscribers" type="number" {...register("subscribers")} />
              {errors.subscribers && <p className="text-red-500 text-sm">{errors.subscribers.message}</p>}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Counters
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function RegistrationManager({ registrations, onUpdate }: { registrations: Registration[], onUpdate: () => void }) {
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState<string | null>(null);
    const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

    const handleApprove = async (registration: Registration) => {
        setIsProcessing(registration.id!);
        const result = await approveRegistration(registration);
        if (result.success) {
            toast({ title: "Success", description: "Registration approved." });
            onUpdate();
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
        setIsProcessing(null);
    }

    const handleReject = async (registrationId: string) => {
        setIsProcessing(registrationId);
        const result = await rejectRegistration(registrationId);
        if (result.success) {
            toast({ title: "Success", description: "Registration rejected." });
            onUpdate();
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
        setIsProcessing(null);
    }
    
    const handleStatusChange = async (registration: Registration, newStatus: 'pending' | 'approved' | 'rejected') => {
        if (newStatus === registration.status) return;
        setIsProcessing(registration.id!);
        const result = await updateRegistrationStatus(registration.id!, newStatus, registration.status, registration);
        if (result.success) {
            toast({ title: "Success", description: "Registration status updated." });
            onUpdate();
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
        setIsProcessing(null);
    }

    const filteredRegistrations = useMemo(() => {
        return registrations.filter(reg => reg.status === filter);
    }, [registrations, filter]);

    const ActionButtons = ({reg}: {reg: Registration}) => {
        if (reg.status === 'pending') {
            return (
                <>
                    <Button size="sm" onClick={() => handleApprove(reg)} disabled={isProcessing === reg.id}>
                        {isProcessing === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(reg.id!)} disabled={isProcessing === reg.id}>
                        {isProcessing === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                    </Button>
                </>
            );
        }
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Member Registrations</CardTitle>
                <CardDescription>Review and manage new member registrations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    <Button variant={filter === 'pending' ? 'default' : 'outline'} onClick={() => setFilter('pending')}>Pending</Button>
                    <Button variant={filter === 'approved' ? 'default' : 'outline'} onClick={() => setFilter('approved')}>Approved</Button>
                    <Button variant={filter === 'rejected' ? 'default' : 'outline'} onClick={() => setFilter('rejected')}>Rejected</Button>
                </div>
                <div className="space-y-4">
                    {filteredRegistrations.length === 0 && <p className="text-muted-foreground text-center py-4">No {filter} registrations.</p>}
                    {filteredRegistrations.map((reg) => (
                        <div key={reg.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                            <div className="flex items-center gap-4">
                                <Image src={reg.photo} alt={reg.name} width={48} height={48} className="rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold">{reg.name}</p>
                                    <p className="text-sm text-muted-foreground">{reg.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>Registration Details</DialogTitle>
                                            <DialogDescription>Reviewing application for {reg.name}</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                                            <div className="md:col-span-1 flex flex-col items-center space-y-4">
                                                <Image src={reg.photo} alt={reg.name} width={128} height={128} className="rounded-full object-cover" />
                                                <div className="text-center">
                                                    <h3 className="font-bold text-lg">{reg.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{reg.email}</p>
                                                    <p className="text-sm text-muted-foreground">{reg.contact}</p>
                                                    <Badge variant="secondary" className="mt-2 capitalize">{reg.registrationType}</Badge>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-4">
                                                <div>
                                                    <h4 className="font-semibold text-sm">Biography</h4>
                                                    <p className="text-sm text-muted-foreground mt-1 max-h-32 overflow-y-auto">{reg.biography}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-sm">Social & Professional Links</h4>
                                                    <div className="flex flex-col space-y-2 mt-2">
                                                        {reg.linkedinUrl && <a href={reg.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><Linkedin /> LinkedIn</a>}
                                                        {reg.twitterUrl && <a href={reg.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><Twitter /> Twitter</a>}
                                                        {reg.otherSocialUrl && <a href={reg.otherSocialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><LinkIcon /> Other Link</a>}
                                                        {reg.scholarLink && <a href={reg.scholarLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><FileText /> Google Scholar</a>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-0 justify-between w-full">
                                            <div className="flex items-center gap-2">
                                               {reg.status === 'pending' ? (
                                                <>
                                                    <Button variant="destructive" onClick={() => {handleReject(reg.id!); (document.querySelector('[data-radix-dialog-close]') as HTMLElement)?.click();}} disabled={isProcessing === reg.id}>
                                                        {isProcessing === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4 mr-2" />}
                                                        Reject
                                                    </Button>
                                                    <Button onClick={() => {handleApprove(reg); (document.querySelector('[data-radix-dialog-close]') as HTMLElement)?.click();}} disabled={isProcessing === reg.id}>
                                                        {isProcessing === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                                        Approve
                                                    </Button>
                                                </>
                                               ) : (
                                                <Select onValueChange={(newStatus: 'pending' | 'approved' | 'rejected') => handleStatusChange(reg, newStatus)} disabled={isProcessing === reg.id}>
                                                  <SelectTrigger className="w-[180px]">
                                                    <div className="flex items-center gap-2">
                                                      {isProcessing === reg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                                                      <span>Change Status</span>
                                                    </div>
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectGroup>
                                                      <SelectLabel>New Status</SelectLabel>
                                                      <SelectItem value="pending" disabled={reg.status === 'pending'}>Pending</SelectItem>
                                                      <SelectItem value="approved" disabled={reg.status === 'approved'}>Approve</SelectItem>
                                                      <SelectItem value="rejected" disabled={reg.status === 'rejected'}>Reject</SelectItem>
                                                    </SelectGroup>
                                                  </SelectContent>
                                                </Select>
                                               )}
                                            </div>
                                            <DialogClose asChild>
                                                <Button variant="ghost">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <ActionButtons reg={reg} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function ContactMessageManager({ messages: initialMessages, onUpdate }: { messages: ContactMessage[], onUpdate: () => void }) {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    const result = await deleteContactMessage(id);
    if (result.success) {
      toast({ title: "Success", description: "Message deleted successfully." });
      onUpdate();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Messages</CardTitle>
        <CardDescription>View messages submitted through the contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initialMessages.length === 0 && <p className="text-muted-foreground text-center py-4">No messages yet.</p>}
          {initialMessages.map((msg) => (
            <div key={msg.id} className="p-4 border rounded-lg bg-muted/20">
              <div className="flex justify-between items-start">
                  <div>
                      <p className="font-semibold">{msg.name} <span className="text-sm text-muted-foreground font-normal">&lt;{msg.email}&gt;</span></p>
                      <p className="text-sm text-muted-foreground">{msg.phone} {msg.website && `| ${msg.website}`}</p>
                      <p className="text-sm text-muted-foreground">Received: {new Date(msg.createdAt.seconds * 1000).toLocaleString()}</p>
                  </div>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 flex-shrink-0"><Trash2 className="h-4 w-4" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                      <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                          This action will permanently delete the message from "{msg.name}".
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(msg.id!)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              </div>
              <p className="mt-4 bg-background p-3 rounded-md">{msg.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

type AdminPageContentProps = {
  courses: CourseType[];
  partners: Partner[];
  events: Event[];
  journals: Journal[];
  papers: DigitalLibraryPaper[];
  resources: EducationalResource[];
  registrations: Registration[];
  contactMessages: ContactMessage[];
  fetchData: () => void;
  handleDelete: (collection: 'courses' | 'partners' | 'events' | 'journals' | 'digital_library_papers' | 'educational_resources', id: string, filePath?: string) => void;
  getFileIcon: (fileType: string) => JSX.Element;
  activeView: string;
}

function AdminPageContent({
  courses,
  partners,
  events,
  journals,
  papers,
  resources,
  registrations,
  contactMessages,
  fetchData,
  handleDelete,
  getFileIcon,
  activeView
}: AdminPageContentProps) {
  if (activeView === 'courses') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Add, edit, or delete courses. Use the category 'free' for free courses.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
              <div key={course.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                 <div className="flex items-center gap-4">
                    <Image src={course.img || "https://picsum.photos/seed/placeholder/60/45"} alt={course.title} width={60} height={45} className="rounded-md object-cover" />
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
                    <DialogContent className="sm:max-w-[425px]">
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
                          This action will permanently delete the course "{course.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete('courses', course.id!, course.img)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  if (activeView === 'partners') {
    return (
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
            <DialogContent className="sm:max-w-[425px]">
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
              <div key={partner.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
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
                    <DialogContent className="sm:max-w-[425px]">
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
                          This action will permanently delete the partner "{partner.name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete('partners', partner.id!, partner.logo)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
   if (activeView === 'events') {
    return (
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
            <DialogContent className="sm:max-w-[425px]">
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
              <div key={event.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
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
                    <DialogContent className="sm:max-w-[425px]">
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
                           This action will permanently delete the event "{event.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete('events', event.id!, event.image)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
  if (activeView === 'journals') {
    return (
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
            <DialogContent className="sm:max-w-[425px]">
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
              <div key={journal.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
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
                    <DialogContent className="sm:max-w-[425px]">
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
                          This action will permanently delete the journal "{journal.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete('journals', journal.id!, journal.image)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
   if (activeView === 'library') {
    return (
      <DigitalLibraryManager papers={papers} onUpdate={fetchData} />
    )
  }
  if (activeView === 'resources') {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Educational Resources</CardTitle>
            <CardDescription>Add, edit, or delete educational resources.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Resource</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
              </DialogHeader>
              <EducationalResourceForm onSave={fetchData} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                <div className="flex items-center gap-4">
                  {resource.image ? (
                    <Image src={resource.image} alt={resource.title} width={60} height={45} className="rounded-md object-cover" />
                  ) : (
                    <div className="w-[60px] h-[45px] flex items-center justify-center bg-secondary rounded-md">
                      {getFileIcon(resource.fileType)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{resource.title}</p>
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline truncate max-w-xs block">{resource.fileName === 'link' ? resource.fileUrl : resource.fileName}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Resource</DialogTitle>
                      </DialogHeader>
                      <EducationalResourceForm onSave={fetchData} resource={resource}/>
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
                          This will permanently delete the resource "{resource.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete('educational_resources', resource.id!, resource.fileName)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }
   if (activeView === 'counters') {
    return (
      <CounterForm onSave={fetchData} />
    )
  }
  if (activeView === 'registrations') {
    return (
      <RegistrationManager registrations={registrations} onUpdate={fetchData} />
    )
  }
  if (activeView === 'messages') {
    return (
      <ContactMessageManager messages={contactMessages} onUpdate={fetchData} />
    )
  }

  return null;
}

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [partners, setPartners] =useState<Partner[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [papers, setPapers] = useState<DigitalLibraryPaper[]>([]);
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState("courses");

  const getSessionWithExpiry = (key: string) => {
    if (typeof window === 'undefined') return null;
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };


  useEffect(() => {
    const session = getSessionWithExpiry("adminSession");
    if (!session || !session.loggedIn) {
      router.replace("/panel");
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    const [coursesData, partnersData, eventsData, journalsData, papersData, resourcesData, registrationsData, messagesData] = await Promise.all([
      getCourses(),
      getPartners(),
      getEvents(),
      getJournals(),
      getDigitalLibraryPapers(),
      getEducationalResources(),
      getRegistrations(),
      getContactMessages(),
    ]);
    setCourses(coursesData as CourseType[]);
    setPartners(partnersData);
    setEvents(eventsData);
    setJournals(journalsData);
    setPapers(papersData);
    setResources(resourcesData as EducationalResource[]);
    setRegistrations(registrationsData);
    setContactMessages(messagesData as ContactMessage[]);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/");
  };


  const handleDelete = async (collection: 'courses' | 'partners' | 'events' | 'journals' | 'digital_library_papers' | 'educational_resources', id: string, filePath?: string) => {
    let result;
    if (collection === 'courses') result = await deleteCourse(id, filePath);
    if (collection === 'partners') result = await deletePartner(id, filePath);
    if (collection === 'events') result = await deleteEvent(id, filePath);
    if (collection === 'journals') result = await deleteJournal(id, filePath);
    if (collection === 'digital_library_papers') result = await deleteDigitalLibraryPaper(id);
    if (collection === 'educational_resources') result = await deleteEducationalResource(id, filePath);

    if (result?.success) {
      toast({ title: "Success", description: "Item deleted successfully." });
      fetchData();
    } else {
      toast({ variant: "destructive", title: "Error", description: result?.error || "Failed to delete item." });
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileCode className="h-5 w-5 text-red-500" />;
    if (fileType.includes("presentation") || fileType.includes("powerpoint")) return <Presentation className="h-5 w-5 text-orange-500" />;
    if (fileType.includes("document") || fileType.includes("word")) return <FileIcon className="h-5 w-5 text-blue-500" />;
    if (fileType === 'link') return <LinkIcon className="h-5 w-5 text-gray-500" />;
    return <FileIcon className="h-5 w-5 text-gray-500" />;
  };

  if (!isAuthenticated || loading) {
     return <div className="flex justify-center items-center min-h-screen bg-background"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  const sidebarItems = [
    { id: 'courses', label: 'Courses', icon: Book },
    { id: 'partners', label: 'Partners', icon: Handshake },
    { id: 'events', label: 'Events', icon: CalendarLucide },
    { id: 'journals', label: 'Journals', icon: Library },
    { id: 'library', label: 'Digital Library', icon: Book },
    { id: 'resources', label: 'Ed Resources', icon: GraduationCap },
    { id: 'counters', label: 'Counters', icon: LayoutDashboard },
    { id: 'registrations', label: 'Registrations', icon: CircleUserRound },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: contactMessages.length },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="bg-black text-white" collapsible="icon">
            <SidebarContent className="p-2 pt-8 flex flex-col">
                <SidebarGroup className="flex-1">
                    <SidebarMenu>
                    {sidebarItems.map(item => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                onClick={() => setActiveView(item.id)}
                                isActive={activeView === item.id}
                                className="text-white hover:bg-gray-700 data-[active=true]:bg-primary"
                            >
                                <item.icon />
                                {item.label}
                                {item.badge && item.badge > 0 && 
                                <Badge className="ml-auto bg-red-500 text-white">{item.badge}</Badge>
                                }
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroup>
                 <SidebarFooter className="p-2 mt-auto">
                    <Button variant="ghost" onClick={handleLogout} className="text-white hover:bg-gray-700 w-full justify-start">
                      <LogOut />
                      <span>Logout</span>
                    </Button>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4 md:p-6 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>

            <AdminPageContent
                courses={courses}
                partners={partners}
                events={events}
                journals={journals}
                papers={papers}
                resources={resources}
                registrations={registrations}
                contactMessages={contactMessages}
                fetchData={fetchData}
                handleDelete={handleDelete}
                getFileIcon={getFileIcon}
                activeView={activeView}
            />
        </main>
      </div>
    </SidebarProvider>
  );
}

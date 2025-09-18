
"use client";

import { useState, useEffect } from "react";
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
  getCourses,
  getPartners,
  getEvents,
  deleteCourse,
  deletePartner,
  deleteEvent,
} from "./actions";
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
import { Loader2, Trash2, Edit, LogOut } from "lucide-react";
import Image from "next/image";

// Zod Schemas
const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
  img: z.string().url("Must be a valid URL"),
  link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Partner name is required"),
  designation: z.string().min(1, "Designation is required"),
  logoUrl: z.string().url("Must be a valid URL"),
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
  image: z.string().url("Must be a valid URL for the image"),
  link: z.string().url("Must be a valid URL for the event"),
});

type Course = z.infer<typeof courseSchema>;
type Partner = z.infer<typeof partnerSchema>;
type Event = z.infer<typeof eventSchema>;

function CourseForm({ course, onSave }: { course?: Course; onSave: () => void }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: course || { category: 'ug', img: `https://picsum.photos/seed/${Math.random()}/400/300` },
  });

  const onSubmit: SubmitHandler<Course> = async (data) => {
    const result = await addOrUpdateCourse(data);
    if (result.success) {
      toast({ title: "Success", description: `Course ${course ? 'updated' : 'added'}.` });
      onSave();
      reset();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
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
        <Label htmlFor="courseImg">Image URL</Label>
        <Input id="courseImg" placeholder="https://picsum.photos/seed/course/400/300" {...register("img")} />
        {errors.img && <p className="text-red-500 text-sm">{errors.img.message}</p>}
      </div>
      <div>
        <Label htmlFor="courseImgFile">Or Upload Image</Label>
        <Input id="courseImgFile" type="file" />
         <p className="text-sm text-muted-foreground pt-1">File upload is not yet functional.</p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save Course</Button>
      </DialogFooter>
    </form>
  );
}

function PartnerForm({ partner, onSave }: { partner?: Partner; onSave: () => void }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partner>({
    resolver: zodResolver(partnerSchema),
    defaultValues: partner || { logoUrl: `https://picsum.photos/seed/${Math.random()}/150/80`},
  });

  const onSubmit: SubmitHandler<Partner> = async (data) => {
    const result = await addOrUpdatePartner(data);
    if (result.success) {
      toast({ title: "Success", description: `Partner ${partner ? 'updated' : 'added'}.` });
      onSave();
      reset();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input type="hidden" {...register("id")} />
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
        <Label htmlFor="partnerLogoUrl">Logo URL</Label>
        <Input id="partnerLogoUrl" {...register("logoUrl")} />
        {errors.logoUrl && <p className="text-red-500 text-sm">{errors.logoUrl.message}</p>}
      </div>
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
        <Button type="submit">Save Partner</Button>
      </DialogFooter>
    </form>
  );
}

function EventForm({ event, onSave }: { event?: Event; onSave: () => void }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: event || { image: `https://picsum.photos/seed/${Math.random()}/600/400` },
  });

  const onSubmit: SubmitHandler<Event> = async (data) => {
    const result = await addOrUpdateEvent(data);
    if (result.success) {
      toast({ title: "Success", description: `Event ${event ? 'updated' : 'added'}.` });
      onSave();
      reset();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Input type="hidden" {...register("id")} />
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
        <Label htmlFor="eventImage">Image URL</Label>
        <Input id="eventImage" {...register("image")} />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>
      <div>
        <Label htmlFor="eventLink">Event Link</Label>
        <Input id="eventLink" {...register("link")} />
        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save Event</Button>
      </DialogFooter>
    </form>
  );
}


export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    const [coursesData, partnersData, eventsData] = await Promise.all([
      getCourses(),
      getPartners(),
      getEvents(),
    ]);
    setCourses(coursesData);
    setPartners(partnersData);
    setEvents(eventsData);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/");
  };


  const handleDelete = async (collection: 'courses' | 'partners' | 'events', id: string) => {
    let result;
    if (collection === 'courses') result = await deleteCourse(id);
    if (collection === 'partners') result = await deletePartner(id);
    if (collection === 'events') result = await deleteEvent(id);

    if (result?.success) {
      toast({ title: "Success", description: "Item deleted successfully." });
      fetchData();
    } else {
      toast({ variant: "destructive", title: "Error", description: result?.error });
    }
  }

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

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Manage Courses</TabsTrigger>
          <TabsTrigger value="partners">Manage Partners</TabsTrigger>
          <TabsTrigger value="events">Manage Events</TabsTrigger>
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
                  <CourseForm onSave={() => fetchData()} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-2 border rounded-md">
                     <div className="flex items-center gap-4">
                        <Image src={course.img} alt={course.title} width={60} height={45} className="rounded-md" />
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
                        <Image src={partner.logoUrl} alt={partner.name} width={40} height={40} className="rounded-md object-contain" />
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
                        <Image src={event.image} alt={event.title} width={60} height={45} className="rounded-md" />
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
      </Tabs>
    </div>
  );
}

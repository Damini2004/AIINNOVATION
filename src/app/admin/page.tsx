"use client";

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

// Zod Schemas for validation
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  category: z.string().min(1, "Category is required"),
});

const partnerSchema = z.object({
  name: z.string().min(1, "Partner name is required"),
  logoUrl: z.string().url("Must be a valid URL"),
});

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL for the image"),
  link: z.string().url("Must be a valid URL for the event"),
});

type CourseInputs = z.infer<typeof courseSchema>;
type PartnerInputs = z.infer<typeof partnerSchema>;
type EventInputs = z.infer<typeof eventSchema>;

export default function AdminPage() {
  const { toast } = useToast();

  const {
    register: registerCourse,
    handleSubmit: handleCourseSubmit,
    formState: { errors: courseErrors },
    reset: resetCourseForm,
  } = useForm<CourseInputs>({
    resolver: zodResolver(courseSchema),
  });

  const {
    register: registerPartner,
    handleSubmit: handlePartnerSubmit,
    formState: { errors: partnerErrors },
    reset: resetPartnerForm,
  } = useForm<PartnerInputs>({
    resolver: zodResolver(partnerSchema),
  });

  const {
    register: registerEvent,
    handleSubmit: handleEventSubmit,
    formState: { errors: eventErrors },
    reset: resetEventForm,
  } = useForm<EventInputs>({
    resolver: zodResolver(eventSchema),
  });

  const onCourseSubmit: SubmitHandler<CourseInputs> = (data) => {
    console.log("New Course Data:", data);
    toast({ title: "Course Submitted", description: "Check console for data." });
    resetCourseForm();
  };

  const onPartnerSubmit: SubmitHandler<PartnerInputs> = (data) => {
    console.log("New Partner Data:", data);
    toast({ title: "Partner Submitted", description: "Check console for data." });
    resetPartnerForm();
  };

  const onEventSubmit: SubmitHandler<EventInputs> = (data) => {
    console.log("New Event Data:", data);
    toast({ title: "Event Submitted", description: "Check console for data. NOTE: This will not yet update Firestore." });
    resetEventForm();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses">Add Course</TabsTrigger>
          <TabsTrigger value="partners">Add Partner</TabsTrigger>
          <TabsTrigger value="events">Add Event</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Add New Course</CardTitle>
              <CardDescription>Fill out the form to add a new course.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCourseSubmit(onCourseSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="courseTitle">Title</Label>
                  <Input id="courseTitle" {...registerCourse("title")} />
                  {courseErrors.title && <p className="text-red-500 text-sm">{courseErrors.title.message}</p>}
                </div>
                <div>
                  <Label htmlFor="courseDescription">Description</Label>
                  <Textarea id="courseDescription" {...registerCourse("description")} />
                  {courseErrors.description && <p className="text-red-500 text-sm">{courseErrors.description.message}</p>}
                </div>
                <div>
                  <Label htmlFor="courseDuration">Duration</Label>
                  <Input id="courseDuration" {...registerCourse("duration")} />
                  {courseErrors.duration && <p className="text-red-500 text-sm">{courseErrors.duration.message}</p>}
                </div>
                <div>
                  <Label htmlFor="courseCategory">Category</Label>
                  <Input id="courseCategory" placeholder="e.g. school, ug, pgphd" {...registerCourse("category")} />
                  {courseErrors.category && <p className="text-red-500 text-sm">{courseErrors.category.message}</p>}
                </div>
                <Button type="submit">Add Course</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Add New Partner</CardTitle>
              <CardDescription>Fill out the form to add a new partner.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePartnerSubmit(onPartnerSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="partnerName">Partner Name</Label>
                  <Input id="partnerName" {...registerPartner("name")} />
                  {partnerErrors.name && <p className="text-red-500 text-sm">{partnerErrors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="partnerLogoUrl">Logo URL</Label>
                  <Input id="partnerLogoUrl" {...registerPartner("logoUrl")} />
                  {partnerErrors.logoUrl && <p className="text-red-500 text-sm">{partnerErrors.logoUrl.message}</p>}
                </div>
                <Button type="submit">Add Partner</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
           <Card>
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
              <CardDescription>Fill out the form to add a new event. Note: this does not currently save to the database.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEventSubmit(onEventSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="eventTitle">Title</Label>
                  <Input id="eventTitle" {...registerEvent("title")} />
                  {eventErrors.title && <p className="text-red-500 text-sm">{eventErrors.title.message}</p>}
                </div>
                 <div>
                  <Label htmlFor="eventSubtitle">Subtitle</Label>
                  <Input id="eventSubtitle" {...registerEvent("subtitle")} />
                  {eventErrors.subtitle && <p className="text-red-500 text-sm">{eventErrors.subtitle.message}</p>}
                </div>
                <div>
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea id="eventDescription" {...registerEvent("description")} />
                  {eventErrors.description && <p className="text-red-500 text-sm">{eventErrors.description.message}</p>}
                </div>
                <div>
                  <Label htmlFor="eventCategory">Category</Label>
                  <Input id="eventCategory" {...registerEvent("category")} />
                  {eventErrors.category && <p className="text-red-500 text-sm">{eventErrors.category.message}</p>}
                </div>
                <div>
                  <Label htmlFor="eventImage">Image URL</Label>
                  <Input id="eventImage" {...registerEvent("image")} />
                  {eventErrors.image && <p className="text-red-500 text-sm">{eventErrors.image.message}</p>}
                </div>
                <div>
                  <Label htmlFor="eventLink">Event Link</Label>
                  <Input id="eventLink" {...registerEvent("link")} />
                  {eventErrors.link && <p className="text-red-500 text-sm">{eventErrors.link.message}</p>}
                </div>
                <Button type="submit">Add Event</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
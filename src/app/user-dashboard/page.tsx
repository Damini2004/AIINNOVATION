
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, updateUserProfile } from "../registrations/actions";
import { Loader2, Edit, Save, X, LogOut, UploadCloud, Linkedin, Twitter, Link as LinkIcon, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function UserDashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem("userEmail");
      const isLoggedIn = localStorage.getItem("isUserLoggedIn");
      
      if (!isLoggedIn || !email) {
        router.push("/registrations");
        return;
      }
      
      setLoading(true);
      const result = await getUserProfile(email);
      if (result.success && result.data) {
        setProfile(result.data);
        form.reset(result.data);
        setPhotoPreview(result.data.photo);
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to load profile." });
        router.push("/");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [router, toast, form]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({ variant: "destructive", title: "File Too Large", description: "Please upload an image smaller than 2MB." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("photo", base64String, { shouldValidate: true });
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<UserProfileFormValues> = async (data) => {
    setIsSubmitting(true);
    const result = await updateUserProfile(profile.id, data);
    setIsSubmitting(false);

    if (result.success) {
      toast({ title: "Success", description: "Profile updated successfully." });
      setProfile({ ...profile, ...data });
      setIsEditing(false);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/");
  };


  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader><Skeleton className="h-8 w-48" /></CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-40 w-40 rounded-full mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/3 mx-auto" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return <div className="container mx-auto py-10">User not found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
       <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Profile Information</CardTitle>
            <CardDescription>View and edit your personal details.</CardDescription>
          </div>
          <Button variant={isEditing ? "destructive" : "outline"} size="icon" onClick={() => { setIsEditing(!isEditing); if(isEditing) form.reset(profile); }}>
            {isEditing ? <X className="h-4 w-4"/> : <Edit className="h-4 w-4" />}
          </Button>
        </CardHeader>
        {isEditing ? (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
               <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Image src={photoPreview || profile.photo} alt={profile.name} width={160} height={160} className="rounded-full object-cover border-4 border-primary" />
                  <label htmlFor="photo-edit" className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    <UploadCloud className="h-5 w-5" />
                    <Input id="photo-edit" type="file" className="sr-only" onChange={handlePhotoChange} accept="image/*" />
                  </label>
                </div>
                 {form.formState.errors.photo && <p className="text-red-500 text-sm">{form.formState.errors.photo.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...form.register("name")} />
                  {form.formState.errors.name && <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>}
                </div>
                 <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" {...form.register("contact")} />
                  {form.formState.errors.contact && <p className="text-red-500 text-sm">{form.formState.errors.contact.message}</p>}
                </div>
              </div>
              <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={profile.email} disabled className="cursor-not-allowed bg-muted/50" />
              </div>

               <div>
                <Label htmlFor="biography">Biography</Label>
                <Textarea id="biography" {...form.register("biography")} className="min-h-[120px]" />
                {form.formState.errors.biography && <p className="text-red-500 text-sm">{form.formState.errors.biography.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input id="linkedinUrl" {...form.register("linkedinUrl")} />
                    {form.formState.errors.linkedinUrl && <p className="text-red-500 text-sm">{form.formState.errors.linkedinUrl.message}</p>}
                  </div>
                   <div>
                    <Label htmlFor="twitterUrl">Twitter URL</Label>
                    <Input id="twitterUrl" {...form.register("twitterUrl")} />
                    {form.formState.errors.twitterUrl && <p className="text-red-500 text-sm">{form.formState.errors.twitterUrl.message}</p>}
                  </div>
                   <div>
                    <Label htmlFor="otherSocialUrl">Other Social URL</Label>
                    <Input id="otherSocialUrl" {...form.register("otherSocialUrl")} />
                    {form.formState.errors.otherSocialUrl && <p className="text-red-500 text-sm">{form.formState.errors.otherSocialUrl.message}</p>}
                  </div>
                   <div>
                    <Label htmlFor="scholarLink">Google Scholar URL</Label>
                    <Input id="scholarLink" {...form.register("scholarLink")} />
                    {form.formState.errors.scholarLink && <p className="text-red-500 text-sm">{form.formState.errors.scholarLink.message}</p>}
                  </div>
              </div>

            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
                <Image src={profile.photo} alt={profile.name} width={160} height={160} className="rounded-full object-cover border-4 border-primary" />
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <p className="text-muted-foreground">{profile.contact}</p>
                    <p className="text-sm text-primary font-semibold capitalize mt-1">{profile.registrationType}</p>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2 border-b pb-2">Biography</h3>
                <p className="text-muted-foreground">{profile.biography}</p>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2 border-b pb-2">Links</h3>
                <div className="flex flex-col space-y-2 mt-2">
                    {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><Linkedin /> LinkedIn</a>}
                    {profile.twitterUrl && <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><Twitter /> Twitter</a>}
                    {profile.otherSocialUrl && <a href={profile.otherSocialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><LinkIcon /> Other Link</a>}
                    {profile.scholarLink && <a href={profile.scholarLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2"><FileText /> Google Scholar</a>}
                </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}


"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import { handleRegistration } from "./actions";

const registrationSchema = z.object({
  registrationType: z.enum(["student", "professional", "member"], {
    required_error: "Please select a registration type.",
  }),
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  contact: z.string().min(10, "Please enter a valid contact number."),
  biography: z
    .string()
    .max(2000, "Biography must not exceed 400 words (approx. 2000 characters).")
    .min(10, "Biography is required."),
  photo: z.string().url("Photo upload is required.").min(1, "Photo upload is required."),
  socials: z.string().url("Please enter a valid URL for social links.").optional().or(z.literal('')),
  scholarLink: z.string().url("Please enter a valid Google Scholar URL.").optional().or(z.literal('')),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      biography: "",
      photo: "",
      socials: "",
      scholarLink: "",
    },
  });

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please upload an image smaller than 2MB.",
        });
        return;
      }
      setIsSubmitting(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue("photo", base64String, { shouldValidate: true });
        setPhotoPreview(base64String);
        setIsSubmitting(false);
      };
      reader.onerror = () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to read file." });
        setIsSubmitting(false);
      }
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await handleRegistration(data);
       if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "Thank you for joining AIIS. We will be in touch shortly.",
        });
        form.reset();
        setPhotoPreview(null);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="form-card">
          <FormField
            control={form.control}
            name="registrationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your registration type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="form-card">
          <h3 className="form-section-title">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} disabled={isSubmitting}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="form-card">
           <h3 className="form-section-title">Profile Details</h3>
            <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                        <div className="photo-upload-area">
                        <Input
                            id="photo-upload"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handlePhotoChange}
                            disabled={isSubmitting}
                        />
                        <label htmlFor="photo-upload" className="photo-upload-label">
                            {photoPreview ? (
                            <Image
                                src={photoPreview}
                                alt="Photo preview"
                                fill
                                className="object-cover rounded-full"
                            />
                            ) : (
                            <div className="photo-upload-placeholder">
                                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                Click to upload or drag & drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                PNG, JPG, GIF up to 2MB
                                </p>
                            </div>
                            )}
                        </label>
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Biography (max 400 words)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about yourself, your work, and your interests in AI."
                      className="min-h-[150px]"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

         <div className="form-card">
          <h3 className="form-section-title">Professional Links</h3>
           <div className="space-y-6">
            <FormField
              control={form.control}
              name="socials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Socials (LinkedIn, Twitter, etc.)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.linkedin.com/in/yourprofile/" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scholarLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Scholar Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://scholar.google.com/citations?user=..." {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Registration
          </Button>
        </div>
      </form>
    </Form>
  );
}

    
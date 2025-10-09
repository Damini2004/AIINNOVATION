
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getUserProfile } from "./actions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setSessionWithExpiry = (key: string, value: object, ttl: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }


  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // 1. Authenticate with Firebase
      await signInWithEmailAndPassword(auth, data.email, data.password);

      // 2. Check if the user's registration is approved in Firestore
      const result = await getUserProfile(data.email);

      if (result.success && result.data) {
        if (result.data.status === 'approved') {
          const sessionTTL = 60 * 60 * 1000; // 1 hour
          setSessionWithExpiry('userSession', { loggedIn: true, user: result.data }, sessionTTL);
          toast({
            title: "Login Successful",
            description: `Welcome back, ${result.data.name}!`,
          });
          router.push("/user-dashboard");
        } else if (result.data.status === 'pending') {
          await auth.signOut();
          throw new Error("Your registration is still pending approval.");
        } else {
           await auth.signOut();
           throw new Error("Your registration was not approved. Please contact support.");
        }
      } else {
        // This will catch errors from the server action, like "User not found"
        await auth.signOut();
        throw new Error(result.error || "Could not find user profile.");
      }
    } catch (error: any) {
      // This catches both Firebase Auth errors and custom errors from our logic
      let errorMessage = "An unknown error occurred.";
       if (error.code) { // Firebase Auth errors
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
          case 'auth/wrong-password':
            errorMessage = "Invalid credentials. Please check your email and password.";
            break;
          default:
            errorMessage = "Failed to login. Please try again.";
            break;
        }
      } else { // Custom errors from our logic
          errorMessage = error.message;
      }
       toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-2">
        Login to Your Account
      </h2>
      <p className="text-muted-foreground text-center mb-10">
        Welcome back! Please enter your details.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}

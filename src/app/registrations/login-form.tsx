
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
import { handleLogin } from "./actions";

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
    const result = await handleLogin(data);
    setIsLoading(false);

    if (result.success) {
      const sessionTTL = 60 * 1000; // 1 minute
      if (result.isAdmin) {
        setSessionWithExpiry('adminSession', { loggedIn: true }, sessionTTL);
        toast({
          title: "Admin Login Successful",
          description: "Redirecting to admin dashboard...",
        });
        router.push("/admin");
      } else {
         setSessionWithExpiry('userSession', { loggedIn: true, user: result.user }, sessionTTL);
         toast({
          title: "Login Successful",
          description: `Welcome back, ${result.user?.name || 'user'}!`,
        });
        router.push("/user-dashboard");
      }
    } else {
       toast({
          variant: "destructive",
          title: "Login Failed",
          description: result.error || "An unknown error occurred.",
        });
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

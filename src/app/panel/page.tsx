
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { handleLogin } from "../registrations/actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const getSessionWithExpiry = (key: string) => {
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
    if (session && session.loggedIn) {
      router.replace("/admin");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);


  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await handleLogin({ email, password });
    
    setIsLoading(false);

    if (result.success && result.isAdmin) {
        const sessionTTL = 60 * 60 * 1000; // 1 hour
        const now = new Date();
        const item = {
          value: { loggedIn: true },
          expiry: now.getTime() + sessionTTL,
        };
        localStorage.setItem("adminSession", JSON.stringify(item));

        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard...",
        });
        router.push("/admin");
    } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: result.error || "Invalid email or password.",
        });
    }
  };

  if (isCheckingAuth) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-background">
         <Loader2 className="h-8 w-8 animate-spin" />
       </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Super Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to the admin dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLoginSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="superadmin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

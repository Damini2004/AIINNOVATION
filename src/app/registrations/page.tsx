
"use client";

import Link from "next/link";
import { useState } from "react";
import RegistrationForm from "./registration-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import LoginForm from "./login-form";

export default function RegistrationsPage() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  const slideIn = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" }},
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" }}
  };

  const slideOut = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" }},
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.5, ease: "easeIn" }}
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="py-32 bg-secondary relative bg-cover bg-center"
        style={{ backgroundImage: "url(/assests/images/brid.png)" }}
        data-ai-hint="abstract geometric"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">Join Us</h1>
          <div className="text-sm mt-2">
            <Link href="/" className="hover:text-primary">
              HOME
            </Link>
            <span className="mx-2 text-muted-foreground">&gt;</span>
            <span className="text-primary font-medium">REGISTRATION</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative bg-card border rounded-lg shadow-lg min-h-[700px] overflow-hidden flex">
            <AnimatePresence mode="wait">
              {!isLogin ? (
                <motion.div
                  key="signup"
                  className="w-full lg:w-1/2 p-8 md:p-12"
                  variants={slideIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <RegistrationForm />
                </motion.div>
              ) : (
                <motion.div
                  key="login-prompt"
                  className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-primary text-primary-foreground"
                   variants={slideOut}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                    <h2 className="text-3xl font-bold mb-4">New Here?</h2>
                    <p className="mb-8 max-w-sm">Sign up and discover a great amount of new opportunities!</p>
                    <Button variant="outline" size="lg" onClick={toggleForm} className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Sign Up
                    </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
             <AnimatePresence mode="wait">
               {isLogin ? (
                  <motion.div
                    key="login"
                    className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center"
                    variants={slideIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <LoginForm />
                </motion.div>
               ) : (
                 <motion.div
                  key="signup-prompt"
                  className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center bg-primary text-primary-foreground"
                  variants={slideOut}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                    <h2 className="text-3xl font-bold mb-4">One of Us?</h2>
                    <p className="mb-8 max-w-sm">If you already have an account, just sign in. We've missed you!</p>
                    <Button variant="outline" size="lg" onClick={toggleForm} className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Login
                    </Button>
                </motion.div>
               )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

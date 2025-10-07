
"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Loader2,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/admin/actions";

export default function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await submitContactForm(form);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch shortly.",
      });
      setForm({ name: "", email: "", phone: "", website: "", message: "" });
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.error || "An unexpected error occurred.",
      });
    }
  };

  return (
    <section className="bg-blue-950 py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Contact Info */}
        <div className="bg-primary rounded-lg p-8 space-y-6">
          {/* Location */}
          <div className="flex items-start border-b border-dashed border-primary-foreground/50 pb-6">
            <MapPin className="w-12 h-12 text-primary-foreground mt-2 mr-6 shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-primary-foreground mb-2">Location</h4>
            
              <p className="text-primary-foreground/90 mt-2">
                201, Planet Apt.
                <br />
                Omkar Nagar, Nagpur Maharashtra India
              </p>
              <p className="text-primary-foreground/90 mt-2">
                702, Godrej Riverhills
                <br />
                Pune Maharashtra India
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start border-b border-dashed border-primary-foreground/50 pb-6">
            <Phone className="w-12 h-12 text-primary-foreground mt-2 mr-6 shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-primary-foreground mb-2">Make A Call</h4>
              <p className="text-primary-foreground/90">+91 7020892896</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start border-b border-dashed border-primary-foreground/50 pb-6">
            <Mail className="w-12 h-12 text-primary-foreground mt-2 mr-6 shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-primary-foreground mb-2">Send A Mail</h4>
              <p className="text-primary-foreground/90">info@aiinsociety.in</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-start">
            <Globe className="w-12 h-12 text-primary-foreground mt-2 mr-6 shrink-0" />
            <div>
              <h4 className="text-xl font-bold text-primary-foreground mb-2">
                Visit Our Website
              </h4>
              <p className="text-primary-foreground/90">www.aiinsociety.in</p>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div>
          <div className="mb-8">
            <h5 className="text-primary text-sm font-semibold uppercase">CONTACT US</h5>
            <h2 className="text-3xl font-bold text-white mt-2">
              Get In Touch
            </h2>
            <div className="em_bar_bg text-left"></div>
            <p className="text-lg text-gray-300 mt-4">
              Be a part of something bigger. Reach out to us for queries,
              collaborations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="bg-white/10 text-white placeholder:text-gray-400"
                required
                disabled={isLoading}
              />
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                 className="bg-white/10 text-white placeholder:text-gray-400"
                 required
                 disabled={isLoading}
              />
              <Input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                 className="bg-white/10 text-white placeholder:text-gray-400"
                 disabled={isLoading}
              />
              <Input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Website"
                 className="bg-white/10 text-white placeholder:text-gray-400"
                 disabled={isLoading}
              />
            </div>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              className="h-44 bg-white/10 text-white placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

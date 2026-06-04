"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    detail: "+1 (555) 123-4567",
    subtitle: "Mon-Fri 8AM-8PM, Sat-Sun 9AM-5PM",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "info@nursenow.com",
    subtitle: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    detail: "123 Healthcare Blvd",
    subtitle: "Medical City, MC 12345",
  },
  {
    icon: Clock,
    title: "Emergency Line",
    detail: "+1 (555) 999-0000",
    subtitle: "Available 24/7 for urgent requests",
  },
];

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-muted-foreground">
            Have questions? We&apos;re here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold">Send Us a Message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form and we&apos;ll get back to you shortly.
              </p>
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Smith" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us more about your inquiry..."
                    className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <Card key={info.title}>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="text-sm font-medium">{info.detail}</p>
                    <p className="text-xs text-muted-foreground">
                      {info.subtitle}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold">Need Urgent Care?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  For emergency nursing requests, call our 24/7 hotline or book
                  through our platform for the fastest response.
                </p>
                <Button className="mt-4" variant="default">
                  Book Emergency Nurse
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

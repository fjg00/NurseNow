"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState<"patient" | "nurse">("patient");

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Stethoscope className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Create an Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join NurseNow as a patient or nurse
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex rounded-lg bg-muted p-1">
              <button
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  role === "patient"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground"
                }`}
                onClick={() => setRole("patient")}
              >
                Patient
              </button>
              <button
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                  role === "nurse"
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground"
                }`}
                onClick={() => setRole("nurse")}
              >
                Nurse
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="mt-1"
                />
              </div>

              {role === "nurse" && (
                <>
                  <div className="border-t pt-4">
                    <p className="mb-3 text-sm font-semibold text-muted-foreground">
                      Professional Information
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="license">Nursing License Number</Label>
                    <Input
                      id="license"
                      placeholder="RN-123456"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      placeholder="e.g., Elder Care, Pediatric"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="5"
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full">
                Create {role === "patient" ? "Patient" : "Nurse"} Account
              </Button>
            </form>

            {role === "nurse" && (
              <p className="mt-4 text-xs text-center text-muted-foreground">
                Nurse accounts require verification by our admin team before
                activation. You&apos;ll be notified once approved.
              </p>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

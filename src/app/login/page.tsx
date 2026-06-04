"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<"patient" | "nurse">("patient");

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Stethoscope className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your NurseNow account
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button className="text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <Link
                href={
                  role === "patient"
                    ? "/patient/dashboard"
                    : "/nurse/dashboard"
                }
              >
                <Button className="w-full mt-2">
                  Sign In as {role === "patient" ? "Patient" : "Nurse"}
                </Button>
              </Link>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

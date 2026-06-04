"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, User, MapPin, Clock } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const booking = {
    id: searchParams.get("id") || "B0000",
    service: searchParams.get("service") || "N/A",
    nurse: searchParams.get("nurse") || "N/A",
    date: searchParams.get("date") || "N/A",
    time: searchParams.get("time") || "N/A",
    address: searchParams.get("address") || "N/A",
    amount: searchParams.get("amount") || "0",
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="mx-auto w-full max-w-lg px-4">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Booking Confirmed!</h1>
          <p className="mt-1 text-muted-foreground">
            Your nursing visit has been scheduled successfully.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 text-center">
              <span className="text-sm text-muted-foreground">
                Booking Reference
              </span>
              <p className="text-lg font-bold font-mono text-primary">
                {booking.id}
              </p>
            </div>

            <div className="space-y-3 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Service:</span>
                <span className="ml-auto font-medium">{booking.service}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Nurse:</span>
                <span className="ml-auto font-medium">{booking.nurse}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-auto font-medium">{booking.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Time:</span>
                <span className="ml-auto font-medium">{booking.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Address:</span>
                <span className="ml-auto font-medium text-right max-w-[180px]">
                  {booking.address}
                </span>
              </div>
              <div className="border-t pt-3 flex items-center justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary">
                  ${booking.amount}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              You&apos;ll receive a confirmation email with further details.
              The nurse will contact you before the visit.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Link href="/patient/dashboard" className="flex-1">
            <Button variant="outline" className="w-full">
              View My Bookings
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}

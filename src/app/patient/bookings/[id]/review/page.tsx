"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getBookingById } from "@/lib/mock-data";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const booking = getBookingById(id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!booking) {
    notFound();
  }

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Thank You!</h1>
          <p className="mt-2 text-muted-foreground">
            Your review for {booking.nurseName} has been submitted successfully.
          </p>
          <div className="mt-3">
            <StarRating rating={rating} size="lg" />
          </div>
          <div className="mt-6 flex gap-3">
            <Link href={`/patient/bookings/${booking.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Back to Booking
              </Button>
            </Link>
            <Link href="/patient/dashboard" className="flex-1">
              <Button className="w-full">Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <Link
          href={`/patient/bookings/${booking.id}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Booking
        </Link>

        <h1 className="text-2xl font-bold mb-2">Leave a Review</h1>
        <p className="text-muted-foreground mb-8">
          Share your experience with{" "}
          <span className="font-medium text-foreground">
            {booking.nurseName}
          </span>{" "}
          for your {booking.service} visit.
        </p>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {booking.nurseName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium">{booking.nurseName}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.service} &middot; {booking.date}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium block mb-3">
                How would you rate your experience?
              </label>
              <div className="flex justify-center">
                <StarRating rating={rating} onRate={setRating} size="lg" />
              </div>
              {rating > 0 && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="comment" className="text-sm font-medium block mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <Button
              className="w-full"
              disabled={rating === 0 || !comment.trim()}
              onClick={() => setSubmitted(true)}
            >
              Submit Review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

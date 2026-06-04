"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import {
  ShieldCheck,
  Clock,
  Award,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import {
  getNurseById,
  getReviewsForNurse,
  nurseAvailability,
} from "@/lib/mock-data";

export default function NurseProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const nurse = getNurseById(id);

  if (!nurse) {
    notFound();
  }

  const nurseReviews = getReviewsForNurse(nurse.name);
  const availability = nurseAvailability[nurse.id] || [];

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/nurses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Nurses
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {nurse.avatar}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <h1 className="text-xl font-bold">{nurse.name}</h1>
                  {nurse.isVerified && (
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {nurse.specialization}
                </p>
                <div className="mt-3 flex items-center justify-center">
                  <StarRating rating={Math.round(nurse.rating)} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {nurse.rating} ({nurse.reviewCount} reviews)
                  </span>
                </div>
                <Badge
                  className="mt-3"
                  variant={nurse.isAvailable ? "default" : "secondary"}
                >
                  {nurse.isAvailable ? "Available" : "Unavailable"}
                </Badge>
                {nurse.isAvailable && (
                  <Link href={`/book?nurse=${nurse.id}`} className="block mt-4">
                    <Button className="w-full">Book This Nurse</Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-3">Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Experience
                    </div>
                    <span className="font-medium">
                      {nurse.yearsExperience} years
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      Specialization
                    </div>
                    <span className="font-medium">{nurse.specialization}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Hourly Rate
                    </div>
                    <span className="font-medium text-primary">
                      ${nurse.hourlyRate}/hr
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold">About</h2>
                <p className="mt-2 text-muted-foreground">{nurse.bio}</p>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Weekly Availability
                </h2>
                {availability.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No availability information.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {availability.map((day) => (
                      <div key={day.day} className="flex items-start gap-3">
                        <span className="w-24 shrink-0 text-sm font-medium">
                          {day.day}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {day.slots.map((slot) => (
                            <Badge key={slot} variant="outline" className="text-xs">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Patient Reviews ({nurseReviews.length})
                </h2>
                {nurseReviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {nurseReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                              {review.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm font-medium">
                              {review.patientName}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-2">
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

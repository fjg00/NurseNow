"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusTimeline } from "@/components/StatusTimeline";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Stethoscope,
  DollarSign,
  Star,
  XCircle,
} from "lucide-react";
import { getBookingById, getNurseById } from "@/lib/mock-data";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const booking = getBookingById(id);

  if (!booking) {
    notFound();
  }

  const nurse = getNurseById(booking.nurseId);
  const canCancel =
    booking.status === "pending" || booking.status === "confirmed";
  const canReview = booking.status === "completed";

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/patient/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Booking {booking.id}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {booking.service}
            </p>
          </div>
          <Badge className={`text-sm px-3 py-1 ${statusStyles[booking.status]}`}>
            {booking.status}
          </Badge>
        </div>

        {/* Status Timeline */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">Booking Status</h2>
            <div className="flex justify-center">
              <StatusTimeline status={booking.status} />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Booking Details */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Visit Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Service</p>
                    <p className="text-sm font-medium">{booking.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">{booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">{booking.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">{booking.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className="text-sm font-bold text-primary">
                      ${booking.amount}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nurse Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Your Nurse</h2>
              {nurse ? (
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                      {nurse.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{nurse.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {nurse.specialization}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {nurse.rating} ({nurse.reviewCount} reviews)
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {nurse.bio}
                  </p>
                  <Link href={`/nurses/${nurse.id}`}>
                    <Button variant="outline" size="sm" className="mt-3">
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{booking.nurseName}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          {canCancel && (
            <Button variant="outline" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
              <XCircle className="h-4 w-4" />
              Cancel Booking
            </Button>
          )}
          {canReview && (
            <Link href={`/patient/bookings/${booking.id}/review`}>
              <Button className="gap-1">
                <Star className="h-4 w-4" />
                Leave a Review
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  ArrowRight,
  User,
} from "lucide-react";
import { bookings, patientStats, reviews } from "@/lib/mock-data";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function PatientDashboard() {
  const patientBookings = bookings.filter(
    (b) => b.patientName === "John Smith"
  );
  const upcomingBookings = patientBookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  );
  const pastBookings = patientBookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome back, John
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here&apos;s an overview of your healthcare bookings
            </p>
          </div>
          <Link href="/services">
            <Button className="gap-2">
              Book a Nurse
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {patientStats.totalBookings}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Bookings
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {patientStats.upcomingVisits}
                </p>
                <p className="text-xs text-muted-foreground">
                  Upcoming Visits
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {patientStats.completedVisits}
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed Visits
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${patientStats.totalSpent}
                </p>
                <p className="text-xs text-muted-foreground">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold">Upcoming Bookings</h2>
            <div className="mt-4 space-y-4">
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No upcoming bookings.{" "}
                    <Link
                      href="/services"
                      className="text-primary hover:underline"
                    >
                      Book a nurse
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {booking.nurseName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.nurseName} &middot; {booking.date} at{" "}
                            {booking.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusStyles[booking.status]}>
                          {booking.status}
                        </Badge>
                        <span className="font-semibold">${booking.amount}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <h2 className="mt-8 text-lg font-semibold">Past Bookings</h2>
            <div className="mt-4 space-y-4">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="opacity-75">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                        {booking.nurseName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.nurseName} &middot; {booking.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={statusStyles[booking.status]}>
                        {booking.status}
                      </Badge>
                      <span className="font-semibold">${booking.amount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Favorite Nurse</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {patientStats.favoriteNurse}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      4.9 (124 reviews)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Recent Reviews</h3>
                <div className="mt-3 space-y-4">
                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="border-b pb-3 last:border-0">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {review.comment}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        For {review.nurseName}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

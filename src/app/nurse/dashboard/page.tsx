"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
} from "lucide-react";
import { bookings, nurseStats } from "@/lib/mock-data";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function NurseDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  const nurseBookings = bookings.filter(
    (b) => b.nurseName === "Sarah Johnson"
  );
  const activeBookings = nurseBookings.filter(
    (b) =>
      b.status === "confirmed" ||
      b.status === "in-progress" ||
      b.status === "pending"
  );
  const completedBookings = nurseBookings.filter(
    (b) => b.status === "completed"
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome, Sarah
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your assignments and availability
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Availability</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAvailable ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAvailable ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <Badge variant={isAvailable ? "default" : "secondary"}>
              {isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>
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
                  {nurseStats.totalAssignments}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Assignments
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
                  {nurseStats.activeAssignments}
                </p>
                <p className="text-xs text-muted-foreground">
                  Active Assignments
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${nurseStats.totalEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Earnings
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{nurseStats.rating}</p>
                <p className="text-xs text-muted-foreground">
                  Rating ({nurseStats.reviewCount} reviews)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Assignments */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold">Active Assignments</h2>
            <div className="mt-4 space-y-4">
              {activeBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No active assignments right now.
                  </CardContent>
                </Card>
              ) : (
                activeBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">
                            Patient: {booking.patientName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} at {booking.time} &middot;{" "}
                            {booking.address}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={statusStyles[booking.status]}>
                            {booking.status}
                          </Badge>
                          <span className="font-semibold">
                            ${booking.amount}
                          </span>
                        </div>
                      </div>
                      {booking.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <Button size="sm">Accept</Button>
                          <Button size="sm" variant="outline">
                            Decline
                          </Button>
                        </div>
                      )}
                      {booking.status === "confirmed" && (
                        <div className="mt-4">
                          <Button size="sm" variant="outline">
                            Start Visit
                          </Button>
                        </div>
                      )}
                      {booking.status === "in-progress" && (
                        <div className="mt-4">
                          <Button size="sm">Mark Complete</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <h2 className="mt-8 text-lg font-semibold">
              Completed Assignments
            </h2>
            <div className="mt-4 space-y-4">
              {completedBookings.map((booking) => (
                <Card key={booking.id} className="opacity-75">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <p className="font-medium">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">
                        Patient: {booking.patientName} &middot; {booking.date}
                      </p>
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
                <h3 className="font-semibold">Earnings This Month</h3>
                <div className="mt-3">
                  <p className="text-3xl font-bold text-primary">
                    ${nurseStats.thisMonthEarnings.toLocaleString()}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    +15% from last month
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Performance</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">
                      {nurseStats.completedAssignments}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cancelled</span>
                    <span className="font-medium">
                      {nurseStats.cancelledAssignments}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Completion Rate
                    </span>
                    <span className="font-medium text-green-600">96.7%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{nurseStats.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Quick Actions</h3>
                <div className="mt-3 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Manage Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    View All Assignments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Earnings History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

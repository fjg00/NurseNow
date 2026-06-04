import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCog,
  CalendarDays,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { bookings, nurses, adminStats } from "@/lib/mock-data";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const pendingNurses = nurses.filter((n) => !n.isVerified);
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of platform activity and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <UserCog className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adminStats.totalNurses}</p>
                <p className="text-xs text-muted-foreground">Total Nurses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {adminStats.totalPatients}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Patients
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CalendarDays className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {adminStats.totalBookings.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Bookings
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
                  ${adminStats.revenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">
                    +{adminStats.monthlyGrowth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-lg font-bold">
                  {adminStats.activeBookings}
                </p>
                <p className="text-xs text-muted-foreground">
                  Active Bookings
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-lg font-bold">
                  {adminStats.completedBookings.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-lg font-bold">
                  {adminStats.cancelledBookings}
                </p>
                <p className="text-xs text-muted-foreground">Cancelled</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Bookings</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Nurse</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">
                        {booking.id}
                      </td>
                      <td className="px-4 py-3">{booking.patientName}</td>
                      <td className="px-4 py-3">{booking.nurseName}</td>
                      <td className="px-4 py-3 max-w-[150px] truncate">
                        {booking.service}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={statusStyles[booking.status]}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Verifications */}
            <Card
              className={
                pendingNurses.length > 0
                  ? "border-yellow-200 bg-yellow-50/50"
                  : ""
              }
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <AlertCircle
                    className={`h-5 w-5 ${
                      pendingNurses.length > 0
                        ? "text-yellow-600"
                        : "text-muted-foreground"
                    }`}
                  />
                  <h3 className="font-semibold">Pending Verifications</h3>
                </div>
                {pendingNurses.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    All nurses are verified.
                  </p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {pendingNurses.map((nurse) => (
                      <div
                        key={nurse.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-xs font-semibold text-yellow-800">
                            {nurse.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{nurse.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {nurse.specialization}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="default" className="h-7 px-2 text-xs">
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nurse Overview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">Nurse Overview</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span className="text-muted-foreground">Verified</span>
                    </div>
                    <span className="font-medium">
                      {adminStats.verifiedNurses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-muted-foreground">
                        Pending
                      </span>
                    </div>
                    <span className="font-medium">
                      {adminStats.pendingVerification}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Total</span>
                    </div>
                    <span className="font-medium">
                      {adminStats.totalNurses}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full" size="sm">
                  Manage Nurses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingSteps } from "@/components/BookingSteps";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  ShieldCheck,
  Zap,
  Users,
  AlertCircle,
} from "lucide-react";
import {
  services,
  getNurseById,
  getServiceById,
  getNursesForService,
  getAvailableSlotsForNurse,
} from "@/lib/mock-data";

function getDayName(dateStr: string): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date(dateStr + "T12:00:00").getDay()];
}

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedNurseId = searchParams.get("nurse");
  const preselectedServiceId = searchParams.get("service");

  const [step, setStep] = useState(preselectedServiceId ? 2 : 1);
  const [selectedServiceId, setSelectedServiceId] = useState(
    preselectedServiceId || ""
  );
  const [selectedNurseId, setSelectedNurseId] = useState(
    preselectedNurseId || ""
  );
  const [requestNow, setRequestNow] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const selectedService = selectedServiceId
    ? getServiceById(selectedServiceId)
    : null;
  const selectedNurse = selectedNurseId
    ? getNurseById(selectedNurseId)
    : null;

  const dayName = date ? getDayName(date) : "";

  const matchingNurses = useMemo(() => {
    if (!selectedServiceId) return [];
    const nurses = getNursesForService(selectedServiceId);
    if (requestNow) return nurses;
    if (!dayName) return nurses;
    return nurses.filter((n) => {
      const slots = getAvailableSlotsForNurse(n.id, dayName);
      if (time) return slots.includes(time);
      return slots.length > 0;
    });
  }, [selectedServiceId, dayName, time, requestNow]);

  // 1=Service, 2=Schedule, 3=Choose Nurse, 4=Details, 5=Confirm
  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedServiceId;
      case 2:
        return requestNow || (!!date && !!time);
      case 3:
        return !!selectedNurseId;
      case 4:
        return !!address && !!phone;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleConfirm = () => {
    const bookingId = `B${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const params = new URLSearchParams({
      id: bookingId,
      service: selectedService?.name || "",
      nurse: selectedNurse?.name || "",
      date: requestNow ? "Today (ASAP)" : date,
      time: requestNow ? "Next Available" : time,
      address,
      amount: String(selectedService?.price || 0),
    });
    router.push(`/book/confirmation?${params.toString()}`);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        <h1 className="text-2xl font-bold sm:text-3xl mb-2">Book a Nurse</h1>
        <p className="text-muted-foreground mb-8">
          Complete the steps below to schedule your visit
        </p>

        <BookingSteps currentStep={step} />

        <div className="mt-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Select a Service
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        setSelectedNurseId("");
                        setRequestNow(false);
                      }}
                      className={`rounded-lg border p-4 text-left transition-colors ${
                        selectedServiceId === service.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                        {service.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">
                          ${service.price}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {service.duration}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  When do you need a nurse?
                </h2>

                {/* Request Now Option */}
                <button
                  type="button"
                  onClick={() => {
                    setRequestNow(true);
                    setDate("");
                    setTime("");
                    setSelectedNurseId("");
                  }}
                  className={`w-full rounded-lg border p-4 text-left transition-colors mb-4 ${
                    requestNow
                      ? "border-green-500 bg-green-50 ring-1 ring-green-500"
                      : "border-dashed hover:border-green-400 hover:bg-green-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">I Need a Nurse Now</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          ASAP
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Request urgent care — we&apos;ll find the next available
                        nurse for you
                      </p>
                    </div>
                  </div>
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or schedule for later
                    </span>
                  </div>
                </div>

                <div
                  className={`rounded-lg border p-4 transition-colors ${
                    !requestNow && (date || time)
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : requestNow
                      ? "opacity-50"
                      : ""
                  }`}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        disabled={requestNow}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setTime("");
                          setSelectedNurseId("");
                          setRequestNow(false);
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <select
                        id="time"
                        value={time}
                        disabled={requestNow}
                        onChange={(e) => {
                          setTime(e.target.value);
                          setSelectedNurseId("");
                          setRequestNow(false);
                        }}
                        className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
                      >
                        <option value="">Select a time</option>
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>
                  {date && time && !requestNow && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {matchingNurses.length}
                      </span>{" "}
                      qualified nurse{matchingNurses.length !== 1 ? "s" : ""}{" "}
                      available on {dayName} at {time}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Choose Nurse (filtered by service + schedule) */}
          {step === 3 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-1">Choose a Nurse</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {requestNow ? (
                    <>
                      Showing all available nurses who specialize in{" "}
                      <span className="font-medium text-foreground">
                        {selectedService?.name}
                      </span>
                      {" "}&mdash; pick one for your urgent request
                    </>
                  ) : (
                    <>
                      Showing nurses who specialize in{" "}
                      <span className="font-medium text-foreground">
                        {selectedService?.name}
                      </span>{" "}
                      and are available on{" "}
                      <span className="font-medium text-foreground">
                        {dayName}, {date}
                      </span>{" "}
                      at{" "}
                      <span className="font-medium text-foreground">{time}</span>
                    </>
                  )}
                </p>

                {matchingNurses.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      No matching nurses available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      No nurses with this specialty are available at your
                      chosen time. Go back and try a different time.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matchingNurses.map((nurse) => (
                      <button
                        key={nurse.id}
                        type="button"
                        onClick={() => {
                          setSelectedNurseId(nurse.id);
                        }}
                        className={`w-full rounded-lg border p-4 text-left transition-colors ${
                          selectedNurseId === nurse.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {nurse.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{nurse.name}</span>
                              <ShieldCheck className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {nurse.specialization} &middot;{" "}
                              {nurse.yearsExperience} yrs exp
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              {nurse.rating}
                              <span className="text-xs text-muted-foreground">
                                ({nurse.reviewCount})
                              </span>
                            </div>
                            <span className="text-sm font-bold text-primary">
                              ${nurse.hourlyRate}/hr
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {matchingNurses.length} nurse{matchingNurses.length !== 1 ? "s" : ""}{" "}
                  matched for this service and time
                </p>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Details */}
          {step === 4 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Visit Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main Street, Apt 4B"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">
                      Additional Notes{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special instructions or medical information..."
                      className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Review & Confirm */}
          {step === 5 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Review Your Booking
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium">
                        {selectedService?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nurse</span>
                      <span className="font-medium">
                        {selectedNurse?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">
                        {requestNow ? (
                          <span className="flex items-center gap-1">
                            <Zap className="h-3.5 w-3.5 text-green-600" />
                            Today (ASAP)
                          </span>
                        ) : (
                          <>{dayName}, {date}</>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">
                        {requestNow ? "Next Available" : time}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Address</span>
                      <span className="font-medium">{address}</span>
                    </div>
                    {notes && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Notes</span>
                        <span className="font-medium max-w-[200px] text-right">
                          {notes}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ${selectedService?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {step < 5 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-1"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleConfirm} className="gap-1">
                <Check className="h-4 w-4" />
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense>
      <BookingFormContent />
    </Suspense>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NurseCard } from "@/components/NurseCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { nurses, specializations } from "@/lib/mock-data";

export default function NursesPage() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxRate, setMaxRate] = useState(100);

  const filtered = useMemo(() => {
    return nurses.filter((nurse) => {
      if (search && !nurse.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (
        specialization !== "All Specializations" &&
        nurse.specialization !== specialization
      ) {
        return false;
      }
      if (availableOnly && !nurse.isAvailable) {
        return false;
      }
      if (nurse.hourlyRate > maxRate) {
        return false;
      }
      return true;
    });
  }, [search, specialization, availableOnly, maxRate]);

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Find a Nurse</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our verified healthcare professionals
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <Card className="h-fit lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Filters</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Specialization</label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {specializations.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Max Hourly Rate: ${maxRate}
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={maxRate}
                    onChange={(e) => setMaxRate(Number(e.target.value))}
                    className="mt-2 w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$20</span>
                    <span>$100</span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={availableOnly}
                      onChange={(e) => setAvailableOnly(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    <span className="text-sm">Available only</span>
                  </label>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearch("");
                    setSpecialization("All Specializations");
                    setAvailableOnly(false);
                    setMaxRate(100);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Nurse Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filtered.length} nurse{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            {filtered.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  No nurses match your filters. Try adjusting your criteria.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((nurse) => (
                  <NurseCard key={nurse.id} nurse={nurse} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

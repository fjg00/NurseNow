"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Home,
  Heart,
  Activity,
  Droplets,
  Syringe,
  HeartPulse,
  Moon,
  Pill,
  HandHelping,
  ArrowRightLeft,
  Baby,
  Accessibility,
} from "lucide-react";
import { services, categories } from "@/lib/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Heart,
  Activity,
  Pill,
  Droplets,
  Syringe,
  HeartPulse,
  Stethoscope,
  Moon,
  HandHelping,
  ArrowRightLeft,
  Baby,
  Accessibility,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Our Services</h1>
          <p className="mt-2 text-muted-foreground">
            Professional healthcare services delivered to your doorstep
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => {
            const Icon = iconMap[service.icon] || Stethoscope;
            return (
              <Card
                key={service.id}
                className="group transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${service.price}
                    </span>
                    <Badge variant="outline">{service.duration}</Badge>
                  </div>
                  <Button className="mt-4 w-full">Book This Service</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

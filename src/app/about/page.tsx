import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Heart,
  Users,
  ShieldCheck,
  Clock,
  Award,
  Zap,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We care deeply about every patient and treat them like family.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "Every nurse is verified, licensed, and background-checked.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We show up on time, every time. Your health can't wait.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards of healthcare delivery.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We empower nurses with flexible work and patients with accessible care.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Modern platform connecting healthcare needs with solutions.",
  },
];

const stats = [
  { value: "300+", label: "Families Served" },
  { value: "48", label: "Qualified Nurses" },
  { value: "1,800+", label: "Completed Visits" },
  { value: "4.8/5", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">About NurseNow</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re on a mission to make professional healthcare accessible
            to everyone, right at their doorstep. NurseNow bridges the gap
            between qualified nurses and patients who need care at home.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Our Mission</h2>
              <p className="mt-3 text-muted-foreground">
                To provide fast, reliable, and professional home healthcare
                services while empowering nurses with flexible work
                opportunities. We believe everyone deserves quality nursing care
                in the comfort of their own home.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Our Vision</h2>
              <p className="mt-3 text-muted-foreground">
                To become the leading home healthcare platform in the region by
                simplifying access to trusted nursing care anytime and anywhere.
                We envision a world where quality healthcare is just a click
                away.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold">Our Values</h2>
          <p className="mt-2 text-center text-muted-foreground">
            The principles that guide everything we do
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="mt-16 mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold">Our Story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              NurseNow was born from a simple observation: families in need of
              home healthcare often struggle to find qualified, trustworthy
              nurses quickly. At the same time, many skilled nurses seek
              flexible work opportunities that fit their lifestyle.
            </p>
            <p>
              We built NurseNow to solve both sides of this equation. Our
              platform makes it easy for patients and families to request
              professional nursing care at home, while giving nurses the freedom
              to choose their schedule and build their practice.
            </p>
            <p>
              Today, NurseNow serves hundreds of families with a growing network
              of verified, licensed healthcare professionals. We&apos;re just
              getting started — and we&apos;re committed to transforming home
              healthcare, one visit at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

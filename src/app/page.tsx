import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  ClipboardList,
  UserCheck,
  HeartPulse,
  Home,
  Heart,
  Activity,
  Droplets,
  Syringe,
  Moon,
} from "lucide-react";
import { services } from "@/lib/mock-data";

const steps = [
  {
    icon: ClipboardList,
    title: "Request a Nurse",
    description:
      "Tell us what you need — select a service, set your schedule, and provide your location.",
  },
  {
    icon: UserCheck,
    title: "Get Matched",
    description:
      "We match you with a verified, qualified nurse based on your needs and preferences.",
  },
  {
    icon: HeartPulse,
    title: "Receive Care",
    description:
      "Your nurse arrives at your door, ready to provide professional healthcare at home.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Every nurse is licensed, background-checked, and verified before joining our platform.",
  },
  {
    icon: Clock,
    title: "Fast Availability",
    description:
      "Book a nurse within hours. We offer on-demand and scheduled services to fit your needs.",
  },
  {
    icon: Star,
    title: "Trusted Care",
    description:
      "Rated 4.8/5 by patients. Read reviews and choose the nurse that's right for you.",
  },
  {
    icon: Home,
    title: "Home Comfort",
    description:
      "Recover and heal in the comfort of your own home with professional medical support.",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Heart,
  Activity,
  Droplets,
  Syringe,
  HeartPulse,
  Stethoscope,
  Moon,
};

export default function HomePage() {
  const featuredServices = services.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Trusted by 300+ Families
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Professional Nursing Care{" "}
              <span className="text-primary">At Your Doorstep</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Connect with qualified, verified nurses for home healthcare.
              From elderly care to post-surgery recovery — get the care you
              need, when you need it.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/services">
                <Button size="lg" className="gap-2">
                  Book a Nurse Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Join as a Nurse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="mt-2 text-muted-foreground">
              Comprehensive healthcare services delivered to your home
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => {
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
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        From ${service.price}/visit
                      </span>
                      <Badge variant="outline">{service.duration}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services">
              <Button variant="outline" className="gap-2">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-muted-foreground">
              Getting professional nursing care is simple
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mb-2 text-sm font-medium text-primary">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Why Choose NurseNow</h2>
            <p className="mt-2 text-muted-foreground">
              We&apos;re committed to providing the best healthcare experience
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-2 text-primary-foreground/80">
            Book a qualified nurse today or join our team of healthcare
            professionals.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/services">
              <Button size="lg" variant="secondary" className="gap-2">
                Find a Nurse
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Join as a Nurse
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

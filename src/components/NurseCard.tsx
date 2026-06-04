import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, MapPin } from "lucide-react";
import type { Nurse } from "@/lib/mock-data";

export function NurseCard({ nurse }: { nurse: Nurse }) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {nurse.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{nurse.name}</h3>
              {nurse.isVerified && (
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {nurse.specialization}
            </p>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{nurse.rating}</span>
                <span className="text-muted-foreground">
                  ({nurse.reviewCount})
                </span>
              </div>
              <span className="text-muted-foreground">
                {nurse.yearsExperience} yrs exp
              </span>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {nurse.bio}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              ${nurse.hourlyRate}
            </span>
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
          <Badge variant={nurse.isAvailable ? "default" : "secondary"}>
            {nurse.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={`/nurses/${nurse.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
          {nurse.isAvailable && (
            <Link href={`/book?nurse=${nurse.id}`} className="flex-1">
              <Button className="w-full">Book Now</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

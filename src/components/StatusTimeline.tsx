import { Check, Clock, Play, CheckCircle2, XCircle } from "lucide-react";

const allSteps = [
  { key: "pending", label: "Pending", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: Check },
  { key: "in-progress", label: "In Progress", icon: Play },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
];

const statusOrder = ["pending", "confirmed", "in-progress", "completed"];

export function StatusTimeline({
  status,
}: {
  status: string;
}) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
        <XCircle className="h-6 w-6 text-red-500" />
        <div>
          <p className="font-medium text-red-800">Booking Cancelled</p>
          <p className="text-sm text-red-600">This booking has been cancelled.</p>
        </div>
      </div>
    );
  }

  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="flex items-center gap-2">
      {allSteps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isCompleted
                    ? "bg-green-100 text-green-600"
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`mt-1.5 text-xs ${
                  isCurrent
                    ? "font-medium text-primary"
                    : isCompleted
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < allSteps.length - 1 && (
              <div
                className={`mx-1 h-0.5 w-8 sm:w-14 ${
                  isCompleted ? "bg-green-400" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

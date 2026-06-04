export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "home-care" | "specialized" | "monitoring" | "support";
  duration: string;
  icon: string;
}

export interface Nurse {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  yearsExperience: number;
  isVerified: boolean;
  isAvailable: boolean;
  avatar: string;
  bio: string;
}

export interface Availability {
  day: string;
  slots: string[];
}

export interface Booking {
  id: string;
  patientName: string;
  nurseName: string;
  nurseId: string;
  serviceId: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  amount: number;
  address: string;
}

export interface Review {
  id: string;
  patientName: string;
  nurseName: string;
  rating: number;
  comment: string;
  date: string;
}

export const services: Service[] = [
  {
    id: "1",
    name: "Home Patient Care",
    description:
      "Comprehensive nursing care in the comfort of your home, including daily health monitoring and personal assistance.",
    price: 50,
    category: "home-care",
    duration: "2-4 hours",
    icon: "Home",
  },
  {
    id: "2",
    name: "Elderly Care Assistance",
    description:
      "Specialized care for elderly patients including mobility support, medication management, and companionship.",
    price: 45,
    category: "home-care",
    duration: "4-8 hours",
    icon: "Heart",
  },
  {
    id: "3",
    name: "Post-Surgery Recovery",
    description:
      "Professional post-operative care to ensure safe and speedy recovery at home.",
    price: 65,
    category: "specialized",
    duration: "3-6 hours",
    icon: "Activity",
  },
  {
    id: "4",
    name: "Medication Administration",
    description:
      "Safe and timely administration of prescribed medications with proper documentation.",
    price: 30,
    category: "monitoring",
    duration: "30-60 min",
    icon: "Pill",
  },
  {
    id: "5",
    name: "IV Therapy",
    description:
      "Professional intravenous therapy including hydration, vitamin infusions, and medication delivery.",
    price: 75,
    category: "specialized",
    duration: "1-2 hours",
    icon: "Droplets",
  },
  {
    id: "6",
    name: "Injections & Wound Dressing",
    description:
      "Expert wound care and injection services with sterile techniques and proper follow-up.",
    price: 35,
    category: "specialized",
    duration: "30-60 min",
    icon: "Syringe",
  },
  {
    id: "7",
    name: "Vital Signs Monitoring",
    description:
      "Regular monitoring of blood pressure, heart rate, temperature, and oxygen levels.",
    price: 25,
    category: "monitoring",
    duration: "30 min",
    icon: "HeartPulse",
  },
  {
    id: "8",
    name: "Chronic Illness Support",
    description:
      "Ongoing care and management for patients with diabetes, hypertension, and other chronic conditions.",
    price: 55,
    category: "monitoring",
    duration: "2-4 hours",
    icon: "Stethoscope",
  },
  {
    id: "9",
    name: "Night Shift Nursing",
    description:
      "Overnight nursing care for patients who need continuous monitoring and assistance through the night.",
    price: 120,
    category: "home-care",
    duration: "8-12 hours",
    icon: "Moon",
  },
  {
    id: "10",
    name: "Temporary Caregiver Support",
    description:
      "Short-term nursing support for families needing temporary relief or assistance.",
    price: 40,
    category: "support",
    duration: "2-6 hours",
    icon: "HandHelping",
  },
  {
    id: "11",
    name: "Hospital-to-Home Transition",
    description:
      "Smooth transition care from hospital discharge to home recovery with personalized care plans.",
    price: 60,
    category: "support",
    duration: "3-5 hours",
    icon: "ArrowRightLeft",
  },
  {
    id: "12",
    name: "Pediatric Nursing",
    description:
      "Specialized nursing care for infants, children, and adolescents in their home environment.",
    price: 55,
    category: "specialized",
    duration: "2-4 hours",
    icon: "Baby",
  },
  {
    id: "13",
    name: "Physical Support for Disabled Patients",
    description:
      "Dedicated physical assistance and care for patients with disabilities, promoting comfort and independence.",
    price: 50,
    category: "support",
    duration: "3-6 hours",
    icon: "Accessibility",
  },
];

export const nurses: Nurse[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialization: "Elder Care",
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 45,
    yearsExperience: 8,
    isVerified: true,
    isAvailable: true,
    avatar: "SJ",
    bio: "Passionate about providing compassionate elderly care with 8 years of experience in home nursing.",
  },
  {
    id: "2",
    name: "Michael Chen",
    specialization: "Post-Surgery Recovery",
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 55,
    yearsExperience: 12,
    isVerified: true,
    isAvailable: true,
    avatar: "MC",
    bio: "Specialized in post-operative care with extensive ICU and surgical ward experience.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    specialization: "Pediatric Nursing",
    rating: 4.9,
    reviewCount: 87,
    hourlyRate: 50,
    yearsExperience: 6,
    isVerified: true,
    isAvailable: false,
    avatar: "ER",
    bio: "Dedicated pediatric nurse with a gentle approach and strong communication with young patients and families.",
  },
  {
    id: "4",
    name: "David Thompson",
    specialization: "IV Therapy",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 60,
    yearsExperience: 15,
    isVerified: true,
    isAvailable: true,
    avatar: "DT",
    bio: "Expert in intravenous therapy and medication administration with 15 years of clinical experience.",
  },
  {
    id: "5",
    name: "Aisha Patel",
    specialization: "Chronic Illness Management",
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: 48,
    yearsExperience: 10,
    isVerified: true,
    isAvailable: true,
    avatar: "AP",
    bio: "Specializing in diabetes and cardiovascular care with a focus on patient education and lifestyle management.",
  },
  {
    id: "6",
    name: "James Wilson",
    specialization: "Night Shift Care",
    rating: 4.6,
    reviewCount: 67,
    hourlyRate: 42,
    yearsExperience: 5,
    isVerified: false,
    isAvailable: true,
    avatar: "JW",
    bio: "Reliable and attentive night shift nurse providing overnight monitoring and care.",
  },
  {
    id: "7",
    name: "Fatima Al-Hassan",
    specialization: "Wound Care",
    rating: 4.9,
    reviewCount: 145,
    hourlyRate: 52,
    yearsExperience: 9,
    isVerified: true,
    isAvailable: true,
    avatar: "FA",
    bio: "Certified wound care specialist with expertise in complex wound management and post-surgical recovery.",
  },
  {
    id: "8",
    name: "Robert Kim",
    specialization: "Elder Care",
    rating: 4.7,
    reviewCount: 92,
    hourlyRate: 44,
    yearsExperience: 7,
    isVerified: true,
    isAvailable: false,
    avatar: "RK",
    bio: "Compassionate elder care nurse with a background in geriatric medicine and dementia support.",
  },
  {
    id: "9",
    name: "Lisa Martinez",
    specialization: "Home Patient Care",
    rating: 4.8,
    reviewCount: 178,
    hourlyRate: 46,
    yearsExperience: 11,
    isVerified: true,
    isAvailable: true,
    avatar: "LM",
    bio: "Experienced home care nurse skilled in patient assessment, care planning, and family education.",
  },
  {
    id: "10",
    name: "Omar Nasser",
    specialization: "Physical Rehabilitation",
    rating: 4.6,
    reviewCount: 54,
    hourlyRate: 50,
    yearsExperience: 4,
    isVerified: true,
    isAvailable: true,
    avatar: "ON",
    bio: "Rehabilitation nurse helping patients regain mobility and independence after injuries and surgeries.",
  },
];

export const bookings: Booking[] = [
  {
    id: "B001",
    patientName: "John Smith",
    nurseName: "Sarah Johnson",
    nurseId: "1",
    serviceId: "2",
    service: "Elderly Care Assistance",
    date: "2026-06-06",
    time: "09:00 AM",
    status: "confirmed",
    amount: 180,
    address: "123 Oak Street, Apt 4B",
  },
  {
    id: "B002",
    patientName: "Maria Garcia",
    nurseName: "Michael Chen",
    nurseId: "2",
    serviceId: "3",
    service: "Post-Surgery Recovery",
    date: "2026-06-05",
    time: "02:00 PM",
    status: "in-progress",
    amount: 260,
    address: "456 Maple Avenue",
  },
  {
    id: "B003",
    patientName: "Robert Lee",
    nurseName: "David Thompson",
    nurseId: "4",
    serviceId: "5",
    service: "IV Therapy",
    date: "2026-06-04",
    time: "10:30 AM",
    status: "completed",
    amount: 150,
    address: "789 Pine Road, Suite 12",
  },
  {
    id: "B004",
    patientName: "Susan Davis",
    nurseName: "Aisha Patel",
    nurseId: "5",
    serviceId: "7",
    service: "Vital Signs Monitoring",
    date: "2026-06-07",
    time: "08:00 AM",
    status: "pending",
    amount: 75,
    address: "321 Elm Drive",
  },
  {
    id: "B005",
    patientName: "John Smith",
    nurseName: "Emily Rodriguez",
    nurseId: "3",
    serviceId: "12",
    service: "Pediatric Nursing",
    date: "2026-05-28",
    time: "11:00 AM",
    status: "completed",
    amount: 200,
    address: "123 Oak Street, Apt 4B",
  },
  {
    id: "B006",
    patientName: "Linda Brown",
    nurseName: "Sarah Johnson",
    nurseId: "1",
    serviceId: "9",
    service: "Night Shift Nursing",
    date: "2026-06-08",
    time: "09:00 PM",
    status: "confirmed",
    amount: 360,
    address: "555 Cedar Lane",
  },
];

export const reviews: Review[] = [
  {
    id: "R001",
    patientName: "John Smith",
    nurseName: "Sarah Johnson",
    rating: 5,
    comment:
      "Sarah was incredibly caring and professional. My mother felt very comfortable with her care.",
    date: "2026-05-25",
  },
  {
    id: "R002",
    patientName: "Robert Lee",
    nurseName: "David Thompson",
    rating: 5,
    comment:
      "David handled the IV therapy expertly. Very knowledgeable and put me at ease immediately.",
    date: "2026-06-04",
  },
  {
    id: "R003",
    patientName: "Maria Garcia",
    nurseName: "Michael Chen",
    rating: 4,
    comment:
      "Great post-surgery care. Michael was thorough with wound dressing and medication reminders.",
    date: "2026-05-30",
  },
  {
    id: "R004",
    patientName: "Susan Davis",
    nurseName: "Aisha Patel",
    rating: 5,
    comment:
      "Aisha has been managing my diabetes care plan wonderfully. She explains everything clearly.",
    date: "2026-05-20",
  },
];

export const adminStats = {
  totalNurses: 48,
  verifiedNurses: 42,
  pendingVerification: 6,
  totalPatients: 312,
  totalBookings: 1847,
  activeBookings: 23,
  completedBookings: 1789,
  cancelledBookings: 35,
  revenue: 92350,
  monthlyGrowth: 12.5,
};

export const patientStats = {
  totalBookings: 8,
  upcomingVisits: 2,
  completedVisits: 5,
  cancelledVisits: 1,
  totalSpent: 1245,
  favoriteNurse: "Sarah Johnson",
};

export const nurseStats = {
  totalAssignments: 156,
  activeAssignments: 3,
  completedAssignments: 148,
  cancelledAssignments: 5,
  totalEarnings: 12480,
  thisMonthEarnings: 2340,
  rating: 4.9,
  reviewCount: 124,
};

export const categories = [
  { id: "all", name: "All Services" },
  { id: "home-care", name: "Home Care" },
  { id: "specialized", name: "Specialized" },
  { id: "monitoring", name: "Monitoring" },
  { id: "support", name: "Support" },
];

export const specializations = [
  "All Specializations",
  "Elder Care",
  "Post-Surgery Recovery",
  "Pediatric Nursing",
  "IV Therapy",
  "Chronic Illness Management",
  "Night Shift Care",
  "Wound Care",
  "Home Patient Care",
  "Physical Rehabilitation",
];

export const nurseAvailability: Record<string, Availability[]> = {
  "1": [
    { day: "Monday", slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"] },
    { day: "Tuesday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
    { day: "Wednesday", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { day: "Thursday", slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"] },
    { day: "Friday", slots: ["09:00 AM", "10:00 AM"] },
  ],
  "2": [
    { day: "Monday", slots: ["10:00 AM", "11:00 AM", "02:00 PM"] },
    { day: "Wednesday", slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"] },
    { day: "Friday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
  ],
  "3": [
    { day: "Tuesday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
    { day: "Thursday", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { day: "Saturday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
  ],
  "4": [
    { day: "Monday", slots: ["08:00 AM", "09:00 AM", "10:00 AM"] },
    { day: "Tuesday", slots: ["08:00 AM", "09:00 AM", "10:00 AM", "02:00 PM"] },
    { day: "Wednesday", slots: ["08:00 AM", "09:00 AM"] },
    { day: "Thursday", slots: ["08:00 AM", "09:00 AM", "10:00 AM"] },
    { day: "Friday", slots: ["08:00 AM", "09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"] },
  ],
  "5": [
    { day: "Monday", slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"] },
    { day: "Tuesday", slots: ["09:00 AM", "10:00 AM"] },
    { day: "Thursday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
    { day: "Friday", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
  ],
  "7": [
    { day: "Monday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
    { day: "Tuesday", slots: ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"] },
    { day: "Wednesday", slots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"] },
    { day: "Thursday", slots: ["02:00 PM", "03:00 PM"] },
    { day: "Friday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
  ],
  "9": [
    { day: "Monday", slots: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"] },
    { day: "Wednesday", slots: ["08:00 AM", "09:00 AM", "10:00 AM"] },
    { day: "Thursday", slots: ["02:00 PM", "03:00 PM", "04:00 PM"] },
    { day: "Friday", slots: ["08:00 AM", "09:00 AM"] },
    { day: "Saturday", slots: ["09:00 AM", "10:00 AM", "11:00 AM"] },
  ],
  "10": [
    { day: "Tuesday", slots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "11:00 AM"] },
    { day: "Friday", slots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"] },
  ],
};

export function getNurseById(id: string): Nurse | undefined {
  return nurses.find((n) => n.id === id);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function getReviewsForNurse(nurseName: string): Review[] {
  return reviews.filter((r) => r.nurseName === nurseName);
}

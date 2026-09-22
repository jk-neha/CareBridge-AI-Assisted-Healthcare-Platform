import {
  LayoutDashboard,
  Stethoscope,
  Search,
  CalendarDays,
  FileText,
  Pill,
  ShoppingBag,
  ClipboardList,
  UserCircle,
} from "lucide-react";
import AppShell from "./AppShell";

const navItems = [
  { label: "Dashboard", to: "/patient/dashboard", icon: LayoutDashboard, end: true },
  { label: "AI Symptom Checker", to: "/patient/symptom-checker", icon: Stethoscope },
  { label: "Find Doctors", to: "/patient/doctors", icon: Search },
  { label: "Appointments", to: "/patient/appointments", icon: CalendarDays },
  { label: "Medical Records", to: "/patient/medical-records", icon: FileText },
  { label: "Prescriptions", to: "/patient/prescriptions", icon: ClipboardList },
  { label: "Medicines", to: "/patient/medicines", icon: Pill },
  { label: "Medicine Orders", to: "/patient/orders", icon: ShoppingBag },
  { label: "Profile", to: "/patient/profile", icon: UserCircle },
];

export default function PatientLayout() {
  return <AppShell navItems={navItems} roleLabel="Patient" />;
}

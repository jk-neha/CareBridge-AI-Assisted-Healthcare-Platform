// // import {
// //   LayoutDashboard,
// //   CalendarDays,
// //   Users,
// //   FileText,
// //   UserCircle,
// // } from "lucide-react";
// // import AppShell from "./AppShell";

// // const navItems = [
// //   { label: "Dashboard", to: "/doctor/dashboard", icon: LayoutDashboard, end: true },
// //   { label: "Appointments", to: "/doctor/appointments", icon: CalendarDays },
// //   { label: "Patients", to: "/doctor/patients", icon: Users },
// //   { label: "Medical Records", to: "/doctor/medical-records", icon: FileText },
// //   { label: "Profile", to: "/doctor/profile", icon: UserCircle },
// // ];

// // export default function DoctorLayout() {
// //   return <AppShell navItems={navItems} roleLabel="Doctor" />;
// // }
// import {
//   LayoutDashboard,
//   CalendarDays,
//   Users,
//   FileText,
//   ClipboardList,
//   UserCircle,
// } from "lucide-react";

// import AppShell from "./AppShell";

// const navItems = [
//   {
//     label: "Dashboard",
//     to: "/doctor/dashboard",
//     icon: LayoutDashboard,
//     end: true,
//   },
//   {
//     label: "Appointments",
//     to: "/doctor/appointments",
//     icon: CalendarDays,
//   },
//   {
//     label: "Patients",
//     to: "/doctor/patients",
//     icon: Users,
//   },
//   {
//     label: "Medical Records",
//     to: "/doctor/medical-records",
//     icon: FileText,
//   },
//   {
//     label: "Prescriptions",
//     to: "/doctor/prescriptions",
//     icon: ClipboardList,
//   },
//   // {
//   //   label: "Profile",
//   //   to: "/doctor/profile",
//   //   icon: UserCircle,
//   // },
// ];

// export default function DoctorLayout() {
//   return (
//     <AppShell
//       navItems={navItems}
//       roleLabel="Doctor"
//       title="CareBridge"
//     />
//   );
// }

//new
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  UserCircle,
} from "lucide-react";

import AppShell from "./AppShell";

const navItems = [
  {
    label: "Dashboard",
    to: "/doctor/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Appointments",
    to: "/doctor/appointments",
    icon: CalendarDays,
  },
  {
    label: "Patients",
    to: "/doctor/patients",
    icon: Users,
  },
  {
    label: "Medical Records",
    to: "/doctor/medical-records",
    icon: FileText,
  },
  {
    label: "Prescriptions",
    to: "/doctor/prescriptions",
    icon: ClipboardList,
  },
  {
    label: "Profile",
    to: "/doctor/profile",
    icon: UserCircle,
  },
];

export default function DoctorLayout() {
  return (
    <AppShell
      navItems={navItems}
      roleLabel="Doctor"
      title="CareBridge"
    />
  );
}

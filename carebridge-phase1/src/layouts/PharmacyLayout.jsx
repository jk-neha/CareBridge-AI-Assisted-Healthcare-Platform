// // import { LayoutDashboard, Pill, PackageSearch, UserCircle } from "lucide-react";
// // import AppShell from "./AppShell";

// // const navItems = [
// //   { label: "Dashboard", to: "/pharmacy/dashboard", icon: LayoutDashboard, end: true },
// //   { label: "Medicines", to: "/pharmacy/medicines", icon: Pill },
// //   { label: "Orders", to: "/pharmacy/orders", icon: PackageSearch },
// //   { label: "Profile", to: "/pharmacy/profile", icon: UserCircle },
// // ];

// // export default function PharmacyLayout() {
// //   return <AppShell navItems={navItems} roleLabel="Pharmacy" />;
// // }
// import {
//   LayoutDashboard,
//   Pill,
//   PackageSearch,
//   UserCircle,
// } from "lucide-react";

// import AppShell from "./AppShell";

// const navItems = [
//   {
//     label: "Dashboard",
//     to: "/pharmacy/dashboard",
//     icon: LayoutDashboard,
//     end: true,
//   },
//   {
//     label: "Medicines",
//     to: "/pharmacy/medicines",
//     icon: Pill,
//   },
//   {
//     label: "Orders",
//     to: "/pharmacy/orders",
//     icon: PackageSearch,
//   },
//   // {
//   //   label: "Profile",
//   //   to: "/pharmacy/profile",
//   //   icon: UserCircle,
//   // },
// ];

// export default function PharmacyLayout() {
//   return (
//     <AppShell
//       navItems={navItems}
//       roleLabel="Pharmacy"
//       title="CareBridge"
//     />
//   );
// }

//new
import {
  LayoutDashboard,
  Pill,
  PackageSearch,
  UserCircle,
} from "lucide-react";

import AppShell from "./AppShell";

const navItems = [
  {
    label: "Dashboard",
    to: "/pharmacy/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Medicines",
    to: "/pharmacy/medicines",
    icon: Pill,
  },
  {
    label: "Orders",
    to: "/pharmacy/orders",
    icon: PackageSearch,
  },
  {
    label: "Profile",
    to: "/pharmacy/profile",
    icon: UserCircle,
  },
];

export default function PharmacyLayout() {
  return (
    <AppShell
      navItems={navItems}
      roleLabel="Pharmacy"
      title="CareBridge"
    />
  );
}

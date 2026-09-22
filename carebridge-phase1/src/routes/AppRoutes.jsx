// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import ProtectedRoute from "../components/common/ProtectedRoute";
// import { getDashboardPathForRole } from "../store/slices/authSlice";

// // Layouts
// import PatientLayout from "../layouts/PatientLayout";
// import DoctorLayout from "../layouts/DoctorLayout";
// import PharmacyLayout from "../layouts/PharmacyLayout";

// // Common
// import ComingSoon from "../pages/ComingSoon";

// // Auth
// import Login from "../pages/auth/Login";

// // ============================================================
// // PATIENT PAGES
// // ============================================================

// import PatientDashboard from "../pages/patient/PatientDashboard";
// import SymptomChecker from "../pages/patient/SymptomChecker";
// import Doctors from "../pages/patient/Doctor";
// import DoctorDetails from "../pages/patient/DoctorDetails";
// import BookAppointment from "../pages/patient/BookAppointment";
// import Appointments from "../pages/patient/Appointments";
// import MedicalRecords from "../pages/patient/MedicalRecords";
// import Prescriptions from "../pages/patient/Prescriptions";
// import Medicines from "../pages/patient/Medicines";
// import MedicineOrders from "../pages/patient/MedicineOrders";
// import Profile from "../pages/patient/Profile";


// //-------------------------------
// //DOCTOR PAGES
// //------------------------------------
// import DoctorAppointments from "../pages/doctor/Appointments";
// import DoctorDashboard from "../pages/doctor/Dashboard";
// import DoctorMedicalRecords from "../pages/doctor/MedicalRecords";
// import DoctorPrescriptions from "../pages/doctor/Prescriptions";
// import DoctorPatients from "../pages/doctor/Patients";

// //-----
// //PHARMACY
// //------------
// import PharmacyDashboard from "../pages/pharmacy/Dashboard";
// import PharmacyMedicines from "../pages/pharmacy/Medicines";
// import PharmacyOrders from "../pages/pharmacy/Orders";
// // ============================================================
// // PLACEHOLDERS
// // ============================================================

// function RegisterPlaceholder() {
//   return <ComingSoon label="Register" />;
// }

// function LandingPlaceholder() {
//   return <ComingSoon label="CareBridge" />;
// }

// // ============================================================
// // ROLE REDIRECT
// // ============================================================

// function RoleRedirect() {
//   const role = useSelector((state) => state.auth.role);

//   return (
//     <Navigate
//       to={getDashboardPathForRole(role)}
//       replace
//     />
//   );
// }

// // ============================================================
// // ROUTES
// // ============================================================

// export default function AppRoutes() {
//   return (
//     <Routes>

//       {/* ======================================================
//           PUBLIC ROUTES
//       ====================================================== */}

//       <Route
//         path="/"
//         element={<LandingPlaceholder />}
//       />

//       <Route
//         path="/login"
//         element={<Login />}
//       />

//       <Route
//         path="/register"
//         element={<RegisterPlaceholder />}
//       />


//       {/* ======================================================
//           PATIENT ROUTES
//       ====================================================== */}

//       <Route
//         element={
//           <ProtectedRoute
//             allowedRoles={["PATIENT"]}
//           />
//         }
//       >

//         <Route
//           path="/patient"
//           element={<PatientLayout />}
//         >

//           {/* Dashboard */}
//           <Route
//             path="dashboard"
//             element={<PatientDashboard />}
//           />

//           {/* AI Symptom Checker */}
//           <Route
//             path="symptom-checker"
//             element={<SymptomChecker />}
//           />

//           {/* Doctors */}
//           <Route
//             path="doctors"
//             element={<Doctors />}
//           />

//           {/* Doctor Details */}
//           <Route
//             path="doctors/:doctorId"
//             element={<DoctorDetails />}
//           />

//           {/* Book Appointment */}
//           <Route
//             path="doctors/:doctorId/book"
//             element={<BookAppointment />}
//           />

//           {/* My Appointments */}
//           <Route
//             path="appointments"
//             element={<Appointments />}
//           />

//           {/* Medical Records */}
//           <Route
//             path="medical-records"
//             element={<MedicalRecords />}
//           />

//           {/* Prescriptions */}
//           <Route
//             path="prescriptions"
//             element={<Prescriptions />}
//           />

//           {/* Medicines */}
//           <Route
//             path="medicines"
//             element={<Medicines />}
//           />

//           {/* Medicine Orders */}
//           <Route
//             path="orders"
//             element={<MedicineOrders />}
//           />

//           {/* Profile */}
//           <Route
//             path="profile"
//             element={<Profile />}
//           />

//           {/* /patient → /patient/dashboard */}
//           <Route
//             index
//             element={
//               <Navigate
//                 to="dashboard"
//                 replace
//               />
//             }
//           />

//         </Route>

//       </Route>


//       {/* DOCTOR ROUTESPAGES */}

//       {/* <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
//   <Route path="/doctor">
//     <Route
//       path="dashboard"
//       element={<DoctorDashboard />}
//     />

//     <Route
//       path="appointments"
//       element={<DoctorAppointments />}
//     />

//     <Route
//       path="medical-records"
//       element={<DoctorMedicalRecords />}
//     />

//     <Route
//       path="prescriptions"
//       element={<DoctorPrescriptions />}
//     />
//   </Route>
// </Route> */}

// <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
//   <Route path="/doctor" element={<DoctorLayout />}>
//     <Route path="dashboard" element={<DoctorDashboard />} />
//     <Route path="appointments" element={<DoctorAppointments />} />
//     <Route path="patients" element={<DoctorPatients />} />
//     <Route path="medical-records" element={<DoctorMedicalRecords />} />
//     <Route path="prescriptions" element={<DoctorPrescriptions />} />
//   </Route>
// </Route>
//       {/* ======================================================
//           DOCTOR
//           NOT CREATED YET
//       ====================================================== */}

//       {/* We will add Doctor routes later */}


//       {/* ======================================================
//           PHARMACY
          
//       ====================================================== */}
// {/* 
//       <Route element={<ProtectedRoute allowedRoles={["PHARMACY"]} />}>
//   <Route path="/pharmacy">
//     <Route path="dashboard" element={<PharmacyDashboard />} />
//     <Route path="medicines" element={<PharmacyMedicines />} />
//     <Route
//       path="orders"
//       element={<PharmacyOrders />}
//     />
//   </Route>
// </Route> */}

// <Route element={<ProtectedRoute allowedRoles={["PHARMACY"]} />}>
//   <Route path="/pharmacy" element={<PharmacyLayout />}>
//     <Route path="dashboard" element={<PharmacyDashboard />} />
//     <Route path="medicines" element={<PharmacyMedicines />} />
//     <Route path="orders" element={<PharmacyOrders />} />
//   </Route>
// </Route>

//       {/* ======================================================
//           ROLE-BASED HOME
//       ====================================================== */}

//       <Route
//         element={<ProtectedRoute />}
//       >

//         <Route
//           path="/home"
//           element={<RoleRedirect />}
//         />

//       </Route>


//       {/* ======================================================
//           FALLBACK
//       ====================================================== */}

//       <Route
//         path="*"
//         element={
//           <Navigate
//             to="/"
//             replace
//           />
//         }
//       />

//     </Routes>
//   );
// }


//NEW
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "../components/common/ProtectedRoute";
import { getDashboardPathForRole } from "../store/slices/authSlice";


//landing
import Landing from "../pages/Landing";
// Layouts
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PharmacyLayout from "../layouts/PharmacyLayout";

// Common
import ComingSoon from "../pages/ComingSoon";

// Auth
import Login from "../pages/auth/Login";

//regsiter
import Register from "../pages/Register";
import AdminVerify from "../pages/AdminVerify";


// ============================================================
// PATIENT PAGES
// ============================================================

import PatientDashboard from "../pages/patient/PatientDashboard";
import SymptomChecker from "../pages/patient/SymptomChecker";
import Doctors from "../pages/patient/Doctor";
import DoctorDetails from "../pages/patient/DoctorDetails";
import BookAppointment from "../pages/patient/BookAppointment";
import Appointments from "../pages/patient/Appointments";
import MedicalRecords from "../pages/patient/MedicalRecords";
import Prescriptions from "../pages/patient/Prescriptions";
import Medicines from "../pages/patient/Medicines";
import MedicineOrders from "../pages/patient/MedicineOrders";
import Profile from "../pages/patient/Profile";


//-------------------------------
//DOCTOR PAGES
//------------------------------------
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorMedicalRecords from "../pages/doctor/MedicalRecords";
import DoctorPrescriptions from "../pages/doctor/Prescriptions";
import DoctorPatients from "../pages/doctor/Patients";
import DoctorProfile from "../pages/doctor/Profile";

//-----
//PHARMACY
//------------
import PharmacyDashboard from "../pages/pharmacy/Dashboard";
import PharmacyMedicines from "../pages/pharmacy/Medicines";
import PharmacyOrders from "../pages/pharmacy/Orders";
import PharmacyProfile from "../pages/pharmacy/Profile";

// ============================================================
// PLACEHOLDERS
// ============================================================

function RegisterPlaceholder() {
  return <ComingSoon label="Register" />;
}

function LandingPlaceholder() {
  return <ComingSoon label="CareBridge" />;
}

// ============================================================
// ROLE REDIRECT
// ============================================================

function RoleRedirect() {
  const role = useSelector((state) => state.auth.role);

  return (
    <Navigate
      to={getDashboardPathForRole(role)}
      replace
    />
  );
}

// ============================================================
// ROUTES
// ============================================================

export default function AppRoutes() {
  return (
    <Routes>

      {/* ======================================================
          PUBLIC ROUTES
      ====================================================== */}

      {/* <Route
        path="/"
        element={<LandingPlaceholder />}
      /> */}

      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={<Login />}
      />

     

        //Admin verification 
//Registration
<Route path="/register/:role" element={<Register />} />
<Route path="/register" element={<Register />} />
<Route path="/admin-verify" element={<AdminVerify />} />
      {/* ======================================================
          PATIENT ROUTES
      ====================================================== */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["PATIENT"]}
          />
        }
      >

        <Route
          path="/patient"
          element={<PatientLayout />}
        >

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<PatientDashboard />}
          />

          {/* AI Symptom Checker */}
          <Route
            path="symptom-checker"
            element={<SymptomChecker />}
          />

          {/* Doctors */}
          <Route
            path="doctors"
            element={<Doctors />}
          />

          {/* Doctor Details */}
          <Route
            path="doctors/:doctorId"
            element={<DoctorDetails />}
          />

          {/* Book Appointment */}
          <Route
            path="doctors/:doctorId/book"
            element={<BookAppointment />}
          />

          {/* My Appointments */}
          <Route
            path="appointments"
            element={<Appointments />}
          />

          {/* Medical Records */}
          <Route
            path="medical-records"
            element={<MedicalRecords />}
          />

          {/* Prescriptions */}
          <Route
            path="prescriptions"
            element={<Prescriptions />}
          />

          {/* Medicines */}
          <Route
            path="medicines"
            element={<Medicines />}
          />

          {/* Medicine Orders */}
          <Route
            path="orders"
            element={<MedicineOrders />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* /patient → /patient/dashboard */}
          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

        </Route>

      </Route>


      {/* ======================================================
          DOCTOR ROUTES  (DOCTOR role only)
      ====================================================== */}

      <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="medical-records" element={<DoctorMedicalRecords />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="profile" element={<DoctorProfile />} />

          {/* /doctor → /doctor/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>


      {/* ======================================================
          PHARMACY ROUTES  (PHARMACY role only)
      ====================================================== */}

      <Route element={<ProtectedRoute allowedRoles={["PHARMACY"]} />}>
        <Route path="/pharmacy" element={<PharmacyLayout />}>
          <Route path="dashboard" element={<PharmacyDashboard />} />
          <Route path="medicines" element={<PharmacyMedicines />} />
          <Route path="orders" element={<PharmacyOrders />} />
          <Route path="profile" element={<PharmacyProfile />} />

          {/* /pharmacy → /pharmacy/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>


      {/* ======================================================
          ROLE-BASED HOME
      ====================================================== */}

      <Route
        element={<ProtectedRoute />}
      >

        <Route
          path="/home"
          element={<RoleRedirect />}
        />

      </Route>


      {/* ======================================================
          FALLBACK
      ====================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}
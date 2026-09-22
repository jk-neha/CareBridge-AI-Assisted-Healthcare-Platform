// // import { useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import api, { getErrorMessage } from "../services/api";

// // /* ------------------------------------------------------------------ */
// // /*  Adjust these field lists if your serializers need something else. */
// // /*  The page shows the raw backend error below the form, so if a      */
// // /*  field is missing or wrong, the exact reason will show up there.   */
// // /* ------------------------------------------------------------------ */

// // const ROLES = [
// //   {
// //     key: "patient",
// //     label: "Patient",
// //     endpoint: "/api/account/patients/register/",
// //     fields: [
// //       { name: "email", label: "Email", type: "email" },
// //       { name: "password", label: "Password", type: "password" },
// //       { name: "name", label: "Full name", type: "text" },
// //     ],
// //   },
// //   {
// //     key: "doctor",
// //     label: "Doctor",
// //     endpoint: "/api/account/doctors/register/",
// //     fields: [
// //       { name: "email", label: "Email", type: "email" },
// //       { name: "password", label: "Password", type: "password" },
// //       { name: "name", label: "Full name", type: "text" },
// //       { name: "specialization", label: "Specialization", type: "text" },
// //       { name: "license_number", label: "License number", type: "text" },
// //       { name: "experience_years", label: "Years of experience", type: "number" },
// //     ],
// //   },
// //   {
// //     key: "pharmacy",
// //     label: "Pharmacy",
// //     endpoint: "/api/account/pharmacies/register/",
// //     fields: [
// //       { name: "email", label: "Email", type: "email" },
// //       { name: "password", label: "Password", type: "password" },
// //       { name: "name", label: "Owner / contact name", type: "text" },
// //       { name: "pharmacy_name", label: "Pharmacy name", type: "text" },
// //       { name: "address", label: "Address", type: "text" },
// //       { name: "license_number", label: "License number", type: "text" },
// //     ],
// //   },
// // ];

// // export default function Register() {
// //   // /register/patient, /register/doctor, /register/pharmacy each land
// //   // here with :role set — falls back to "patient" if visited without one.
// //   const { role: roleParam } = useParams();
// //   const initialRole = ROLES.some((r) => r.key === roleParam)
// //     ? roleParam
// //     : "patient";

// //   const [activeRole, setActiveRole] = useState(initialRole);
// //   const [form, setForm] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [rawError, setRawError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   const role = ROLES.find((r) => r.key === activeRole);

// //   const handleChange = (name, value) => {
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleRoleChange = (key) => {
// //     setActiveRole(key);
// //     setForm({});
// //     setError("");
// //     setRawError(null);
// //     setSuccess(false);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setRawError(null);
// //     setSuccess(false);
// //     setLoading(true);

// //     try {
// //       await api.post(role.endpoint, form);
// //       setSuccess(true);
// //       setForm({});
// //     } catch (err) {
// //       setError(getErrorMessage(err, "Registration failed."));
// //       // Show the exact backend response so missing/wrong fields are obvious
// //       setRawError(err?.response?.data ?? null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
// //       <h1 className="text-2xl font-bold text-slate-900">
// //         Create a demo account
// //       </h1>

// //       <p className="mt-1 text-sm text-slate-500">
// //         Register as a patient, doctor, or pharmacy.
// //       </p>

// //       <div
// //         role="tablist"
// //         className="mt-6 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1"
// //       >
// //         {ROLES.map((r) => (
// //           <button
// //             key={r.key}
// //             type="button"
// //             role="tab"
// //             aria-selected={activeRole === r.key}
// //             onClick={() => handleRoleChange(r.key)}
// //             className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
// //               activeRole === r.key
// //                 ? "bg-white text-slate-900 shadow-sm"
// //                 : "text-slate-500 hover:text-slate-800"
// //             }`}
// //           >
// //             {r.label}
// //           </button>
// //         ))}
// //       </div>

// //       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
// //         {role.fields.map((field) => (
// //           <div key={field.name}>
// //             <label className="block text-sm font-semibold text-slate-900">
// //               {field.label}
// //             </label>
// //             <input
// //               type={field.type}
// //               required
// //               value={form[field.name] || ""}
// //               onChange={(e) => handleChange(field.name, e.target.value)}
// //               className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //             />
// //           </div>
// //         ))}

// //         {error && (
// //           <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
// //             <p className="font-semibold">{error}</p>

// //             {rawError && (
// //               <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-xs text-red-600">
// //                 {JSON.stringify(rawError, null, 2)}
// //               </pre>
// //             )}
// //           </div>
// //         )}

// //         {success && (
// //           <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
// //             {role.label} account created
// //             {role.key !== "patient" &&
// //               " — an admin needs to verify it before it can log in."}
// //           </div>
// //         )}

// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
// //         >
// //           {loading ? "Creating..." : `Register as ${role.label}`}
// //         </button>
// //       </form>

// //       <p className="mt-6 text-center text-sm text-slate-500">
// //         Already have an account?{" "}
// //         <Link to="/login" className="font-semibold text-blue-600">
// //           Log in
// //         </Link>
// //       </p>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import api, { getErrorMessage } from "../services/api";

// /* ------------------------------------------------------------------ */
// /*  Adjust these field lists if your serializers need something else. */
// /*  The page shows the raw backend error below the form, so if a      */
// /*  field is missing or wrong, the exact reason will show up there.   */
// /* ------------------------------------------------------------------ */

// const ROLES = [
//   {
//     key: "patient",
//     label: "Patient",
//     endpoint: "/api/account/patients/register/",
//     fields: [
//       { name: "username", label: "Username", type: "text" },
//       { name: "email", label: "Email", type: "email" },
//       { name: "password", label: "Password", type: "password" },
//       { name: "name", label: "Full name", type: "text" },
//     ],
//   },
//   {
//     key: "doctor",
//     label: "Doctor",
//     endpoint: "/api/account/doctors/register/",
//     fields: [
//       { name: "username", label: "Username", type: "text" },
//       { name: "email", label: "Email", type: "email" },
//       { name: "password", label: "Password", type: "password" },
//       { name: "name", label: "Full name", type: "text" },
//       { name: "specialization", label: "Specialization", type: "text" },
//       { name: "qualification", label: "Qualification", type: "text" },
//       { name: "license_number", label: "License number", type: "text" },
//       {
//         name: "experience_years",
//         label: "Years of experience",
//         type: "number",
//         min: 0,
//       },
//       {
//         name: "consultation_fee",
//         label: "Consultation fee",
//         type: "number",
//         min: 0,
//       },
//     ],
//   },
//   {
//     key: "pharmacy",
//     label: "Pharmacy",
//     endpoint: "/api/account/pharmacies/register/",
//     fields: [
//       { name: "username", label: "Username", type: "text" },
//       { name: "email", label: "Email", type: "email" },
//       { name: "password", label: "Password", type: "password" },
//       { name: "name", label: "Owner / contact name", type: "text" },
//       { name: "pharmacy_name", label: "Pharmacy name", type: "text" },
//       { name: "address", label: "Address", type: "text" },
//       { name: "license_number", label: "License number", type: "text" },
//     ],
//   },
// ];

// export default function Register() {
//   // /register/patient, /register/doctor, /register/pharmacy each land
//   // here with :role set — falls back to "patient" if visited without one.
//   const { role: roleParam } = useParams();
//   const initialRole = ROLES.some((r) => r.key === roleParam)
//     ? roleParam
//     : "patient";

//   const [activeRole, setActiveRole] = useState(initialRole);
//   const [form, setForm] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [rawError, setRawError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const role = ROLES.find((r) => r.key === activeRole);

//   const handleChange = (name, value) => {
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRoleChange = (key) => {
//     setActiveRole(key);
//     setForm({});
//     setError("");
//     setRawError(null);
//     setSuccess(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setRawError(null);
//     setSuccess(false);
//     setLoading(true);

//     try {
//       await api.post(role.endpoint, form);
//       setSuccess(true);
//       setForm({});
//     } catch (err) {
//       setError(getErrorMessage(err, "Registration failed."));
//       // Show the exact backend response so missing/wrong fields are obvious
//       setRawError(err?.response?.data ?? null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
//       <h1 className="text-2xl font-bold text-slate-900">
//         Create a demo account
//       </h1>

//       <p className="mt-1 text-sm text-slate-500">
//         Register as a patient, doctor, or pharmacy.
//       </p>

//       <div
//         role="tablist"
//         className="mt-6 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1"
//       >
//         {ROLES.map((r) => (
//           <button
//             key={r.key}
//             type="button"
//             role="tab"
//             aria-selected={activeRole === r.key}
//             onClick={() => handleRoleChange(r.key)}
//             className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
//               activeRole === r.key
//                 ? "bg-white text-slate-900 shadow-sm"
//                 : "text-slate-500 hover:text-slate-800"
//             }`}
//           >
//             {r.label}
//           </button>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         {role.fields.map((field) => (
//           <div key={field.name}>
//             <label className="block text-sm font-semibold text-slate-900">
//               {field.label}
//             </label>
//             <input
//               type={field.type}
//               required
//               min={field.min}
//               value={form[field.name] || ""}
//               onChange={(e) => handleChange(field.name, e.target.value)}
//               className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />
//           </div>
//         ))}

//         {error && (
//           <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
//             <p className="font-semibold">{error}</p>

//             {rawError && (
//               <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-xs text-red-600">
//                 {JSON.stringify(rawError, null, 2)}
//               </pre>
//             )}
//           </div>
//         )}

//         {success && (
//           <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
//             {role.label} account created
//             {role.key !== "patient" &&
//               " — an admin needs to verify it before it can log in."}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
//         >
//           {loading ? "Creating..." : `Register as ${role.label}`}
//         </button>
//       </form>

//       <p className="mt-6 text-center text-sm text-slate-500">
//         Already have an account?{" "}
//         <Link to="/login" className="font-semibold text-blue-600">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";

/* ------------------------------------------------------------------ */
/*  Adjust these field lists if your serializers need something else. */
/*  The page shows the raw backend error below the form, so if a      */
/*  field is missing or wrong, the exact reason will show up there.   */
/* ------------------------------------------------------------------ */

const ROLES = [
  {
    key: "patient",
    label: "Patient",
    endpoint: "/api/account/patients/register/",
    fields: [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "name", label: "Full name", type: "text" },
    ],
  },
  {
    key: "doctor",
    label: "Doctor",
    endpoint: "/api/account/doctors/register/",
    fields: [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "name", label: "Full name", type: "text" },
      { name: "specialization", label: "Specialization", type: "text" },
      { name: "qualification", label: "Qualification", type: "text" },
      { name: "license_number", label: "License number", type: "text" },
      {
        name: "experience_years",
        label: "Years of experience",
        type: "number",
        min: 0,
      },
      {
        name: "consultation_fee",
        label: "Consultation fee",
        type: "number",
        min: 0,
      },
    ],
  },
  {
    key: "pharmacy",
    label: "Pharmacy",
    endpoint: "/api/account/pharmacies/register/",
    fields: [
      { name: "username", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "name", label: "Owner / contact name", type: "text" },
      { name: "pharmacy_name", label: "Pharmacy name", type: "text" },
      { name: "address", label: "Address", type: "text" },
      { name: "license_number", label: "License number", type: "text" },
    ],
  },
];

export default function Register() {
  // /register/patient, /register/doctor, /register/pharmacy each land
  // here with :role set — falls back to "patient" if visited without one.
  const { role: roleParam } = useParams();
  const initialRole = ROLES.some((r) => r.key === roleParam)
    ? roleParam
    : "patient";

  const [activeRole, setActiveRole] = useState(initialRole);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rawError, setRawError] = useState(null);
  const [success, setSuccess] = useState(false);

  const role = ROLES.find((r) => r.key === activeRole);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (key) => {
    setActiveRole(key);
    setForm({});
    setError("");
    setRawError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRawError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await api.post(role.endpoint, form);
      setSuccess(true);
      setForm({});
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed."));
      // Show the exact backend response so missing/wrong fields are obvious
      setRawError(err?.response?.data ?? null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900">
        Create a demo account
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        Register as a patient, doctor, or pharmacy.
      </p>

      <div
        role="tablist"
        className="mt-6 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1"
      >
        {ROLES.map((r) => (
          <button
            key={r.key}
            type="button"
            role="tab"
            aria-selected={activeRole === r.key}
            onClick={() => handleRoleChange(r.key)}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
              activeRole === r.key
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {role.key !== "patient" && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <p className="font-semibold">Admin verification required</p>
            <p className="mt-1 text-amber-700">
              {role.label} accounts can&apos;t register and log in right away. An
              admin needs to verify your details first — this can take
              a little while on a live/demo deployment.
            </p>
          </div>
        )}

        {role.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-slate-900">
              {field.label}
            </label>
            <input
              type={field.type}
              required
              min={field.min}
              value={form[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        ))}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <p className="font-semibold">{error}</p>

            {rawError && (
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words text-xs text-red-600">
                {JSON.stringify(rawError, null, 2)}
              </pre>
            )}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {role.label} account created
            {role.key !== "patient" &&
              " — an admin needs to verify it before it can log in."}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : `Register as ${role.label}`}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-blue-600">
          Log in
        </Link>
      </p>
    </div>
  );
}
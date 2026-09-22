import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

const LOGIN_PATH = "/login";

const AUTHOR_NAME = "Neha Vardhini J K";
const GITHUB_URL = "https://github.com/jk-neha";
const LINKEDIN_URL = "https://www.linkedin.com/in/nehavardhinijk/";

const DEMO_ACCOUNTS = [
  {
    role: "patient",
    label: "Patient",
    icon: UserRound,
    summary:
      "Book appointments, view prescriptions, and order medicines.",
    pages: [
      "AI Symptom Checker",
      "Find Doctors and Appointments",
      "Prescriptions and Medicine Orders",
    ],
    username: "demopatient1",
    password: "demopatient1",
  },
  {
    role: "doctor",
    label: "Doctor",
    icon: Stethoscope,
    summary:
      "Manage consultations, medical records, and prescriptions.",
    pages: [
      "Appointments and Patients",
      "Medical Records",
      "Prescriptions",
    ],
    username: "demodoctor2",
    password: "demodoctor2",
  },
  {
    role: "pharmacy",
    label: "Pharmacy",
    icon: Pill,
    summary:
      "Manage medicine inventory and fulfil patient orders.",
    pages: [
      "Medicine Catalogue",
      "Price and Stock Management",
      "Patient Orders",
    ],
    username: "demopharmacy02",
    password: "demopharmacy02",
  },
];

const ROLES = [
  {
    icon: UserRound,
    title: "For Patients",
    text:
      "Find doctors, manage appointments, view prescriptions, and order medicines.",
  },
  {
    icon: Stethoscope,
    title: "For Doctors",
    text:
      "Manage appointments, maintain medical records, and create prescriptions.",
  },
  {
    icon: Pill,
    title: "For Pharmacies",
    text:
      "Manage medicine inventory, pricing, stock, and patient orders.",
  },
];

const JOURNEY = [
  {
    number: "01",
    icon: Users,
    title: "Connect",
    text:
      "Patients find verified doctors and book appointments.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Consult",
    text:
      "Doctors manage appointments, records, diagnoses, and prescriptions.",
  },
  {
    number: "03",
    icon: Pill,
    title: "Prescribe",
    text:
      "Prescribed medicines connect to available pharmacy inventory.",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Care",
    text:
      "Patients order medicines while pharmacies manage fulfilment.",
  },
];

const TECH_STACK = [
  "React",
  "Vite",
  "Tailwind CSS",
  "Django",
  "Django REST Framework",
  "PostgreSQL",
];

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Manual copy is still possible because the value is visible.
    }
  };

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5">
        <code className="min-w-0 flex-1 truncate text-sm text-slate-100">
          {value}
        </code>

        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-300 transition hover:bg-white/10 hover:text-blue-200"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function DemoLoginCard() {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("patient");

  const account =
    DEMO_ACCOUNTS.find((item) => item.role === activeRole) ||
    DEMO_ACCOUNTS[0];

  const Icon = account.icon;

  const handleLogin = () => {
    navigate(LOGIN_PATH, {
      state: {
        email: account.username,
        password: account.password,
      },
    });
  };

  return (
    <div
      id="demo"
      className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
    >
      {/* Card header */}
      <div className="border-b border-white/10 px-6 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Explore the demo
            </h3>

            <p className="text-xs text-slate-400">
              No registration required
            </p>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 sm:p-7">
        {/* Role selector */}
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-white/[0.06] p-1">
          {DEMO_ACCOUNTS.map((item) => {
            const RoleIcon = item.icon;

            return (
              <button
                key={item.role}
                type="button"
                onClick={() => setActiveRole(item.role)}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition ${
                  activeRole === item.role
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <RoleIcon size={14} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Active account */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Icon size={21} />
            </div>

            <div>
              <p className="font-semibold text-white">
                {account.label} portal
              </p>

              <p className="text-sm text-slate-400">
                {account.summary}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-5 space-y-2">
            {account.pages.map((page) => (
              <div
                key={page}
                className="flex items-center gap-2 text-sm text-slate-300"
              >
                <Check
                  size={15}
                  className="shrink-0 text-emerald-400"
                />

                <span>{page}</span>
              </div>
            ))}
          </div>

          {/* Credentials */}
          <div className="mt-6 space-y-3">
            <CopyField
              label="Username"
              value={account.username}
            />

            <CopyField
              label="Password"
              value={account.password}
            />
          </div>

          {/* Login */}
          <button
            type="button"
            onClick={handleLogin}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Continue as {account.label}

            <ArrowRight size={17} />
          </button>
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          Demo accounts use sample data only. Do not enter real
          medical information.
        </p>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">

      {/* ============================================================ */}
      {/* NAVBAR                                                       */}
      {/* ============================================================ */}

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <HeartPulse size={20} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Care<span className="text-blue-600">Bridge</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1.5">

            <a
              href="#how-it-works"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
            >
              How it works
            </a>

            <a
              href="#demo"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
            >
              Demo
            </a>

            <a
  href={GITHUB_URL}
  target="_blank"
  rel="noreferrer"
  className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
>
  GitHub
</a>

            <Link
              to={LOGIN_PATH}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Log in
            </Link>
          </nav>
        </div>
      </header>


      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}

      <main>

        <section className="relative overflow-hidden bg-white">

          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">

            {/* Hero content */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />

                Connected healthcare, simplified
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Healthcare that

                <span className="block text-blue-600">
                  connects everyone.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                CareBridge brings patients, doctors, and pharmacies
                together in one connected healthcare platform.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link
                  to={LOGIN_PATH}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Get started

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>

                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Explore demo

                  <ChevronRight size={17} />
                </a>

              </div>

              {/* Small feature list */}
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <Check
                    size={16}
                    className="text-emerald-500"
                  />

                  Patient portal
                </div>

                <div className="flex items-center gap-2">
                  <Check
                    size={16}
                    className="text-emerald-500"
                  />

                  Doctor portal
                </div>

                <div className="flex items-center gap-2">
                  <Check
                    size={16}
                    className="text-emerald-500"
                  />

                  Pharmacy portal
                </div>

              </div>
            </div>


            {/* Hero visual */}
            <div className="relative">

              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-5 shadow-2xl shadow-slate-300/40 sm:p-6">

                {/* Visual header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <HeartPulse size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        CareBridge
                      </p>

                      <p className="text-xs text-slate-500">
                        Connected care
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    Connected
                  </span>

                </div>


                {/* Patient */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <UserRound size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-white">
                        Patient
                      </p>

                      <p className="text-xs text-slate-500">
                        Books appointment
                      </p>

                    </div>

                    <Check
                      size={17}
                      className="text-emerald-400"
                    />

                  </div>

                </div>


                {/* Doctor */}
                <div className="ml-5 mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:ml-10">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <Stethoscope size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-white">
                        Doctor
                      </p>

                      <p className="text-xs text-slate-500">
                        Creates prescription
                      </p>

                    </div>

                    <Check
                      size={17}
                      className="text-emerald-400"
                    />

                  </div>

                </div>


                {/* Pharmacy */}
                <div className="ml-10 mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:ml-20">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                      <Pill size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-white">
                        Pharmacy
                      </p>

                      <p className="text-xs text-slate-500">
                        Fulfils medicine order
                      </p>

                    </div>

                    <Check
                      size={17}
                      className="text-emerald-400"
                    />

                  </div>

                </div>

              </div>


              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex sm:items-center sm:gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={18} />
                </div>

                <div>

                  <p className="text-xs font-semibold text-slate-900">
                    Role-based access
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Patient · Doctor · Pharmacy
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ========================================================== */}
        {/* ROLES                                                       */}
        {/* ========================================================== */}

        <section className="border-y border-slate-200 bg-slate-50">

          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold text-blue-600">
                ONE PLATFORM
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Built around the people involved in care.
              </h2>

              <p className="mt-3 text-slate-600">
                Each role gets a dedicated workspace while staying
                connected to the same healthcare journey.
              </p>

            </div>


            <div className="mt-9 grid gap-5 md:grid-cols-3">

              {ROLES.map((role) => {
                const Icon = role.icon;

                return (
                  <div
                    key={role.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-950">
                      {role.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {role.text}
                    </p>

                    <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">
                      Dedicated workspace
                      <ArrowRight size={15} />
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>


        {/* ========================================================== */}
        {/* HOW IT WORKS                                                */}
        {/* ========================================================== */}

        <section
          id="how-it-works"
          className="bg-white"
        >

          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">

            <div className="text-center">

              <p className="text-sm font-semibold text-blue-600">
                HOW IT WORKS
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                From appointment to medicine.
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Follow a single healthcare journey across the
                CareBridge platform.
              </p>

            </div>


            <div className="relative mt-14 grid gap-8 md:grid-cols-4">

              {/* Connecting line */}
              <div className="absolute left-[12%] right-[12%] top-7 hidden border-t border-dashed border-slate-300 md:block" />

              {JOURNEY.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative text-center"
                  >

                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm">
                      <Icon size={21} />
                    </div>

                    <p className="mt-5 text-xs font-bold tracking-widest text-blue-600">
                      {step.number}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.text}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </section>


        {/* ========================================================== */}
        {/* DEMO                                                        */}
        {/* ========================================================== */}

        <section
          id="demo"
          className="border-y border-slate-800 bg-slate-950"
        >

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">

            <div>

              <p className="text-sm font-semibold text-blue-400">
                TRY CAREBRIDGE
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                See the complete workflow yourself.
              </h2>

              <p className="mt-4 max-w-lg leading-7 text-slate-400">
                Use the dedicated demo accounts to explore the
                patient, doctor, and pharmacy portals with sample
                data.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex gap-3">
                  <Check
                    className="mt-0.5 shrink-0 text-emerald-400"
                    size={18}
                  />

                  <p className="text-sm text-slate-300">
                    Explore each role independently
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check
                    className="mt-0.5 shrink-0 text-emerald-400"
                    size={18}
                  />

                  <p className="text-sm text-slate-300">
                    Follow appointments, prescriptions, and medicine
                    orders
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check
                    className="mt-0.5 shrink-0 text-emerald-400"
                    size={18}
                  />

                  <p className="text-sm text-slate-300">
                    No real patient or medical data is used
                  </p>
                </div>

              </div>

            </div>

            <DemoLoginCard />

          </div>

        </section>

      </main>


      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}

      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <HeartPulse size={19} />
                </div>

                <span className="font-bold">
                  Care<span className="text-blue-600">
                    Bridge
                  </span>
                </span>

              </div>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                A full-stack healthcare platform connecting
                patients, doctors, and pharmacies.
              </p>

            </div>


            {/* Links */}
            {/* <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-500">

             <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:block"
            >
              GitHub
            </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-900"
              >
                LinkedIn
              </a>

              <Link
                to={LOGIN_PATH}
                className="transition hover:text-slate-900"
              >
                Log in
              </Link>

            </div> */}

          </div>


          {/* Bottom footer */}
          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">

            <p>
              © {new Date().getFullYear()} {AUTHOR_NAME}.
              Built as a portfolio project.
            </p>

            <div className="flex flex-wrap gap-2">

              {TECH_STACK.map((tech, index) => (
                <span key={tech}>
                  {tech}

                  {index !== TECH_STACK.length - 1 && " · "}
                </span>
              ))}

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}


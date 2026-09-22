<div align="center">

# 🩺 CareBridge

### AI-Assisted Healthcare Platform

**Connecting Patients, Doctors, and Pharmacies in one healthcare workflow.**

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge\&logo=django\&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST_Framework-API-A30000?style=for-the-badge\&logo=django\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge\&logo=postgresql\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge\&logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge\&logo=vercel)

<br/><br/>

> **A full-stack healthcare platform that connects patients, doctors, and pharmacies through appointments, medical records, prescriptions, medicine inventory, and medicine orders.**

<br/>

### 

**[🌐 Live Project](https://care-bridge-ai-assisted-healthcare.vercel.app/)** **[💻 GitHub Repository](https://github.com/jk-neha/CareBridge-AI-Assisted-Healthcare-Platform)**

</div>

---

# 📑 Table of Contents

* [Overview](#-overview)
* [Problem Statement](#-problem-statement)
* [Core Workflow](#-core-workflow)
* [User Roles](#-user-roles)
* [Features](#-features)
* [AI Symptom Checker](#-ai-symptom-checker)
* [Tech Stack](#-tech-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [Database Design](#-database-design)
* [Authentication & Authorization](#-authentication--authorization)
* [API Modules](#-api-modules)
* [Security](#-security)
* [Results Gallery](#-results-gallery)
* [Local Setup](#-local-setup)
* [Environment Variables](#-environment-variables)
* [Deployment](#-deployment)
* [Future Enhancements](#-future-enhancements)
* [Author](#-author)

---

# 🌍 Overview

## 🩺 CareBridge

CareBridge is a full-stack healthcare web application designed to connect three key participants in a healthcare journey:

* 👤 **Patients**
* 👨‍⚕️ **Doctors**
* 🏪 **Pharmacies**

Instead of treating appointments, prescriptions, and medicine orders as separate processes, CareBridge connects them into a single workflow.

A patient can find a doctor and book an appointment.

The doctor can accept the appointment, complete the consultation, create a medical record, and issue a prescription.

The patient can then view the prescription and order the prescribed medicine from available pharmacy inventory.

The pharmacy can manage medicines, stock, pricing, and patient orders.

---

# 🎯 Problem Statement

Traditional healthcare workflows can involve multiple disconnected steps:

```text
Patient
   ↓
Doctor
   ↓
Medical Record
   ↓
Prescription
   ↓
Pharmacy
   ↓
Medicine Order
```

When these activities are handled independently, information can become fragmented.

CareBridge brings these steps together into one role-based platform.

---

# 🔄 Core Workflow

The primary CareBridge workflow is:

```text
                 ┌───────────────┐
                 │    Patient    │
                 └───────┬───────┘
                         │
                         │ Book Appointment
                         ▼
                 ┌───────────────┐
                 │    Doctor     │
                 └───────┬───────┘
                         │
                   Accepts & Completes
                         │
                         ▼
                 ┌───────────────┐
                 │Medical Record │
                 └───────┬───────┘
                         │
                    Prescription
                         │
                         ▼
                 ┌───────────────┐
                 │    Patient    │
                 └───────┬───────┘
                         │
                    Orders Medicine
                         │
                         ▼
                 ┌───────────────┐
                 │   Pharmacy    │
                 └───────┬───────┘
                         │
                  Confirms Order
                         ▼
                 ┌───────────────┐
                 │Medicine Order │
                 └───────────────┘
```

This workflow is the core of the application.

---

# 👥 User Roles

## 👤 Patient

Patients can:

* Register and log in
* Manage their profile
* Find doctors
* View doctor details
* Book appointments
* View appointment status
* Cancel appointments
* View completed medical records
* View prescriptions
* Browse available medicines
* Place medicine orders
* Track medicine orders
* Use the AI-assisted symptom checker

---

## 👨‍⚕️ Doctor

Doctors can:

* Register and log in
* Manage their professional profile
* View appointments
* Accept or reject appointments
* Complete consultations
* View patients
* Create medical records
* Add diagnoses and symptoms
* Create prescriptions
* Select medicines
* Specify dosage, frequency, and duration

---

## 🏪 Pharmacy

Pharmacies can:

* Register and log in
* Manage pharmacy profile
* Add medicines
* Manage medicine prices
* Manage medicine stock
* View medicine inventory
* Update medicine availability
* Delete their own medicines
* View patient medicine orders
* Confirm or reject orders

---

# ✨ Features

| Feature                 | Description                                                                   |
| :---------------------- | :---------------------------------------------------------------------------- |
| 🔐 Authentication       | JWT-based authentication with role-based access                               |
| 👤 Patient Portal       | Patient profile, appointments, records, prescriptions and orders              |
| 👨‍⚕️ Doctor Portal     | Appointment, patient, medical record and prescription management              |
| 🏪 Pharmacy Portal      | Medicine inventory and order management                                       |
| 📅 Appointment System   | Patients can book appointments with doctors                                   |
| ✅ Appointment Status    | Pending, accepted, rejected, completed and cancelled states                   |
| 📋 Medical Records      | Doctors can create records linked to completed appointments                   |
| 💊 Prescriptions        | Doctors can create medicine prescriptions with dosage, frequency and duration |
| 🛒 Medicine Orders      | Patients can order medicines from pharmacy inventory                          |
| 📦 Inventory Management | Pharmacies can manage medicine name, price, stock and availability            |
| 🔒 Ownership Protection | Pharmacies can only modify/delete medicines belonging to them                 |
| 🤖 AI Symptom Checker   | AI-assisted symptom guidance through the healthcare workflow                  |
| 🛡️ Role-Based Access   | Patient, doctor and pharmacy permissions are separated                        |
| 📱 Responsive UI        | Modern responsive interface for different screen sizes                        |

---

# 🤖 AI Symptom Checker

CareBridge includes an AI-assisted symptom checker for patients.

The patient can enter symptoms and receive AI-generated guidance through the application.

The feature is designed as an **assistive tool**, not as a replacement for professional medical diagnosis.

```text
Patient Symptoms
       ↓
AI Symptom Checker
       ↓
AI-Assisted Guidance
       ↓
Doctor Consultation
```

For healthcare decisions, users should consult qualified medical professionals.

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose             |
| :------------ | :------------------ |
| React         | UI development      |
| Vite          | Frontend build tool |
| Tailwind CSS  | Styling             |
| React Router  | Client-side routing |
| Redux Toolkit | State management    |
| Axios         | API communication   |
| Lucide React  | UI icons            |

## Backend

| Technology            | Purpose                        |
| :-------------------- | :----------------------------- |
| Python                | Backend language               |
| Django                | Backend framework              |
| Django REST Framework | REST API development           |
| Simple JWT            | Authentication                 |
| PostgreSQL            | Relational database            |
| WhiteNoise            | Static file serving            |
| CORS Headers          | Frontend/backend communication |

The frontend dependencies and scripts are defined in the project's `package.json`, while the backend uses Django REST Framework with JWT authentication and PostgreSQL configuration.

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │      + Vite          │
                    │    Tailwind CSS      │
                    └──────────┬───────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Django Backend     │
                    │ Django REST Framework│
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     PostgreSQL       │
                    │       Database       │
                    └──────────────────────┘
```

---

# 📁 Project Structure

```text
CareBridge-AI-Assisted-Healthcare-Platform/
│
├── account/
│   ├── admin.py
│   ├── ai_service.py
│   ├── apps.py
│   ├── models.py
│   ├── permissions.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── migrations/
│
├── carebridge/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── carebridge-phase1/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env.example
│
├── manage.py
├── .gitignore
└── README.md
```

---

# 🗄️ Database Design

CareBridge uses PostgreSQL with Django ORM.

### Main Entities

```text
User
│
├── PatientProfile
│
├── DoctorProfile
│
└── PharmacyProfile


DoctorProfile
      │
      └── Appointments
             │
             ▼
        MedicalRecord
             │
             ▼
      PrescriptionItem
             │
             ▼
          Medicine
             │
             ▼
       MedicineOrder
```

### Core Models

* `User`
* `PatientProfile`
* `DoctorProfile`
* `PharmacyProfile`
* `Medicine`
* `Appointment`
* `MedicalRecord`
* `PrescriptionItem`
* `MedicineOrder`

The application uses separate profile models for patients, doctors and pharmacies while connecting appointments, records, prescriptions and orders through relational foreign keys.

---

# 🔐 Authentication & Authorization

CareBridge uses JWT-based authentication.

```text
User Login
    ↓
Authentication API
    ↓
JWT Access Token
    ↓
Role Verification
    ↓
┌──────────┬──────────┬──────────┐
│ Patient  │  Doctor  │ Pharmacy │
└──────────┴──────────┴──────────┘
```

The backend configures Django REST Framework with JWT authentication as the default authentication mechanism.

### Role-Based Permissions

```text
PATIENT
 ├── Patient APIs
 └── Appointment / Record / Order access

DOCTOR
 ├── Doctor APIs
 ├── Appointment management
 ├── Medical records
 └── Prescriptions

PHARMACY
 ├── Medicine inventory
 └── Medicine order management
```

---

# 🔒 Security

CareBridge implements role-based authorization and resource ownership checks.

For example, pharmacy medicine deletion is scoped to the authenticated pharmacy.

```text
Authenticated Pharmacy
        ↓
Request Medicine ID
        ↓
Check Medicine
        ↓
Does medicine belong to this pharmacy?
        │
      ┌─┴─┐
     YES  NO
      │    │
      ▼    ▼
   Delete  404
```

This prevents one pharmacy from deleting another pharmacy's medicines.

Other security measures include:

* JWT authentication
* Role-based permissions
* Protected frontend routes
* Pharmacy ownership validation
* Environment-based secrets
* CORS configuration
* Password hashing through Django authentication

---

# 📡 API Modules

The backend is organized around the major healthcare workflows.

| Module          | Functionality                                    |
| :-------------- | :----------------------------------------------- |
| Authentication  | Login, registration and current-user information |
| Patients        | Patient profile and patient-specific operations  |
| Doctors         | Doctor listing, details and dashboard            |
| Appointments    | Create, view, update and complete appointments   |
| Medical Records | Create and retrieve medical records              |
| Prescriptions   | Create and retrieve prescriptions                |
| Medicines       | Pharmacy medicine inventory                      |
| Medicine Orders | Patient orders and pharmacy fulfilment           |
| Dashboards      | Patient, doctor and pharmacy dashboards          |
| AI Service      | AI-assisted symptom checking                     |

---

# 🖼️ Results Gallery

The application provides dedicated interfaces for all three roles.

## 🏠 Landing Page

The CareBridge landing page introduces the connected healthcare workflow and provides access to the different portals.

<p align="center">

<img src="carebridge-phase1/src/assets/hero.png" width="850" alt="CareBridge"/>

</p>

---

## 👤 Patient Portal

### Patient Dashboard

Patients can view their healthcare activity from a dedicated dashboard.

### Doctors & Appointments

Patients can:

* Browse doctors
* View doctor details
* Select appointment slots
* Submit appointment requests
* Track appointment status

### Medical Records

Patients can view records created by doctors after completed consultations.

### Prescriptions

Patients can view prescribed medicines along with dosage, frequency and duration.

### Medicine Orders

Patients can browse available medicines and place orders through pharmacy inventory.

---

## 👨‍⚕️ Doctor Portal

### Doctor Dashboard

Doctors receive a dedicated workspace for managing their healthcare workflow.

### Appointments

Doctors can:

```text
Pending
   ↓
Accepted
   ↓
Completed
```

They can also reject appointments where appropriate.

### Patients

Doctors can view patients associated with their appointments.

### Medical Records

Doctors can create medical records linked to completed appointments.

### Prescriptions

Doctors can select medicines and specify:

* Dosage
* Frequency
* Duration

---

## 🏪 Pharmacy Portal

### Pharmacy Dashboard

Pharmacies can monitor their medicine inventory and patient orders.

### Medicine Management

Pharmacies can:

* Add medicines
* Set prices
* Manage stock
* Control availability
* Delete their own medicines

### Orders

Pharmacies can review incoming patient medicine orders and update their status.

```text
Patient Places Order
        ↓
       PENDING
        ↓
Pharmacy Reviews
        ↓
     CONFIRMED
```

---

# 🧪 End-to-End Test Workflow

One complete CareBridge journey can be tested as:

```text
Patient
  ↓
Books Appointment
  ↓
Doctor Accepts
  ↓
Doctor Completes Appointment
  ↓
Medical Record Created
  ↓
Prescription Created
  ↓
Patient Views Prescription
  ↓
Patient Orders Medicine
  ↓
Pharmacy Receives Order
  ↓
Pharmacy Confirms Order
```

This workflow allows the application to be tested across all three user roles instead of testing each module independently.

---

# ⚙️ Local Setup

## Prerequisites

Make sure you have:

* Python 3.14+
* Node.js
* npm
* PostgreSQL
* Git

---

## 1. Clone Repository

```bash
git clone https://github.com/jk-neha/CareBridge-AI-Assisted-Healthcare-Platform.git

cd CareBridge-AI-Assisted-Healthcare-Platform
```

---

# 🐍 Backend Setup

## 2. Create Virtual Environment

```bash
python -m venv venv
```

### Windows

```powershell
venv\Scripts\activate
```

---

## 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create:

```text
carebridge/.env
```

Example:

```env
SECRET_KEY=your_secret_key
DEBUG=True

DATABASE_URL=postgresql://username:password@localhost:5432/carebridge_db

ALLOWED_HOSTS=127.0.0.1,localhost

CORS_ALLOWED_ORIGINS=http://localhost:5173

CSRF_TRUSTED_ORIGINS=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key
```

**Do not commit `.env` to GitHub.**

---

## 5. Run Migrations

```bash
python manage.py migrate
```

---

## 6. Start Django Server

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

# ⚛️ Frontend Setup

Open another terminal.

```bash
cd carebridge-phase1
```

Install dependencies:

```bash
npm install
```

---

## Create Frontend Environment File

Create:

```text
carebridge-phase1/.env
```

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## Start Frontend

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# ☁️ Deployment

The production frontend is deployed on Vercel.

### Current Live Application

🚀 **https://care-bridge-ai-assisted-healthcare.vercel.app/**

### Deployment Architecture

```text
                   GitHub
                     │
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   React Frontend          Django Backend
      Vercel               Django Host
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
                PostgreSQL
```

The frontend is deployed through Vercel, while the Django backend is designed to run on a Django-compatible hosting environment.

Production environment variables should be configured through the hosting platform rather than committed to the repository.

---

# 🔮 Future Enhancements

Potential future improvements include:

* 📱 Mobile application
* 🔔 Appointment and order notifications
* 📧 Email notifications
* 💳 Online payment integration
* 📅 Calendar integration
* 🧾 Downloadable medical records and prescriptions
* 📊 Advanced healthcare analytics
* 💬 Doctor-patient communication
* 🏥 Hospital integration
* 🔎 Improved doctor discovery and filtering

---

# ⚠️ Disclaimer

CareBridge is a **software project created for learning, development and demonstration purposes**.

The AI-assisted symptom checker is not intended to replace professional medical diagnosis or treatment.

Users should consult qualified healthcare professionals for medical decisions.

Any patient, doctor, pharmacy, prescription and medical information used in the demonstration environment is **sample/test data** and should not be treated as real medical information.

---

# 👩‍💻 Author

<div align="center">

### Neha Vardhini J K

**Backend Developer | Python · C# · .NET · FastAPI · REST APIs · SQL**

[GitHub](https://github.com/jk-neha) · [LinkedIn](https://www.linkedin.com/in/nehavardhinijk/)

**Personal Full-Stack Project — CareBridge**

</div>

---

<div align="center">

⭐ **If you found CareBridge interesting, consider starring the repository!**

🚀 **[Try CareBridge Live](https://care-bridge-ai-assisted-healthcare.vercel.app/)**

<br/>

*Built with ❤️ to explore connected healthcare workflows.*

</div>

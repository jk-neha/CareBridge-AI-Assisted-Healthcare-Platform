"""
URL configuration for carebridge project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from account.views import PatientRegistrationView,DoctorRegistrationView,PharmacyRegistrationView,MeView,PatientOnlyView,DoctorDashboardView,PharmacyOnlyView,DoctorListView,DoctorDetailView,AppointmentCreateView,MyAppointmentsView,DoctorAppointmentsView,AppointmentStatusView,PharmacyMedicineCreateView,MedicineListView,MedicineOrderCreateView,PharmacyOrdersView,PharmacyOrderListView,PharmacyOrderStatusUpdateView,MyMedicineOrdersView,MedicalRecordCreateView,PatientMedicalRecordsView,PatientDashboardView,PharmacyDashboardView,AppointmentCancelView,AppointmentCompleteView,MyMedicalHistoryView,MyPrescriptionsView,PrescriptionCreateView,MyPrescriptionsView,AdminPendingDoctorsView,AdminDoctorVerifyView,AdminPendingPharmaciesView,AdminPharmacyVerifyView,VerifyDoctorView,PendingPharmacyView,VerifyPharmacyView,AdminDashboardView,SymptomCheckerView,DoctorMedicalRecordsView,DoctorPatientsView,PharmacyMedicineDeleteView

urlpatterns = [
    path("admin/", admin.site.urls),

    ##REGISTERATION
    
    #1. PATIENT REG
    #POST 
    path(
        "api/account/patients/register/",
        PatientRegistrationView.as_view(),
        name="patient-register"
    ),

    #2. DOCTOR REG
    #POST
    path(
        "api/account/doctors/register/",
        DoctorRegistrationView.as_view(),
        name="doctor-register"
    ),

    #3. PHARMACY REG
    #POST
    path(
        "api/account/pharmacies/register/",
        PharmacyRegistrationView.as_view(),
        name="pharmacy-register"
    ),

    #4. lOGIN->PATIENT/DOCTOR/PHARMACY
    #POST
    path(
        "api/account/login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),
    
    #5.GET AUTHENTICATED LOGGED INFO
    #GET
        path("api/account/me/",
             MeView.as_view(),name="me"),
       
     #6.LIST OF VERFIED DOCTOORS
    #GET
        path(
        "api/account/doctors/",
        DoctorListView.as_view(),
        name="doctor-list"
    ),
    
    #7. DOCTOR INFORMATION BASED ON ID
    #GET-
        path(
        "api/account/doctors/<int:doctor_id>/",
        DoctorDetailView.as_view(),
        name="doctor-detail"
    ),

    #8. [LOGIN AS ADMIN] GET DOCTORS INFORAMTION WHO AR EYET TO BE VERIFIED BY ADMIN
    #GET 
    path(
    "api/account/admin/doctors/pending/",
    AdminPendingDoctorsView.as_view(),
    name="admin-pending-doctors"
    ),

    #9. LOGIN AS ADMIN AND VEFIY THE DOCTOR BASED ON ID
    #PATCH 
    path(
    "api/account/admin/doctors/<int:doctor_id>/verify/",
    AdminDoctorVerifyView.as_view(),
    name="admin-doctor-verify"
),
    #10. LOGIN IN AS PATINET AND BOOKS THE APPOINTMENT
    #POST
        path(
        "api/account/appointments/",
        AppointmentCreateView.as_view(),
        name="appointment-create"
    ),
    
    #11. LOGIN AS PATINET AND VIEW THE BOOKED APPOINTMENT 
    #GET
        path(
        "api/account/my-appointments/",
        MyAppointmentsView.as_view(),
        name="my-appointments"
    ),
        
    #12. LOGIN AS DOCTOR AND VIEWS THE APPOINTMENT BOOKED    
    #GET
        path(
        "api/account/doctor/appointments/",
        DoctorAppointmentsView.as_view(),
        name="doctor-appointments"
    ),
     
    #13. LOGIN AS DOCTOR - UPDATE THE STATUS OF THE APPOINTMENT BASED ON ID
    #PATCH   
    path(
        "api/account/appointments/<int:appointment_id>/status/",
        AppointmentStatusView.as_view(),
        name="appointment-status"
    ),
       
    #14. LOGIN AS PATIENT PATIENT REJECTS/ CANCELS THE APPOINTMENT
    #PATCH
    path(
        "api/account/appointments/<int:appointment_id>/cancel/",
        AppointmentCancelView.as_view(),
        name="appointment-cancel"
    ),
    
    #LOGIN AS A DOCTOR AND UPATE THE STATUS TO COMPLETE
    #PATCH
        path(
        "api/account/appointments/<int:appointment_id>/complete/",
        AppointmentCompleteView.as_view(),
        name="appointment-complete"
    ),
       
     #14. LOGIN AS DOCTOR AND VIEW THEIR PATIENTS
#GET
path(
    "api/account/doctor/patients/",
    DoctorPatientsView.as_view(),
    name="doctor-patients"
),
    path(
        "api/account/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
    
    
    
    path(
    "api/account/patient-only/",
    PatientOnlyView.as_view(),
    name="patient-only"),
    
    path(
    "api/account/doctor/dashboard/",
    DoctorDashboardView.as_view(),
    name="doctor-dashboard"),
    path(
    "api/account/doctor/appointments/",
    DoctorAppointmentsView.as_view(),
    name="doctor-appointments"
),
    path(
    "api/account/pharmacy-only/",
    PharmacyOnlyView.as_view(),
    name="pharmacy-only"
),
    
    
    
    
     
    
    
    path(
    "api/account/pharmacy/medicines/",
    PharmacyMedicineCreateView.as_view(),
    name="pharmacy-medicine-create"
),
    path(
    "api/account/pharmacy/medicines/<int:medicine_id>/",
    PharmacyMedicineDeleteView.as_view(),
    name="pharmacy-medicine-delete"
),
    
    path(
    "api/account/medicines/",
    MedicineListView.as_view(),
    name="medicine-list"
),
    #LOGIN AS PATIENT
    path(
    "api/account/medicine-orders/",
    MedicineOrderCreateView.as_view(),
    name="medicine-order-create"
),
    
    path(
    "api/account/pharmacy/orders/",
    PharmacyOrdersView.as_view(),
    name="pharmacy-orders"
),
    
    
    path(
    "api/account/pharmacy/orders/<int:order_id>/status/",
    PharmacyOrderStatusUpdateView.as_view(),
    name="pharmacy-order-status"
),
    
    path(
    "api/account/my-medicine-orders/",
    MyMedicineOrdersView.as_view(),
    name="my-medicine-orders"
),
    ##DCOTOR CREATES MEDIAL-REC
    path(
    "api/account/medical-records/create/",
    MedicalRecordCreateView.as_view(),
    name="medical-record-create"
),
    ##PATIENT VIEWS THIE MEDICAL REC
    path(
    "api/account/medical-records/",
    PatientMedicalRecordsView.as_view(),
    name="patient-medical-records"
),
    
    ##LOGIN AS DOCTOR AND SEE THIER MEDICAL RECORDS
    path(
    "api/account/doctor/medical-records/",
    DoctorMedicalRecordsView.as_view(),
    name="doctor-medical-records"
),
    path(
    "api/account/patient/dashboard/",
    PatientDashboardView.as_view(),
    name="patient-dashboard"
),
    
    path(
    "api/account/pharmacy/dashboard/",
    PharmacyDashboardView.as_view(),
    name="pharmacy-dashboard"
),
    
    
    
    path(
    "api/account/my-medical-history/",
    MyMedicalHistoryView.as_view(),
    name="my-medical-history"
),
    
    path(
    "api/account/my-prescriptions/",
    MyPrescriptionsView.as_view(),
    name="my-prescriptions"
),
    
    path(
    "api/account/medical-records/<int:record_id>/prescriptions/",
    PrescriptionCreateView.as_view(),
    name="prescription-item-create"
),
    
    
   

path(
    "api/account/admin/pharmacies/pending/",
    AdminPendingPharmaciesView.as_view(),
    name="admin-pending-pharmacies"
),

path(
    "api/account/admin/pharmacies/<int:pharmacy_id>/verify/",
    AdminPharmacyVerifyView.as_view(),
    name="admin-pharmacy-verify"
),

path(
    "api/account/admin/doctors/<int:doctor_id>/verify/",
    VerifyDoctorView.as_view(),
    name="verify-doctor"
),

path(
    "api/account/admin/pharmacies/pending/",
    PendingPharmacyView.as_view(),
    name="pending-pharmacies"
),

path(
    "api/account/admin/pharmacies/<int:pharmacy_id>/verify/",
    VerifyPharmacyView.as_view(),
    name="verify-pharmacy"
),

path(
    "api/account/admin/dashboard/",
    AdminDashboardView.as_view(),
    name="admin-dashboard"
),

path(
    "api/account/symptom-checker/",
    SymptomCheckerView.as_view(),
    name="symptom-checker"
),
    
]

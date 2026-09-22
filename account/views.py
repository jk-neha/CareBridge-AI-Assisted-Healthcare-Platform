from rest_framework import status

from rest_framework.response import Response

from rest_framework.views import APIView

from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser

from .serializers import PatientRegistrationSerializer,DoctorRegistrationSerializer,PharmacyRegistrationSerializer,DoctorListSerializer,AppointmentSerializer,MyAppointmentSerializer,DoctorAppointmentSerializer,AppointmentStatusSerializer,MedicineSerializer,MedicineListSerializer,MedicineOrderSerializer,PharmacyOrderSerializer,MyMedicineOrderSerializer,MedicalRecordSerializer,PatientMedicalHistorySerializer,PatientPrescriptionSerializer,PrescriptionItemSerializer,PatientPrescriptionSerializer,MedicalRecordCreateSerializer,SymptomCheckerSerializer,DoctorMedicalRecordSerializer

from .models import User,DoctorProfile,Appointment,Medicine,MedicineOrder,MedicalRecord,PrescriptionItem,DoctorProfile, PharmacyProfile

from rest_framework.permissions import IsAuthenticated

from django.db import transaction

from .permissions import IsPatient,IsDoctor,IsPharmacy,IsVerifiedDoctor,IsAdminUser

from django.db.models import Count

from django.utils import timezone

from datetime import datetime

from rest_framework.response import Response

from rest_framework import status

from .ai_service import analyze_symptoms

#---------------------------------------------------------------      
##REGISTERATION

##PATIENT REGISTRATION
class PatientRegistrationView(APIView):
    permission_classes=[AllowAny]

    def post(self, request):

        serializer = PatientRegistrationSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Patient registered successfully.",
                    "user_id": user.id,
                    "username": user.username
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
        
##DOCTOR REGISTRATION
class DoctorRegistrationView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):

        serializer = DoctorRegistrationSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Doctor registered successfully.",
                    "user_id": user.id,
                    "username": user.username
                },
                status=status.HTTP_201_CREATED
            )
        print(serializer.errors)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
     
     
##PHARMACY REGISTRATION   
class PharmacyRegistrationView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):

        serializer = PharmacyRegistrationSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Pharmacy registered successfully.",
                    "user_id": user.id,
                    "username": user.username
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        ) 
#-------------------------  
##AUTHENTICATION/PROFILE (GET INFORMATION)

#Information of Authenticated Profile
# class MeView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request):

#         user = request.user

#         return Response(
#             {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#                 "phone_number": user.phone_number,
#                 "role": user.role,
#             },
#             status=status.HTTP_200_OK
#         )
class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "role": user.role,
        }

        # Attach role-specific profile fields so the frontend can
        # pre-fill an edit form from this single endpoint.
        if user.role == User.Role.PATIENT and hasattr(user, "patient_profile"):
            profile = user.patient_profile
            data["profile"] = {
                "date_of_birth": profile.date_of_birth,
                "gender": profile.gender,
                "medical_history": profile.medical_history,
                "address": profile.address,
            }

        elif user.role == User.Role.DOCTOR and hasattr(user, "doctor_profile"):
            profile = user.doctor_profile
            data["profile"] = {
                "specialization": profile.specialization,
                "qualification": profile.qualification,
                "license_number": profile.license_number,
                "experience_years": profile.experience_years,
                "consultation_fee": profile.consultation_fee,
                "is_verified": profile.is_verified,
            }

        elif user.role == User.Role.PHARMACY and hasattr(user, "pharmacy_profile"):
            profile = user.pharmacy_profile
            data["profile"] = {
                "pharmacy_name": profile.pharmacy_name,
                "license_number": profile.license_number,
                "address": profile.address,
                "is_verified": profile.is_verified,
            }

        return Response(data, status=status.HTTP_200_OK)

    def patch(self, request):

        user = request.user

        # email, username, password, and role are intentionally never
        # read from request.data anywhere below — there is no code
        # path in this method that can change them.

        if "phone_number" in request.data:
            user.phone_number = request.data["phone_number"]
            user.save(update_fields=["phone_number"])

        if user.role == User.Role.PATIENT and hasattr(user, "patient_profile"):
            profile = user.patient_profile
            editable_fields = [
                "date_of_birth", "gender", "medical_history", "address"
            ]
            for field in editable_fields:
                if field in request.data:
                    setattr(profile, field, request.data[field])
            profile.save()

        elif user.role == User.Role.DOCTOR and hasattr(user, "doctor_profile"):
            profile = user.doctor_profile
            # license_number is deliberately excluded — treated like
            # an identity field, same as email.
            editable_fields = [
                "specialization", "qualification",
                "experience_years", "consultation_fee"
            ]
            for field in editable_fields:
                if field in request.data:
                    setattr(profile, field, request.data[field])
            profile.save()

        elif user.role == User.Role.PHARMACY and hasattr(user, "pharmacy_profile"):
            profile = user.pharmacy_profile
            # license_number excluded, same reasoning as above.
            editable_fields = ["pharmacy_name", "address"]
            for field in editable_fields:
                if field in request.data:
                    setattr(profile, field, request.data[field])
            profile.save()

        return self.get(request)
#---------------------------------------------------
##DOCTOR/PATIENT DISCOVERY
        
##PATINET<->DOCTOR 
class DoctorListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        doctors = DoctorProfile.objects.filter(
            is_verified=True
        )

        serializer = DoctorListSerializer(
            doctors,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
##SPECIFIC DOC INFOR BY ID
class DoctorDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, doctor_id):

        try:
            doctor = DoctorProfile.objects.get(
                id=doctor_id,
                is_verified=True
            )
        except DoctorProfile.DoesNotExist:
            return Response(
                {
                    "message": "Doctor not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = DoctorListSerializer(doctor)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
      
#---------------
##APPOINTMENTS

#Patient Create Appointment
class AppointmentCreateView(APIView):

    permission_classes = [IsAuthenticated, IsPatient]

    def post(self, request):

        serializer = AppointmentSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        doctor = serializer.validated_data["doctor"]
        appointment_date = serializer.validated_data["appointment_date"]
        appointment_time = serializer.validated_data["appointment_time"]

        # 1. Check doctor verification
        if not doctor.is_verified:
            return Response(
                {
                    "message": "Doctor is not verified."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # 2. Check whether appointment is in the past
        appointment_datetime = datetime.combine(
            appointment_date,
            appointment_time
        )

        current_datetime = timezone.localtime().replace(
            tzinfo=None
        )

        if appointment_datetime <= current_datetime:
            return Response(
                {
                    "message": "Appointment date and time must be in the future."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # 3. Check duplicate appointment for same patient,
        #    same doctor, same date and same time
        existing_appointment = Appointment.objects.filter(
            patient=request.user,
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=["PENDING", "CONFIRMED"]
        ).exists()

        if existing_appointment:
            return Response(
                {
                    "message": "You already have an appointment with this doctor at this time."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # 4. Check whether doctor already has an appointment
        doctor_busy = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            status__in=["PENDING", "CONFIRMED"]
        ).exists()

        if doctor_busy:
            return Response(
                {
                    "message": "Doctor is already booked for this time."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # 5. Create appointment
        appointment = serializer.save(
            patient=request.user,
            status="PENDING"
        )

        return Response(
            {
                "message": "Appointment booked successfully.",
                "appointment_id": appointment.id,
                "doctor": doctor.user.username,
                "appointment_date": appointment.appointment_date,
                "appointment_time": appointment.appointment_time,
                "status": appointment.status
            },
            status=status.HTTP_201_CREATED
        )
        
             
#Patient View  APPOINTMENTS
class MyAppointmentsView(APIView):

    permission_classes = [IsAuthenticated, IsPatient]

    def get(self, request):

        appointments = Appointment.objects.filter(
            patient=request.user
        ).order_by("-appointment_date", "-appointment_time")

        serializer = MyAppointmentSerializer(
            appointments,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
       
        
## DOCTOR VIEW APPOINTMENTS
class DoctorAppointmentsView(APIView):

    permission_classes = [IsAuthenticated, IsDoctor, IsVerifiedDoctor]

    def get(self, request):

        appointments = Appointment.objects.filter(
            doctor__user=request.user
        ).order_by(
            "appointment_date",
            "appointment_time"
        )

        serializer = DoctorAppointmentSerializer(
            appointments,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
##DOCTOR REJECTS/ACCEPTS APPOINTMENT
class AppointmentStatusView(APIView):

    permission_classes = [IsAuthenticated, IsDoctor, IsVerifiedDoctor]

    def patch(self, request, appointment_id):

        serializer = AppointmentStatusSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        new_status = serializer.validated_data["status"]

        try:
            appointment = Appointment.objects.get(
                id=appointment_id
            )
        except Appointment.DoesNotExist:
            return Response(
                {
                    "message": "Appointment not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Check whether this appointment belongs to this doctor
        if appointment.doctor.user != request.user:
            return Response(
                {
                    "message": "You can only update your own appointments."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Only PENDING appointments can be updated
        if appointment.status != "PENDING":
            return Response(
                {
                    "message": "Only pending appointments can be updated."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        appointment.status = new_status
        appointment.save()

        return Response(
            {
                "message": f"Appointment {new_status.lower()} successfully.",
                "appointment_id": appointment.id,
                "status": appointment.status
            },
            status=status.HTTP_200_OK
        )
        
#PATIENT CANCLES THE APPOINMENT
class AppointmentCancelView(APIView):

    permission_classes = [IsAuthenticated, IsPatient]

    def patch(self, request, appointment_id):

        try:
            appointment = Appointment.objects.get(
                id=appointment_id,
                patient=request.user
            )

        except Appointment.DoesNotExist:

            return Response(
                {
                    "message": "Appointment not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if appointment.status != "PENDING":

            return Response(
                {
                    "message": "Only pending appointments can be cancelled.",
                    "status": appointment.status
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        appointment.status = "CANCELLED"
        appointment.save(update_fields=["status"])

        return Response(
            {
                "message": "Appointment cancelled successfully.",
                "appointment_id": appointment.id,
                "status": appointment.status
            },
            status=status.HTTP_200_OK
        )
        
#DCOTOR MARKS THE STATUS AS COMPLETE
class AppointmentCompleteView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def patch(self, request, appointment_id):

        try:
            appointment = Appointment.objects.get(
                id=appointment_id
            )
        except Appointment.DoesNotExist:

            return Response(
                {
                    "message": "Appointment not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Make sure this appointment belongs
        # to the logged-in doctor
        if appointment.doctor.user != request.user:

            return Response(
                {
                    "message": "You can only complete your own appointments."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Appointment must be confirmed first
        if appointment.status != "CONFIRMED":

            return Response(
                {
                    "message": "Only confirmed appointments can be completed."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Mark appointment as completed
        appointment.status = "COMPLETED"
        appointment.save(update_fields=["status"])

        return Response(
            {
                "message": "Appointment completed successfully.",
                "appointment_id": appointment.id,
                "status": appointment.status
            },
            status=status.HTTP_200_OK
        )

#------------------------------
##MEDICINES


# class PharmacyMedicineCreateView(APIView):

#     permission_classes = [IsAuthenticated, IsPharmacy]

#     def post(self, request):

#         serializer = MedicineSerializer(
#             data=request.data
#         )

#         if serializer.is_valid():

#             pharmacy = request.user.pharmacy_profile

#             medicine = serializer.save(
#                 pharmacy=pharmacy
#             )

#             return Response(
#                 {
#                     "message": "Medicine added successfully.",
#                     "medicine_id": medicine.id,
#                     "name": medicine.name,
#                     "price": medicine.price,
#                     "stock": medicine.stock,
#                     "is_available": medicine.is_available
#                 },
#                 status=status.HTTP_201_CREATED
#             )

#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#         )
        
class PharmacyMedicineCreateView(APIView):

    permission_classes = [IsAuthenticated, IsPharmacy]

    def post(self, request):

        serializer = MedicineSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        pharmacy = request.user.pharmacy_profile

        name = serializer.validated_data["name"]
        new_price = serializer.validated_data["price"]
        added_stock = serializer.validated_data.get("stock", 0)
        description = serializer.validated_data.get("description", "")

        # If this pharmacy already lists a medicine with this exact
        # name, top up its stock and update the price instead of
        # creating a duplicate listing.
        existing = Medicine.objects.filter(
            pharmacy=pharmacy,
            name__iexact=name
        ).first()

        if existing:
            existing.stock += added_stock
            existing.price = new_price

            if description:
                existing.description = description

            if existing.stock > 0:
                existing.is_available = True

            existing.save(
                update_fields=["stock", "price", "description", "is_available"]
            )

            return Response(
                {
                    "message": "Existing medicine updated — stock and price refreshed.",
                    "medicine_id": existing.id,
                    "name": existing.name,
                    "price": existing.price,
                    "stock": existing.stock,
                    "is_available": existing.is_available,
                    "updated": True
                },
                status=status.HTTP_200_OK
            )

        medicine = serializer.save(pharmacy=pharmacy)

        return Response(
            {
                "message": "Medicine added successfully.",
                "medicine_id": medicine.id,
                "name": medicine.name,
                "price": medicine.price,
                "stock": medicine.stock,
                "is_available": medicine.is_available,
                "updated": False
            },
            status=status.HTTP_201_CREATED
        )

class PharmacyMedicineDeleteView(APIView):

    permission_classes = [IsAuthenticated, IsPharmacy]

    def delete(self, request, medicine_id):

        pharmacy = request.user.pharmacy_profile

        try:
            medicine = Medicine.objects.get(
                id=medicine_id,
                pharmacy=pharmacy
            )
        except Medicine.DoesNotExist:
            return Response(
                {
                    "message": "Medicine not found or you don't have permission to delete it."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        name = medicine.name
        medicine.delete()

        return Response(
            {
                "message": f"{name} deleted successfully."
            },
            status=status.HTTP_200_OK
        )
        
## MEDICINE LIST
class MedicineListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        medicines = Medicine.objects.filter(
            is_available=True
        )

        serializer = MedicineListSerializer(
            medicines,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK)


#---------------------
##MEDICINES ORDERS

class MedicineOrderCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        # Only patients can place medicine orders
        if request.user.role != User.Role.PATIENT:
            return Response(
                {"detail": "Only patients can place medicine orders."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = MedicineOrderSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        medicine = serializer.validated_data["medicine"]
        quantity = serializer.validated_data["quantity"]

        # Check medicine availability
        if not medicine.is_available:
            return Response(
                {"detail": "This medicine is currently unavailable."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check stock
        if quantity > medicine.stock:
            return Response(
                {
                    "detail": "Insufficient stock.",
                    "available_stock": medicine.stock
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Calculate total price
        total_price = medicine.price * quantity

        order = MedicineOrder.objects.create(
            patient=request.user,
            medicine=medicine,
            quantity=quantity,
            total_price=total_price,
            status=MedicineOrder.Status.PENDING
        )

        return Response(
            MedicineOrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )
        
   
class MyMedicineOrdersView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.role != User.Role.PATIENT:
            return Response(
                {"detail": "Only patients can view their medicine orders."},
                status=status.HTTP_403_FORBIDDEN
            )

        orders = MedicineOrder.objects.filter(
            patient=request.user
        ).select_related(
            "medicine",
            "medicine__pharmacy"
        ).order_by("-created_at")

        serializer = MyMedicineOrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
 
 
class PharmacyOrderListView(APIView):

    permission_classes = [IsAuthenticated, IsPharmacy]

    def get(self, request):

        pharmacy = request.user.pharmacy_profile

        orders = MedicineOrder.objects.filter(
            medicine__pharmacy=pharmacy
        ).select_related(
            "patient",
            "medicine"
        )

        serializer = PharmacyOrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
         
  
class PharmacyOrderStatusUpdateView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):

        # Only pharmacies can update orders
        if request.user.role != User.Role.PHARMACY:
            return Response(
                {"detail": "Only pharmacies can update orders."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            order = MedicineOrder.objects.select_related(
                "medicine",
                "medicine__pharmacy"
            ).get(id=order_id)

        except MedicineOrder.DoesNotExist:
            return Response(
                {"detail": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Make sure this pharmacy owns the medicine
        if order.medicine.pharmacy.user != request.user:
            return Response(
                {"detail": "You do not have permission to update this order."},
                status=status.HTTP_403_FORBIDDEN
            )

        # Only PENDING orders can be changed
        if order.status != MedicineOrder.Status.PENDING:
            return Response(
                {"message": "Only pending orders can be updated."},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_status = request.data.get("status")

        if new_status not in [
            MedicineOrder.Status.CONFIRMED,
            MedicineOrder.Status.REJECTED
        ]:
            return Response(
                {
                    "detail": "Status must be CONFIRMED or REJECTED."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # CONFIRM ORDER
        if new_status == MedicineOrder.Status.CONFIRMED:

            if not order.medicine.is_available:
                return Response(
                    {"detail": "Medicine is currently unavailable."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if order.quantity > order.medicine.stock:
                return Response(
                    {
                        "detail": "Insufficient stock.",
                        "available_stock": order.medicine.stock
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Reduce stock
            order.medicine.stock -= order.quantity

            # If stock becomes zero, medicine is unavailable
            if order.medicine.stock == 0:
                order.medicine.is_available = False

            order.medicine.save(
                update_fields=["stock", "is_available"]
            )

            order.status = MedicineOrder.Status.CONFIRMED
            order.save(update_fields=["status"])

        # REJECT ORDER
        elif new_status == MedicineOrder.Status.REJECTED:

            order.status = MedicineOrder.Status.REJECTED
            order.save(update_fields=["status"])

        return Response(
            {
                "message": f"Order {new_status.lower()} successfully.",
                "order": PharmacyOrderSerializer(order).data
            },
            status=status.HTTP_200_OK
        )
    
 
 #---------------
 #MEDICAL RECORDS
 
class MedicalRecordCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def post(self, request):

        serializer = MedicalRecordSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        appointment = serializer.validated_data["appointment"]

        # Doctor must own the appointment
        if appointment.doctor.user != request.user:
            return Response(
                {
                    "detail":
                    "You can only create medical records for your own appointments."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        # Appointment must be completed
        if appointment.status != "COMPLETED":
            return Response(
                {
                    "detail":
                    "Medical record can only be created for a completed appointment."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # One medical record per appointment
        if MedicalRecord.objects.filter(
            appointment=appointment
        ).exists():

            return Response(
                {
                    "detail":
                    "Medical record already exists for this appointment."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        medical_record = serializer.save()

        return Response(
            {
                "message": "Medical record created successfully.",
                "record_id": medical_record.id,
                "appointment_id": appointment.id,
                "patient": appointment.patient.username,
                "diagnosis": medical_record.diagnosis
            },
            status=status.HTTP_201_CREATED
        )
     
       
class PatientMedicalRecordsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPatient
    ]

    def get(self, request):

        records = MedicalRecord.objects.filter(
            appointment__patient=request.user
        ).select_related(
            "appointment",
            "appointment__doctor",
            "appointment__doctor__user"
        ).order_by("-created_at")

        serializer = MedicalRecordSerializer(
            records,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
    
class DoctorMedicalRecordsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def get(self, request):

        records = MedicalRecord.objects.filter(
            appointment__doctor__user=request.user
        ).select_related(
            "appointment",
            "appointment__patient",
            "appointment__doctor",
            "appointment__doctor__user"
        ).prefetch_related(
            "prescription_items__medicine",
            "prescription_items__medicine__pharmacy"
        ).order_by("-created_at")

        # serializer = MedicalRecordSerializer(
        #     records,
        #     many=True
        # )
        
        serializer = DoctorMedicalRecordSerializer(
    records,
    many=True
)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
        
              
class MyMedicalHistoryView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPatient
    ]

    def get(self, request):

        records = MedicalRecord.objects.filter(
            appointment__patient=request.user
        ).select_related(
            "appointment",
            "appointment__doctor",
            "appointment__doctor__user"
        ).order_by(
            "-created_at"
        )

        serializer = PatientMedicalHistorySerializer(
            records,
            many=True
        )

        return Response(
            {
                "patient": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email
                },
                "total_records": records.count(),
                "records": serializer.data
            },
            status=status.HTTP_200_OK
        )
        
#--------------
##PRESCRIPTIONS

class PrescriptionCreateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def post(self, request, record_id):

        try:
            medical_record = MedicalRecord.objects.select_related(
                "appointment__doctor__user"
            ).get(
                id=record_id
            )

        except MedicalRecord.DoesNotExist:

            return Response(
                {
                    "detail": "Medical record not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Doctor must own the medical record
        if medical_record.appointment.doctor.user != request.user:

            return Response(
                {
                    "detail":
                    "You do not have permission to modify this medical record."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = PrescriptionItemSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        prescription_item = serializer.save(
            medical_record=medical_record
        )

        return Response(
            PrescriptionItemSerializer(
                prescription_item
            ).data,
            status=status.HTTP_201_CREATED
        )  
        
class MyPrescriptionsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPatient
    ]

    def get(self, request):

        records = MedicalRecord.objects.filter(
            appointment__patient=request.user
        ).select_related(
            "appointment",
            "appointment__doctor",
            "appointment__doctor__user"
        ).order_by(
            "-created_at"
        )

        serializer = PatientPrescriptionSerializer(
            records,
            many=True
        )

        return Response(
            {
                "patient": request.user.username,
                "total_prescriptions": records.count(),
                "prescriptions": serializer.data
            },
            status=status.HTTP_200_OK
        )

#-----------

##DASHBOARDS

class PatientDashboardView(APIView):

    permission_classes = [IsAuthenticated, IsPatient]

    def get(self, request):

        # -----------------------------
        # PATIENT APPOINTMENTS
        # -----------------------------
        appointments = Appointment.objects.filter(
            patient=request.user
        ).order_by("-created_at")

        # -----------------------------
        # MEDICINE ORDERS
        # -----------------------------
        medicine_orders = MedicineOrder.objects.filter(
            patient=request.user
        ).order_by("-created_at")

        # -----------------------------
        # MEDICAL RECORDS
        # -----------------------------
        medical_records = MedicalRecord.objects.filter(
            appointment__patient=request.user
        ).order_by("-created_at")

        # -----------------------------
        # APPOINTMENT COUNTS
        # -----------------------------
        total_appointments = appointments.count()

        pending_appointments = appointments.filter(
            status="PENDING"
        ).count()

        confirmed_appointments = appointments.filter(
            status="CONFIRMED"
        ).count()

        rejected_appointments = appointments.filter(
            status="REJECTED"
        ).count()

        # -----------------------------
        # MEDICINE ORDER COUNTS
        # -----------------------------
        total_medicine_orders = medicine_orders.count()

        pending_medicine_orders = medicine_orders.filter(
            status="PENDING"
        ).count()

        confirmed_medicine_orders = medicine_orders.filter(
            status="CONFIRMED"
        ).count()

        # -----------------------------
        # RESPONSE
        # -----------------------------
        return Response(
            {
                "patient": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email,
                    "phone_number": request.user.phone_number,
                    "role": request.user.role
                },

                "summary": {
                    "total_appointments": total_appointments,
                    "pending_appointments": pending_appointments,
                    "confirmed_appointments": confirmed_appointments,
                    "rejected_appointments": rejected_appointments,

                    "total_medicine_orders": total_medicine_orders,
                    "pending_medicine_orders": pending_medicine_orders,
                    "confirmed_medicine_orders": confirmed_medicine_orders,

                    "total_medical_records": medical_records.count()
                },

                "appointments": [
                    {
                        "id": appointment.id,
                        "doctor_name": appointment.doctor.user.username,
                        "appointment_date": appointment.appointment_date,
                        "appointment_time": appointment.appointment_time,
                        "reason": appointment.reason,
                        "status": appointment.status
                    }
                    for appointment in appointments
                ],

                "medicine_orders": [
                    {
                        "id": order.id,
                        "medicine_name": order.medicine.name,
                        "pharmacy_name": order.medicine.pharmacy.user.username,
                        "quantity": order.quantity,
                        "total_price": order.total_price,
                        "status": order.status
                    }
                    for order in medicine_orders
                ],

                "medical_records": [
                    {
                        "id": record.id,
                        "appointment_id": record.appointment.id,
                        "diagnosis": record.diagnosis,
                        "prescription": record.prescription,
                        "notes": record.notes,
                        "created_at": record.created_at
                    }
                    for record in medical_records
                ]
            },
            status=status.HTTP_200_OK
        )
        
 # ---------------------------------------------------
# DOCTOR'S PATIENTS
# ---------------------------------------------------

# class DoctorPatientsView(APIView):

#     permission_classes = [
#         IsAuthenticated,
#         IsDoctor,
#         IsVerifiedDoctor
#     ]

#     def get(self, request):

#         patients = User.objects.filter(
#             patient_appointments__doctor__user=request.user
#         ).distinct().order_by("username")

#         data = []

#         for patient in patients:

#             appointments = Appointment.objects.filter(
#                 patient=patient,
#                 doctor__user=request.user
#             ).order_by("-appointment_date", "-appointment_time")

#             medical_records = MedicalRecord.objects.filter(
#                 appointment__patient=patient,
#                 appointment__doctor__user=request.user
#             )

#             data.append({
#                 "id": patient.id,
#                 "username": patient.username,
#                 "email": patient.email,
#                 "phone_number": patient.phone_number,
#                 "total_appointments": appointments.count(),
#                 "total_medical_records": medical_records.count(),
#                 "last_appointment": (
#                     appointments.first().appointment_date
#                     if appointments.exists()
#                     else None
#                 )
#             })

#         return Response(
#             data,
#             status=status.HTTP_200_OK
#         )       

class DoctorPatientsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def get(self, request):

        patients = User.objects.filter(
            patient_appointments__doctor__user=request.user
        ).distinct().order_by("username")

        data = []

        for patient in patients:

            appointments = Appointment.objects.filter(
                patient=patient,
                doctor__user=request.user
            ).order_by("-appointment_date", "-appointment_time")

            medical_records = MedicalRecord.objects.filter(
                appointment__patient=patient,
                appointment__doctor__user=request.user
            )

            data.append({
                "id": patient.id,
                "username": patient.username,
                "email": patient.email,
                "phone_number": patient.phone_number,
                "total_appointments": appointments.count(),
                "total_medical_records": medical_records.count(),
                "last_appointment": (
                    appointments.first().appointment_date
                    if appointments.exists()
                    else None
                )
            })

        return Response(
            data,
            status=status.HTTP_200_OK
        )
#DOCTOR'S DASHBOARD
class DoctorDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def get(self, request):

        doctor = request.user.doctor_profile

        appointments = Appointment.objects.filter(
            doctor=doctor
        ).order_by("-created_at")

        medical_records = MedicalRecord.objects.filter(
            appointment__doctor=doctor
        ).order_by("-created_at")

        total_appointments = appointments.count()

        pending_appointments = appointments.filter(
            status="PENDING"
        ).count()

        confirmed_appointments = appointments.filter(
            status="CONFIRMED"
        ).count()

        rejected_appointments = appointments.filter(
            status="REJECTED"
        ).count()

        return Response(
            {
                "doctor": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email,
                    "phone_number": request.user.phone_number,
                    "role": request.user.role,
                    "specialization": doctor.specialization,
                    "qualification": doctor.qualification,
                    "license_number": doctor.license_number,
                    "experience_years": doctor.experience_years,
                    "consultation_fee": doctor.consultation_fee,
                    "is_verified": doctor.is_verified
                },

                "summary": {
                    "total_appointments": total_appointments,
                    "pending_appointments": pending_appointments,
                    "confirmed_appointments": confirmed_appointments,
                    "rejected_appointments": rejected_appointments,
                    "total_medical_records": medical_records.count()
                },

                "appointments": [
                    {
                        "id": appointment.id,
                        "patient_name": appointment.patient.username,
                        "patient_email": appointment.patient.email,
                        "appointment_date": appointment.appointment_date,
                        "appointment_time": appointment.appointment_time,
                        "reason": appointment.reason,
                        "status": appointment.status
                    }
                    for appointment in appointments
                ],

                "medical_records": [
                    {
                        "id": record.id,
                        "appointment_id": record.appointment.id,
                        "patient_name": record.appointment.patient.username,
                        "diagnosis": record.diagnosis,
                        "prescription": record.prescription,
                        "notes": record.notes,
                        "created_at": record.created_at
                    }
                    for record in medical_records
                ]
            },
            status=status.HTTP_200_OK
        )

#PHARMACY DASHBOARD
class PharmacyDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPharmacy
    ]

    def get(self, request):

        # Get pharmacy profile
        pharmacy = request.user.pharmacy_profile

        # Get medicines belonging to this pharmacy
        medicines = Medicine.objects.filter(
            pharmacy=pharmacy
        ).order_by("-created_at")

        # Get orders for medicines belonging to this pharmacy
        orders = MedicineOrder.objects.filter(
            medicine__pharmacy=pharmacy
        ).order_by("-created_at")

        # -----------------------------
        # MEDICINE STATISTICS
        # -----------------------------

        total_medicines = medicines.count()

        available_medicines = medicines.filter(
            is_available=True
        ).count()

        low_stock_medicines = medicines.filter(
            stock__lte=10
        ).count()

        # -----------------------------
        # ORDER STATISTICS
        # -----------------------------

        total_orders = orders.count()

        pending_orders = orders.filter(
            status="PENDING"
        ).count()

        confirmed_orders = orders.filter(
            status="CONFIRMED"
        ).count()

        rejected_orders = orders.filter(
            status="REJECTED"
        ).count()

        return Response(
            {
                "pharmacy": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email,
                    "phone_number": request.user.phone_number,
                    "role": request.user.role,
                    "pharmacy_name": pharmacy.pharmacy_name
                },

                "summary": {
                    "total_medicines": total_medicines,
                    "available_medicines": available_medicines,
                    "low_stock_medicines": low_stock_medicines,

                    "total_orders": total_orders,
                    "pending_orders": pending_orders,
                    "confirmed_orders": confirmed_orders,
                    "rejected_orders": rejected_orders
                },

                "medicines": [
                    {
                        "id": medicine.id,
                        "name": medicine.name,
                        "description": medicine.description,
                        "price": medicine.price,
                        "stock": medicine.stock,
                        "is_available": medicine.is_available
                    }
                    for medicine in medicines
                ],

                "orders": [
                    {
                        "id": order.id,
                        "patient_name": order.patient.username,
                        "patient_email": order.patient.email,
                        "medicine_name": order.medicine.name,
                        "quantity": order.quantity,
                        "total_price": order.total_price,
                        "status": order.status,
                        "created_at": order.created_at
                    }
                    for order in orders
                ]
            },

            status=status.HTTP_200_OK
        )

#ADMIN DASHBOARD
class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):

        # -------------------------
        # USER COUNTS
        # -------------------------

        total_users = User.objects.count()

        total_patients = User.objects.filter(
            role=User.Role.PATIENT
        ).count()

        total_doctors = User.objects.filter(
            role=User.Role.DOCTOR
        ).count()

        total_pharmacies = User.objects.filter(
            role=User.Role.PHARMACY
        ).count()


        # -------------------------
        # DOCTOR VERIFICATION
        # -------------------------

        verified_doctors = DoctorProfile.objects.filter(
            is_verified=True
        ).count()

        pending_doctors = DoctorProfile.objects.filter(
            is_verified=False
        ).count()


        # -------------------------
        # PHARMACY VERIFICATION
        # -------------------------

        verified_pharmacies = PharmacyProfile.objects.filter(
            is_verified=True
        ).count()

        pending_pharmacies = PharmacyProfile.objects.filter(
            is_verified=False
        ).count()


        # -------------------------
        # APPOINTMENTS
        # -------------------------

        total_appointments = Appointment.objects.count()

        pending_appointments = Appointment.objects.filter(
            status="PENDING"
        ).count()

        confirmed_appointments = Appointment.objects.filter(
            status="CONFIRMED"
        ).count()

        completed_appointments = Appointment.objects.filter(
            status="COMPLETED"
        ).count()

        rejected_appointments = Appointment.objects.filter(
            status="REJECTED"
        ).count()

        cancelled_appointments = Appointment.objects.filter(
            status="CANCELLED"
        ).count()


        # -------------------------
        # MEDICINES
        # -------------------------

        total_medicines = Medicine.objects.count()

        available_medicines = Medicine.objects.filter(
            is_available=True
        ).count()


        # -------------------------
        # MEDICINE ORDERS
        # -------------------------

        total_orders = MedicineOrder.objects.count()

        pending_orders = MedicineOrder.objects.filter(
            status="PENDING"
        ).count()

        confirmed_orders = MedicineOrder.objects.filter(
            status="CONFIRMED"
        ).count()

        rejected_orders = MedicineOrder.objects.filter(
            status="REJECTED"
        ).count()


        # -------------------------
        # MEDICAL RECORDS
        # -------------------------

        total_medical_records = MedicalRecord.objects.count()

        total_prescription_items = PrescriptionItem.objects.count()


        # -------------------------
        # RESPONSE
        # -------------------------

        return Response(
            {
                "users": {
                    "total": total_users,
                    "patients": total_patients,
                    "doctors": total_doctors,
                    "pharmacies": total_pharmacies
                },

                "doctor_verification": {
                    "verified": verified_doctors,
                    "pending": pending_doctors
                },

                "pharmacy_verification": {
                    "verified": verified_pharmacies,
                    "pending": pending_pharmacies
                },

                "appointments": {
                    "total": total_appointments,
                    "pending": pending_appointments,
                    "confirmed": confirmed_appointments,
                    "completed": completed_appointments,
                    "rejected": rejected_appointments,
                    "cancelled": cancelled_appointments
                },

                "medicines": {
                    "total": total_medicines,
                    "available": available_medicines
                },

                "medicine_orders": {
                    "total": total_orders,
                    "pending": pending_orders,
                    "confirmed": confirmed_orders,
                    "rejected": rejected_orders
                },

                "medical_records": {
                    "total": total_medical_records,
                    "prescription_items": total_prescription_items
                }
            },
            status=status.HTTP_200_OK
        )
        
       
       
#----------

##ADMINS

#INFORMATION OF DOCTORS -> YET TO BE VERIFIED
class AdminPendingDoctorsView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        doctors = DoctorProfile.objects.filter(
            is_verified=False
        ).select_related("user")

        data = []

        for doctor in doctors:

            data.append({
                "id": doctor.id,
                "username": doctor.user.username,
                "email": doctor.user.email,
                "phone_number": doctor.user.phone_number,
                "specialization": doctor.specialization,
                "qualification": doctor.qualification,
                "license_number": doctor.license_number,
                "experience_years": doctor.experience_years,
                "consultation_fee": doctor.consultation_fee,
                "is_verified": doctor.is_verified
            })

        return Response(
            data,
            status=status.HTTP_200_OK
        )

class AdminDoctorVerifyView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, doctor_id):

        try:
            doctor = DoctorProfile.objects.select_related(
                "user"
            ).get(id=doctor_id)

        except DoctorProfile.DoesNotExist:

            return Response(
                {
                    "message": "Doctor not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if doctor.is_verified:

            return Response(
                {
                    "message": "Doctor is already verified.",
                    "doctor_id": doctor.id,
                    "is_verified": True
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        doctor.is_verified = True
        doctor.save(update_fields=["is_verified"])

        return Response(
            {
                "message": "Doctor verified successfully.",
                "doctor_id": doctor.id,
                "username": doctor.user.username,
                "is_verified": doctor.is_verified
            },
            status=status.HTTP_200_OK
        )
        
class AdminPendingPharmaciesView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        pharmacies = PharmacyProfile.objects.filter(
            is_verified=False
        ).select_related("user")

        data = []

        for pharmacy in pharmacies:

            data.append({
                "id": pharmacy.id,
                "username": pharmacy.user.username,
                "email": pharmacy.user.email,
                "phone_number": pharmacy.user.phone_number,
                "pharmacy_name": pharmacy.pharmacy_name,
                "license_number": pharmacy.license_number,
                "address": pharmacy.address,
                "is_verified": pharmacy.is_verified
            })

        return Response(
            data,
            status=status.HTTP_200_OK
        )
        
class AdminPharmacyVerifyView(APIView):

    permission_classes = [IsAdminUser]

    def patch(self, request, pharmacy_id):

        try:
            pharmacy = PharmacyProfile.objects.select_related(
                "user"
            ).get(id=pharmacy_id)

        except PharmacyProfile.DoesNotExist:

            return Response(
                {
                    "message": "Pharmacy not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if pharmacy.is_verified:

            return Response(
                {
                    "message": "Pharmacy is already verified.",
                    "pharmacy_id": pharmacy.id,
                    "is_verified": True
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        pharmacy.is_verified = True
        pharmacy.save(update_fields=["is_verified"])

        return Response(
            {
                "message": "Pharmacy verified successfully.",
                "pharmacy_id": pharmacy.id,
                "username": pharmacy.user.username,
                "pharmacy_name": pharmacy.pharmacy_name,
                "is_verified": pharmacy.is_verified
            },
            status=status.HTTP_200_OK
        )
        
#---------------------

##PARTICULAR INFORAMTION BASED ON ROLE

#PATIENT INFORMATION only
class PatientOnlyView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPatient
    ]

    def get(self, request):

        return Response(
            {
                "message": "Welcome Patient!",
                "user_id": request.user.id,
                "username": request.user.username,
                "role": request.user.role
            },
            status=status.HTTP_200_OK
        )
        
##DOCTOR INFORMATION only       
# class DoctorDashboardView(APIView):

#     permission_classes = [IsAuthenticated, IsDoctor,IsVerifiedDoctor]

#     def get(self, request):
#         print("DOCTOR DASHBOARD VIEW WITH FULL DATA IS RUNNING")

#         return Response(
#             {
#                 "message": "Welcome Doctor.",
#                 "user_id": request.user.id,
#                 "username": request.user.username,
#                 "role": request.user.role
#             },
#             status=status.HTTP_200_OK
#         )
        
class DoctorDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsDoctor,
        IsVerifiedDoctor
    ]

    def get(self, request):

        doctor = request.user.doctor_profile

        appointments = Appointment.objects.filter(
            doctor=doctor
        ).order_by("-created_at")

        medical_records = MedicalRecord.objects.filter(
            appointment__doctor=doctor
        ).order_by("-created_at")

        total_appointments = appointments.count()

        pending_appointments = appointments.filter(
            status="PENDING"
        ).count()

        confirmed_appointments = appointments.filter(
            status="CONFIRMED"
        ).count()

        rejected_appointments = appointments.filter(
            status="REJECTED"
        ).count()

        return Response(
            {
                "doctor": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email,
                    "phone_number": request.user.phone_number,
                    "role": request.user.role,
                    "specialization": doctor.specialization,
                    "qualification": doctor.qualification,
                    "license_number": doctor.license_number,
                    "experience_years": doctor.experience_years,
                    "consultation_fee": doctor.consultation_fee,
                    "is_verified": doctor.is_verified
                },

                "summary": {
                    "total_appointments": total_appointments,
                    "pending_appointments": pending_appointments,
                    "confirmed_appointments": confirmed_appointments,
                    "rejected_appointments": rejected_appointments,
                    "total_medical_records": medical_records.count()
                },

                "appointments": [
                    {
                        "id": appointment.id,
                        "patient_name": appointment.patient.username,
                        "patient_email": appointment.patient.email,
                        "appointment_date": appointment.appointment_date,
                        "appointment_time": appointment.appointment_time,
                        "reason": appointment.reason,
                        "status": appointment.status
                    }
                    for appointment in appointments
                ],

                "medical_records": [
                    {
                        "id": record.id,
                        "appointment_id": record.appointment.id,
                        "patient_name": record.appointment.patient.username,
                        "diagnosis": record.diagnosis,
                        "prescription": record.prescription,
                        "notes": record.notes,
                        "created_at": record.created_at
                    }
                    for record in medical_records
                ]
            },
            status=status.HTTP_200_OK
        )
##PHARMACY INFORMATION only       
class PharmacyOnlyView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPharmacy
    ]

    def get(self, request):

        return Response(
            {
                "message": "Welcome Pharmacy",
                "user_id": request.user.id,
                "username": request.user.username,
                "role": request.user.role
            },
            status=status.HTTP_200_OK
        )

        
#------------------------
##PHARMCAY

#Orders in Pharmacy   
class PharmacyOrdersView(APIView):

    permission_classes = [IsAuthenticated, IsPharmacy]

    def get(self, request):

        pharmacy = request.user.pharmacy_profile

        orders = MedicineOrder.objects.filter(
            medicine__pharmacy=pharmacy
        ).order_by("-created_at")

        serializer = PharmacyOrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
#Pendiny Phramacy        
class PendingPharmacyView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):

        pharmacies = PharmacyProfile.objects.filter(
            is_verified=False
        )

        data = []

        for pharmacy in pharmacies:

            data.append({
                "id": pharmacy.id,
                "username": pharmacy.user.username,
                "email": pharmacy.user.email,
                "phone_number": pharmacy.user.phone_number,
                "pharmacy_name": pharmacy.pharmacy_name,
                "license_number": pharmacy.license_number,
                "address": pharmacy.address,
                "is_verified": pharmacy.is_verified
            })

        return Response(
            data,
            status=status.HTTP_200_OK
        )
 
#Pharamcy Verify       
class VerifyPharmacyView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, pharmacy_id):

        try:
            pharmacy = PharmacyProfile.objects.get(
                id=pharmacy_id,
                is_verified=False
            )

        except PharmacyProfile.DoesNotExist:

            return Response(
                {
                    "message": "Pending pharmacy not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        pharmacy.is_verified = True

        pharmacy.save(
            update_fields=["is_verified"]
        )

        return Response(
            {
                "message": "Pharmacy verified successfully.",
                "pharmacy_id": pharmacy.id,
                "username": pharmacy.user.username,
                "pharmacy_name": pharmacy.pharmacy_name,
                "is_verified": pharmacy.is_verified
            },
            status=status.HTTP_200_OK
        )
        
#Presciption View
class MyPrescriptionsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPatient
    ]

    def get(self, request):

        records = MedicalRecord.objects.filter(
            appointment__patient=request.user
        ).select_related(
            "appointment__doctor__user"
        ).prefetch_related(
            "prescription_items__medicine__pharmacy"
        ).order_by(
            "-created_at"
        )

        serializer = PatientPrescriptionSerializer(
            records,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
        
#Doctor Verofy 
class VerifyDoctorView(APIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def patch(self, request, doctor_id):

        try:
            doctor = DoctorProfile.objects.get(
                id=doctor_id,
                is_verified=False
            )
        except DoctorProfile.DoesNotExist:
            return Response(
                {
                    "message": "Pending doctor not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        doctor.is_verified = True
        doctor.save(update_fields=["is_verified"])

        return Response(
            {
                "message": "Doctor verified successfully.",
                "doctor_id": doctor.id,
                "username": doctor.user.username,
                "is_verified": doctor.is_verified
            },
            status=status.HTTP_200_OK
        )

#-------------------------------
##AI FEATURE

class SymptomCheckerView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = SymptomCheckerSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        symptoms = serializer.validated_data["symptoms"]

        try:
            result = analyze_symptoms(symptoms)

            lines = result.splitlines()

            specialization = None
            reason = None
            urgency = None

            for line in lines:

                if line.startswith("Specialization:"):
                    specialization = line.split(
                        ":", 1
                    )[1].strip()

                elif line.startswith("Reason:"):
                    reason = line.split(
                        ":", 1
                    )[1].strip()

                elif line.startswith("Urgency:"):
                    urgency = line.split(
                        ":", 1
                    )[1].strip()

            return Response(
                {
                    "message": "Symptoms analyzed successfully.",
                    "specialization": specialization,
                    "reason": reason,
                    "urgency": urgency,
                    "disclaimer": (
                        "This is a preliminary recommendation "
                        "and not a medical diagnosis."
                    )
                },
                status=status.HTTP_200_OK
            )

        # except Exception as e:

        #     return Response(
        #         {
        #             "error": "Unable to analyze symptoms at this time."
        #         },
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR
        #     )
        
        except Exception as e:
            
            print("SYMPTOM CHECKER ERROR:", repr(e))

            return Response(
        {
            "error": "Unable to analyze symptoms at this time.",
            "details": str(e)
        },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
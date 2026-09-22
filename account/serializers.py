from rest_framework import serializers
from .models import User,PatientProfile, DoctorProfile,PharmacyProfile,Appointment,Medicine,MedicineOrder,MedicalRecord,PrescriptionItem

class PatientRegistrationSerializer(serializers.ModelSerializer):
    
    date_of_birth=serializers.DateField(required=False,allow_null=True)
    
    gender=serializers.ChoiceField(choices=PatientProfile.Gender.choices,required=False)
    
    medical_history=serializers.CharField(required=False,allow_blank=True)
    
    address=serializers.CharField(required=False,allow_blank=True)
    
    
    class Meta:
        model=User
        fields=["username","email","password","phone_number","date_of_birth","gender","medical_history","address",]
        
        extra_kwargs={"password":{"write_only":True}}
        
    def create(self, validated_data):
        date_of_birth=validated_data.pop("date_of_birth",None)
        gender=validated_data.pop("gender","")
        medical_history=validated_data.pop("medical_history","")
        address=validated_data.pop("address","")
        
        user=User.objects.create_user(role=User.Role.PATIENT,**validated_data)
        
        PatientProfile.objects.create(user=user,date_of_birth=date_of_birth,gender=gender,medical_history=medical_history,address=address)
        
        return user
    


# Doctor Serializer
from rest_framework.validators import UniqueValidator
class DoctorRegistrationSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
    validators=[
        UniqueValidator(
            queryset=User.objects.all(),
            message="Username already exists. Please choose another username."
        )
    ]
)
    
    specialization = serializers.CharField(
        max_length=100
    )

    qualification = serializers.CharField(
        max_length=200
    )

    license_number = serializers.CharField(
        max_length=100
    )

    experience_years = serializers.IntegerField(
        min_value=0
    )

    consultation_fee = serializers.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
            "phone_number",
            "specialization",
            "qualification",
            "license_number",
            "experience_years",
            "consultation_fee",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):

        specialization = validated_data.pop("specialization")
        qualification = validated_data.pop("qualification")
        license_number = validated_data.pop("license_number")
        experience_years = validated_data.pop("experience_years")
        consultation_fee = validated_data.pop("consultation_fee")

        user = User.objects.create_user(
        role=User.Role.DOCTOR,
        **validated_data
        )

        DoctorProfile.objects.create(
        user=user,
        specialization=specialization,
        qualification=qualification,
        license_number=license_number,
        experience_years=experience_years,
        consultation_fee=consultation_fee
    )

        return user
    
    
    
# Pharmacy Profile Serializers
class PharmacyRegistrationSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Username already exists. Please choose another username."
            )
        ]
    )

    pharmacy_name = serializers.CharField(
        max_length=200
    )

    license_number = serializers.CharField(
        max_length=100
    )

    address = serializers.CharField()

    class Meta:
        model = User

        fields = [
            "username",
            "email",
            "password",
            "phone_number",
            "pharmacy_name",
            "license_number",
            "address",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):

        pharmacy_name = validated_data.pop("pharmacy_name")
        license_number = validated_data.pop("license_number")
        address = validated_data.pop("address")

        user = User.objects.create_user(
            role=User.Role.PHARMACY,
            **validated_data
        )

        PharmacyProfile.objects.create(
            user=user,
            pharmacy_name=pharmacy_name,
            license_number=license_number,
            address=address
        )

        return user
    
    
##doctor->patient
class DoctorListSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username")
    email = serializers.EmailField(source="user.email")
    phone_number = serializers.CharField(source="user.phone_number")

    class Meta:
        model = DoctorProfile

        fields = [
            "id",
            "username",
            "email",
            "phone_number",
            "specialization",
            "qualification",
            "license_number",
            "experience_years",
            "consultation_fee",
            "is_verified",
        ]
        
##APPOINTMNET SERIALIZERS
class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment

        fields = [
            "id",
            "doctor",
            "appointment_date",
            "appointment_time",
            "reason",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]
        
        
##Patient VIEW APPOINTMENT
class MyAppointmentSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="doctor.user.username",
        read_only=True
    )

    specialization = serializers.CharField(
        source="doctor.specialization",
        read_only=True
    )

    class Meta:
        model = Appointment

        fields = [
            "id",
            "doctor_name",
            "specialization",
            "appointment_date",
            "appointment_time",
            "reason",
            "status",
            "created_at",
        ]
        
        
##DCOTOR VIEWS APPOINTMNET
class DoctorAppointmentSerializer(serializers.ModelSerializer):

    patient_name = serializers.CharField(
        source="patient.username",
        read_only=True
    )

    patient_email = serializers.EmailField(
        source="patient.email",
        read_only=True
    )

    class Meta:
        model = Appointment

        fields = [
            "id",
            "patient_name",
            "patient_email",
            "appointment_date",
            "appointment_time",
            "reason",
            "status",
            "created_at",
        ]
        
        
##DCOTOR ACCEPTS/REHECTS APPOINTMENT
class AppointmentStatusSerializer(serializers.Serializer):

    status = serializers.ChoiceField(
        choices=[
            ("CONFIRMED", "Confirmed"),
            ("REJECTED", "Rejected"),
        ]
    )
    
class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine

        fields = [
            "id",
            "name",
            "description",
            "price",
            "stock",
            "is_available",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "is_available",
            "created_at",
        ]
        
##MEDICINE LIST
class MedicineListSerializer(serializers.ModelSerializer):

    pharmacy_name = serializers.CharField(
        source="pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:
        model = Medicine
        fields = [
            "id",
            "pharmacy_name",
            "name",
            "description",
            "price",
            "stock",
            "is_available",
        ]
 
class MedicineOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicineOrder

        fields = [
            "id",
            "medicine",
            "quantity",
            "total_price",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "total_price",
            "status",
            "created_at",
        ]

        extra_kwargs = {
            "quantity": {
                "min_value": 1
            }
        }
        
            
class PharmacyOrderSerializer(serializers.ModelSerializer):

    patient_name = serializers.CharField(
        source="patient.username",
        read_only=True
    )

    patient_email = serializers.EmailField(
        source="patient.email",
        read_only=True
    )

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    class Meta:
        model = MedicineOrder

        fields = [
            "id",
            "patient_name",
            "patient_email",
            "medicine_name",
            "quantity",
            "total_price",
            "status",
            "created_at",
        ]

class PharmacyOrderSerializer(serializers.ModelSerializer):

    patient_name = serializers.CharField(
        source="patient.username",
        read_only=True
    )

    patient_email = serializers.EmailField(
        source="patient.email",
        read_only=True
    )

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    class Meta:
        model = MedicineOrder

        fields = [
            "id",
            "patient_name",
            "patient_email",
            "medicine_name",
            "quantity",
            "total_price",
            "status",
            "created_at",
        ]
        
class MyMedicineOrderSerializer(serializers.ModelSerializer):

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    pharmacy_name = serializers.CharField(
        source="medicine.pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:
        model = MedicineOrder

        fields = [
            "id",
            "medicine_name",
            "pharmacy_name",
            "quantity",
            "total_price",
            "status",
            "created_at",
        ]
        
class MedicalRecordCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalRecord

        fields = [
            "appointment",
            "diagnosis",
            "symptoms",
            "prescription",
            "notes",
        ]

        extra_kwargs = {
            "appointment": {
                "required": True
            },
            "diagnosis": {
                "required": True
            },
            "symptoms": {
                "required": False,
                "allow_blank": True
            },
            "prescription": {
                "required": False,
                "allow_blank": True
            },
            "notes": {
                "required": False,
                "allow_blank": True
            }
        }


class MedicalRecordSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="appointment.doctor.user.username",
        read_only=True
    )

    patient_name = serializers.CharField(
        source="appointment.patient.username",
        read_only=True
    )

    appointment_date = serializers.DateField(
        source="appointment.appointment_date",
        read_only=True
    )

    appointment_time = serializers.TimeField(
        source="appointment.appointment_time",
        read_only=True
    )

    class Meta:
        model = MedicalRecord

        fields = [
            "id",
            "appointment",
            "patient_name",
            "doctor_name",
            "appointment_date",
            "appointment_time",
            "diagnosis",
            "symptoms",
            "prescription",
            "notes",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "patient_name",
            "doctor_name",
            "appointment_date",
            "appointment_time",
            "created_at",
        ]
        
class PatientMedicalHistorySerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="appointment.doctor.user.username",
        read_only=True
    )

    specialization = serializers.CharField(
        source="appointment.doctor.specialization",
        read_only=True
    )

    appointment_date = serializers.DateField(
        source="appointment.appointment_date",
        read_only=True
    )

    appointment_time = serializers.TimeField(
        source="appointment.appointment_time",
        read_only=True
    )

    class Meta:
        model = MedicalRecord

        fields = [
            "id",
            "appointment",
            "doctor_name",
            "specialization",
            "appointment_date",
            "appointment_time",
            "diagnosis",
            "symptoms",
            "prescription",
            "notes",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "appointment",
            "doctor_name",
            "specialization",
            "appointment_date",
            "appointment_time",
            "created_at",
        ]
        
   
class PrescriptionItemSerializer(serializers.ModelSerializer):

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    pharmacy_name = serializers.CharField(
        source="medicine.pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:
        model = PrescriptionItem

        fields = [
            "id",
            "medicine",
            "medicine_name",
            "pharmacy_name",
            "dosage",
            "frequency",
            "duration",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "medicine_name",
            "pharmacy_name",
            "created_at",
        ]
        
             
class PatientPrescriptionItemSerializer(serializers.ModelSerializer):

    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    pharmacy_name = serializers.CharField(
        source="medicine.pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:
        model = PrescriptionItem

        fields = [
            "id",
            "medicine",
            "medicine_name",
            "pharmacy_name",
            "dosage",
            "frequency",
            "duration",
            "created_at"
        ]

        read_only_fields = [
            "id",
            "medicine_name",
            "pharmacy_name",
            "created_at"
        ]
        
class PatientPrescriptionSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="appointment.doctor.user.username",
        read_only=True
    )

    specialization = serializers.CharField(
        source="appointment.doctor.specialization",
        read_only=True
    )

    appointment_date = serializers.DateField(
        source="appointment.appointment_date",
        read_only=True
    )

    prescription_items = PatientPrescriptionItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = MedicalRecord

        fields = [
            "id",
            "appointment",
            "doctor_name",
            "specialization",
            "appointment_date",
            "diagnosis",
            "prescription",
            "prescription_items",
            "notes",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "appointment",
            "doctor_name",
            "specialization",
            "appointment_date",
            "prescription_items",
            "created_at",
        ]

class PatientPrescriptionSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source="appointment.doctor.user.username",
        read_only=True
    )

    specialization = serializers.CharField(
        source="appointment.doctor.specialization",
        read_only=True
    )

    appointment_date = serializers.DateField(
        source="appointment.appointment_date",
        read_only=True
    )

    prescription_items = PatientPrescriptionItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = MedicalRecord

        fields = [
            "id",
            "appointment",
            "doctor_name",
            "specialization",
            "appointment_date",
            "diagnosis",
            "prescription",
            "prescription_items",
            "notes",
            "created_at"
        ]

        read_only_fields = [
            "id",
            "appointment",
            "doctor_name",
            "specialization",
            "appointment_date",
            "prescription_items",
            "created_at"
        ]

class DoctorPrescriptionItemSerializer(serializers.ModelSerializer):
    medicine_name = serializers.CharField(
        source="medicine.name",
        read_only=True
    )

    pharmacy_name = serializers.CharField(
        source="medicine.pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:
        model = PrescriptionItem
        fields = [
            "id",
            "medicine",
            "medicine_name",
            "pharmacy_name",
            "dosage",
            "frequency",
            "duration",
            "created_at",
        ]
     
class DoctorMedicalRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(
        source="appointment.patient.username",
        read_only=True
    )

    doctor_name = serializers.CharField(
        source="appointment.doctor.user.username",
        read_only=True
    )

    appointment_date = serializers.DateField(
        source="appointment.appointment_date",
        read_only=True
    )

    appointment_time = serializers.TimeField(
        source="appointment.appointment_time",
        read_only=True
    )

    prescription_items = DoctorPrescriptionItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = MedicalRecord

        fields = [
            "id",
            "appointment",
            "patient_name",
            "doctor_name",
            "appointment_date",
            "appointment_time",
            "diagnosis",
            "symptoms",
            "prescription",
            "prescription_items",
            "notes",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "patient_name",
            "doctor_name",
            "appointment_date",
            "appointment_time",
            "prescription_items",
            "created_at",
        ]
        
                 
class SymptomCheckerSerializer(serializers.Serializer):

    symptoms = serializers.CharField(
        required=True,
        allow_blank=False,
        max_length=2000
    )
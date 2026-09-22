from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    
    class Role(models.TextChoices):
        PATIENT="PATIENT","Patient"
        DOCTOR="DOCTOR","Doctor"
        PHARMACY="PHARMACY","Pharmacy"
        
    role=models.CharField(max_length=20,choices=Role.choices,default=Role.PATIENT)
    
    phone_number=models.CharField(max_length=15,blank=True)
    
    # is_verfied=models.BooleanField(default=False)
    
    def __str__(self):
        return self.username
    
    
class PatientProfile(models.Model):
    class Gender(models.TextChoices):
        MALE="MALE","Male"
        FEMAL="FEMALE","Female"
        OTHER="OTHER","Other"
        
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="patient_profile")
    
    date_of_birth=models.DateField(null=True,blank=True)
    
    gender=models.CharField(max_length=10,choices=Gender.choices,blank=True)
    
    medical_history=models.TextField(blank=True)
    
    address=models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.username}-Patient"
    
# DOCTOR models
class DoctorProfile(models.Model):

    class Specialization(models.TextChoices):
        GENERAL = "GENERAL", "General Physician"
        CARDIOLOGY = "CARDIOLOGY", "Cardiology"
        DERMATOLOGY = "DERMATOLOGY", "Dermatology"
        PEDIATRICS = "PEDIATRICS", "Pediatrics"
        ENT = "ENT", "ENT Specialist"

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="doctor_profile"
    )

    specialization = models.CharField(
        max_length=100
    )

    qualification = models.CharField(
        max_length=200
    )

    license_number = models.CharField(
        max_length=100,
        unique=True
    )

    experience_years = models.PositiveIntegerField(
        default=0
    )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    is_verified = models.BooleanField(
        default=False
    )
    
    def __str__(self):
        return f"Dr. {self.user.get_full_name()}"
    
class PharmacyProfile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="pharmacy_profile")
    
    pharmacy_name=models.CharField(max_length=200)
    
    license_number=models.CharField(max_length=100,unique=True)
    
    address=models.TextField()
    
    is_verified=models.BooleanField(default=False)
    
    def __str__(self):
        return self.pharmacy_name
    
class Medicine(models.Model):

    pharmacy = models.ForeignKey(
        PharmacyProfile,
        on_delete=models.CASCADE,
        related_name="medicines"
    )

    name = models.CharField(
        max_length=200
    )

    description = models.TextField(
        blank=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    is_available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
    
##APPOINTMNET SYSTEM
class Appointment(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        ACCEPTED = "ACCEPTED", "Accepted"
        REJECTED = "REJECTED", "Rejected"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    patient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="patient_appointments"
    )

    doctor = models.ForeignKey(
        DoctorProfile,
        on_delete=models.CASCADE,
        related_name="appointments"
    )

    appointment_date = models.DateField()

    appointment_time = models.TimeField()

    reason = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.patient.username} - {self.doctor.user.username} - {self.appointment_date}"
    

##MEDICINE LIST
class MedicineOrder(models.Model):

    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        REJECTED = "REJECTED", "Rejected"
        COMPLETED = "COMPLETED", "Completed"

    patient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="medicine_orders"
    )

    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    quantity = models.PositiveIntegerField()

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.patient.username} - {self.medicine.name}"
    
##APPOINTMENT
class MedicalRecord(models.Model):

    appointment = models.OneToOneField(
        Appointment,
        on_delete=models.CASCADE,
        related_name="medical_record"
    )

    diagnosis = models.TextField()

    symptoms = models.TextField(blank=True)

    prescription = models.TextField(blank=True)

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Medical Record - {self.appointment.patient.username}"
    
    
class PrescriptionItem(models.Model):

    medical_record = models.ForeignKey(
        MedicalRecord,
        on_delete=models.CASCADE,
        related_name="prescription_items"
    )

    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.PROTECT,
        related_name="prescription_items"
    )

    dosage = models.CharField(
        max_length=100
    )

    frequency = models.CharField(
        max_length=100
    )

    duration = models.CharField(
        max_length=100
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.medical_record.id} - "
            f"{self.medicine.name}"
        )
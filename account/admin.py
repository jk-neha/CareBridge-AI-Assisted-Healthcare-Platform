from django.contrib import admin
from .models import User,PatientProfile,DoctorProfile,PharmacyProfile

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    "username","email","role","phone_numer","is_active"
    
    list_filter=("role","is_active")
    
    search_fields=("username","email","phone_number")
    
@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display=("user","gender","date_of_birth")
    
    search_fields=("user__username","user__email")
    
@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display=("user","specialization","qualification","experience_years","consultation_fee","is_verified",)
    
    # list_display=("user","specialization","qualification","experience_years","consultation_fee","is_verified",)
    
    list_filter=("specialization","is_verified",)
    
    search_fields=("suer__username","user__email","license_number",)
    
    
@admin.register(PharmacyProfile)
class PharmacyProfileAdmin(admin.ModelAdmin):
    list_display=("pharmacy_name","user",
                  "license_number",
                  "is_verified")
    
    list_filter=("is_verified",)
    
    search_fields=("pharmacy_name","license_number","user__username")
    
    
from rest_framework.permissions import BasePermission


class IsPatient(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "PATIENT"
        )
        
class IsDoctor(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "DOCTOR"
        )
        
class IsPharmacy(BasePermission):

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.role == "PHARMACY"
        )
        
        
class IsVerifiedDoctor(BasePermission):

    message = "Only verified doctors can access this resource."

    def has_permission(self, request, view):

        if not request.user.is_authenticated:
            return False

        if request.user.role != "DOCTOR":
            return False

        if not hasattr(request.user, "doctor_profile"):
            return False

        if not request.user.doctor_profile.is_verified:
            return False

        return True
    
    
class IsAdminUser(BasePermission):

    message = "Only administrators can access this resource."

    def has_permission(self, request, view):

        return (
            request.user.is_authenticated
            and request.user.is_staff
        )
        
        

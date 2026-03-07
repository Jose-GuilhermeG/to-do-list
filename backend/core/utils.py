from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model



def get_access_refresh_token(user):
    refresh_token = RefreshToken.for_user(user)
    return {
        "access": str(refresh_token.access_token),
        "refresh": str(refresh_token)
    }
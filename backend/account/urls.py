from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenVerifyView , TokenRefreshView

urlpatterns = [
    path(
        'login/',
        TokenObtainPairView.as_view(),
        name="login"
    ),
    path(
        'token/refresh/',
        TokenRefreshView.as_view(),
        name="token-refresh"
    ),
    path(
        'token/verify/',
        TokenVerifyView.as_view(),
        name="token-verify",
    )
]

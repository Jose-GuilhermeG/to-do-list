from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenVerifyView , TokenRefreshView , TokenBlacklistView

from account import views

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
    ),
    path(
        'register/',
        views.RegisterUserView.as_view(),
        name='register'
    ),
    path(
        'me/',
        views.UserDetailView.as_view(),
        name='detail'
    ),
    path(
        'logout/',
        TokenBlacklistView.as_view(),
        name="logout"
    )
]

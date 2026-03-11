from account.serializers import RegisterUserSerializer, UserDetailSerializer
from core.utils import get_access_refresh_token
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

USER = get_user_model()

# Create your views here.
class RegisterUserView(
    CreateAPIView
):

    queryset = USER.objects.all()
    serializer_class = RegisterUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_access_refresh_token(user)
        return Response(
            tokens,
            status=status.HTTP_201_CREATED
        )


class UserDetailView(
    RetrieveUpdateDestroyAPIView
):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

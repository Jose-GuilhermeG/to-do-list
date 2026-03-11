from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

USER = get_user_model()

class RegisterUserSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = USER
        fields = ["username" , "email" , "password"]

    def create(self, validated_data : dict):
        return USER.objects.create_user(**validated_data)

class UserDetailSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = USER
        fields = ['username' , 'email']
        read_only_fields = ['email']



class LoginSerializer(
    TokenObtainPairSerializer
):
    @classmethod
    def get_token(cls, user):
      token = super().get_token(user)
      token["username"] = user.username
      return token

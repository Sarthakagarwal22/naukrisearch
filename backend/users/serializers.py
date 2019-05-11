from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from . import models


class MyRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    phone = serializers.IntegerField()
    jobIds = serializers.CharField(max_length=10000, allow_blank=True)

    def validate_phone(self, phone):
        return phone

    def validate_jobIds(self, jobIds):
        return jobIds

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'username': self.validated_data.get('username', ''),
            'phone': self.validate_phone('phone'),
            'jobIds': self.validate_jobIds('jobIds')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user


class UserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'phone', 'jobIds', )
        read_only_fields = ('email', )

from django.db import models
from django.core import serializers


class UserModel(models.Model):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    phone = serializers.IntegerField()
    jobIds = serializers.CharField(max_length=10000, allow_blank=True)
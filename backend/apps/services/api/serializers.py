from rest_framework import serializers
from apps.services.models import Service as Model


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


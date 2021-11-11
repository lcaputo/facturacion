from rest_framework import serializers
from apps.clients.models import Client as Model


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


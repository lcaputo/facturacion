from rest_framework import serializers
from apps.employees.models import Employee as Model


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


from rest_framework import serializers
from apps.expenses.models import Expenses as Model


class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


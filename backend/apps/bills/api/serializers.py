from rest_framework import serializers
from apps.bills.models import Bill as Model
from apps.employees.api.serializers import EmployeeSerializer
from apps.clients.api.serializers import ClientSerializer
from apps.products.api.serializers import ProductSerializer


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(BillSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'GET':
            self.Meta.depth = 1
        else:
            self.Meta.depth = 0


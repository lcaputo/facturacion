from rest_framework import serializers
from apps.products.models import Product as Model
from apps.products.models import Supplier


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'



from rest_framework import generics
from apps.products.models import Product as Model
from apps.products.api.serializers import ProductSerializer as Serializer
from apps.products.models import Supplier
from apps.products.api.serializers import SupplierSerializer


class ListCreateView(generics.ListCreateAPIView):
    queryset = Model.objects.all().order_by('id')
    serializer_class = Serializer


class DetailView(generics.RetrieveAPIView):
    queryset = Model.objects.all().order_by('id')
    serializer_class = Serializer
    lookup_field = 'pk'


class UpdateView(generics.UpdateAPIView):
    queryset = Model.objects.all()
    serializer_class = Serializer
    lookup_field = 'pk'


class DeleteView(generics.DestroyAPIView):
    queryset = Model.objects.all()
    serializer_class = Serializer
    lookup_field = 'pk'


class SupplierListCreateView(generics.ListCreateAPIView):
    queryset = Supplier.objects.all().order_by('id')
    serializer_class = SupplierSerializer


from rest_framework import generics
from apps.products.models import Product as Model
from apps.products.api.serializers import ProductSerializer as Serializer
from apps.products.models import Category
from apps.products.api.serializers import CategorySerializer
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


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer
    lookup_field = 'pk'


class CategoryUpdateView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'


class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'pk'


class SupplierListCreateView(generics.ListCreateAPIView):
    queryset = Supplier.objects.all().order_by('id')
    serializer_class = SupplierSerializer


class SupplierDetailView(generics.RetrieveAPIView):
    queryset = Supplier.objects.all().order_by('id')
    serializer_class = SupplierSerializer
    lookup_field = 'pk'


class SupplierUpdateView(generics.UpdateAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    lookup_field = 'pk'


class SupplierDeleteView(generics.DestroyAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    lookup_field = 'pk'


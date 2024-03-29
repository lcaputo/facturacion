from rest_framework import generics
from apps.bills.models import Bill as Model
from apps.bills.api.serializers import BillSerializer as Serializer


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


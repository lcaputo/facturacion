from rest_framework import generics
from apps.clients.models import Client as Model
from apps.clients.api.serializers import ClientSerializer as Serializer


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


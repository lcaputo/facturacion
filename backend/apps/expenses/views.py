from rest_framework import generics
from apps.expenses.models import Expenses as Model
from apps.expenses.api.serializers import ExpensesSerializer as Serializer


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


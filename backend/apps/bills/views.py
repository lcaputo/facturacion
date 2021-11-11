from rest_framework import generics
from apps.bills.models import Bill
from apps.bills.api.serializers import BillSerializer


class BillView(generics.ListCreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer


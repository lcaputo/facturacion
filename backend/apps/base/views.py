from rest_framework import generics
from apps.base.models import Configuration
from apps.base.api.serializers import ConfigurationSerializer


class ConfigurationView(generics.ListCreateAPIView):
    queryset = Configuration.objects.all()
    serializer_class = ConfigurationSerializer


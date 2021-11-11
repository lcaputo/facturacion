from django.db import models
from apps.base.models import BaseModel


class Service(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    price = models.IntegerField()


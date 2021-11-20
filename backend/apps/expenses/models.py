from django.db import models
from apps.base.models import BaseModel


class Expenses(BaseModel):
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=100)
    cost = models.IntegerField()


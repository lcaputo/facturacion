from django.db import models
from apps.base.models import BaseModel


class Client(BaseModel):
    name = models.CharField(max_length=20, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)
    identification = models.IntegerField(blank=False, null=False, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)
    phone = models.IntegerField(unique=True)

    def __str__(self):
        return f'{self.name} {self.last_name}'


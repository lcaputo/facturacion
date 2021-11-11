from django.db import models
from model_utils import Choices
from apps.base.models import BaseModel


class Employee(BaseModel):
    POSITIONS = Choices(('barbero', "Barbero"), ('cajero', "Cajero"))

    name = models.CharField(max_length=20, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)
    identification = models.IntegerField(blank=False, null=False, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)
    phone = models.IntegerField(unique=True)
    position = models.CharField("position", max_length=20,
                                choices=POSITIONS, default=POSITIONS.barbero)

    def __str__(self):
        return f'{self.name} {self.last_name}'


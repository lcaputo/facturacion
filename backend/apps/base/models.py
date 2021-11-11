from django.db import models
from model_utils import Choices


class BaseModel(models.Model):
    STATUS = Choices((1, 'active', "Active"), (0, 'inactive', "Inactive"))

    status = models.PositiveSmallIntegerField(
        "State", choices=STATUS, default=STATUS.active)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Configuration(BaseModel):
    name = models.CharField(max_length=20)
    value = models.CharField(max_length=20)

    def __str__(self):
        return self.name


from django.db import models
from apps.base.models import BaseModel
from apps.employees.models import Employee
from apps.clients.models import Client
from apps.products.models import Product


class Bill(BaseModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    product = models.ManyToManyRel(to=Product, field=id)
    price = models.IntegerField()
    subtotal = models.IntegerField()
    discount = models.IntegerField(default=0)
    total = models.IntegerField()

    def __str__(self):
        return str(self.id)


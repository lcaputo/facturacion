from django.db import models
from apps.base.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=20)

    class Meta:
        verbose_name_plural = 'Categories'


class Supplier(BaseModel):
    name = models.CharField(max_length=60)
    email = models.EmailField(blank=True, null=True)
    phone = models.IntegerField(blank=True, null=True)


class Product(BaseModel):
    name = models.CharField(max_length=100)
    supplier = models.ForeignKey(Supplier, to_field='id', related_name='products', on_delete=models.CASCADE)
    description = models.CharField(max_length=254)
    purchase_price = models.IntegerField()
    sale_price = models.IntegerField()
    stock = models.IntegerField()
    category = models.ForeignKey(Category, to_field='id', related_name='categories', on_delete=models.CASCADE)


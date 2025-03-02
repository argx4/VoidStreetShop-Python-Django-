from django.db import models
from product.models import *



class Basket(models.Model):
    product = models.ForeignKey(to=Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=0)
    selected_size = models.CharField(max_length=10, null=True)
    session_key = models.CharField(max_length=40, null=True)

    def __str__(self):
        return f'Продукт: {self.product.name}'

    def sum(self):
        return self.product.price * self.quantity
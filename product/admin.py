from django.contrib import admin
from django.forms import Textarea
from .models import ProductCategory, Product
from django.db import models

admin.site.register(ProductCategory)



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': Textarea},
    }
    list_display = ('name', 'price', 'quantity', 'category', 'sizes', 'id', 'active')
    search_fields = ('name',)


from django.shortcuts import render, redirect
from django.views.generic import DetailView
from product.models import *
from Basket.models import Basket
from django.core.mail import send_mail

def catalog(request):
    context = {
        'title': 'Voidstreet_studio',
        'catalog': Product.objects.all(),
        'categories': ProductCategory.objects.all(),
    }
    return render(request, 'catalog.html', context)

def contact(request):
    context = {
        'title': 'Контакти',

    }
    return render(request, 'contact.html', context)

class ProductDetailView(DetailView):
    model = Product
    template_name = 'productdetail.html'
    context_object_name = 'product'
    extra_context = {'title': 'Деталі товару'}


def basket(request):
    session_key = request.session.session_key
    baskets = Basket.objects.filter(session_key=session_key)
    total_sum = 0
    total_quantity = 0
    for basket in baskets:
        total_sum += basket.sum()
        total_quantity += basket.quantity

    context = {
        'title': 'Кошик',
        'baskets': baskets,
        'total_quantity': total_quantity,
        'total_sum': total_sum,
    }
    return render(request, 'basket.html', context)

def ordcreate(request):
    session_key = request.session.session_key
    baskets = Basket.objects.filter(session_key=session_key,)
    total_sum = 0
    total_quantity = 0
    for basket in baskets:
        total_sum += basket.sum()
        total_quantity += basket.quantity

    context = {
        'title': 'Створення замовлення',
        'baskets': baskets,
        'total_quantity': total_quantity,
        'total_sum': total_sum,
    }
    return render(request, 'ordcreate.html', context)

def delivret(request):
    context = {
        'title': 'Доставка та оплата',
    }
    return render(request, 'delivret.html', context)


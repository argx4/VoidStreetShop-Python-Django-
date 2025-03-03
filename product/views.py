from django.shortcuts import render, redirect
from django.views.generic import DetailView
from product.models import *
from Basket.models import Basket
from django.core.mail import send_mail

def catalog(request):
    products = Product.objects.all()
    search_query = request.GET.get('search', '')
    category_id = request.GET.get('category', '')
    
    if search_query:
        products = products.filter(name__icontains=search_query)

    if category_id:
        products = products.filter(category_id=category_id)
    
    context = {
        'title': 'Voidstreet_studio',
        'catalog': products,
        'categories': ProductCategory.objects.all(),
        'category_id': category_id,
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


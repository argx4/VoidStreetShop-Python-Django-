from django.shortcuts import render, redirect
from django.views.generic import DetailView
from product.models import *
from Basket.models import Basket
from django.core.mail import send_mail
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponseBadRequest

def catalog(request):
    products = Product.objects.all()
    search_query = request.GET.get('search', '')
    category_id = request.GET.get('category', '')
    
    if search_query:
        products = products.filter(name__icontains=search_query)

    if category_id:
        products = products.filter(category_id=category_id)
    
    # Pagination
    page = request.GET.get('page', 1)
    
    
    mobile = request.headers.get('User-Agent').lower()
    is_mobile = any(keyword in mobile for keyword in ['iphone', 'android', 'blackberry', 'iemobile', 'opera mini'])
    
    if is_mobile:
        paginator = Paginator(products, 5)  
    else:
        paginator = Paginator(products, 9)  

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    
    if is_mobile:
        current_page = products.number
        total_pages = paginator.num_pages
        
        if total_pages <= 5:
            
            page_range = range(1, total_pages + 1)
            show_first_dots = False
            show_last_dots = False
        else:
            if current_page <= 3:
                
                page_range = range(1, min(current_page + 2, 5))
                show_first_dots = False
                show_last_dots = True
            elif current_page >= total_pages - 2:
                
                page_range = range(max(total_pages - 4, current_page - 2), total_pages + 1)
                show_first_dots = False
                show_last_dots = False
            else:
                
                page_range = range(current_page - 2, current_page + 2)
                show_first_dots = False
                show_last_dots = True
    else:
        page_range = products.paginator.page_range
        show_first_dots = False
        show_last_dots = False

    context = {
        'title': 'Voidstreet_studio',
        'catalog': products,
        'categories': ProductCategory.objects.all(),
        'category_id': category_id,
        'search_query': search_query,
        'is_mobile': is_mobile,
        'page_range': page_range,
        'show_first_dots': show_first_dots,
        'show_last_dots': show_last_dots,
        'total_pages': paginator.num_pages,
        'show_first_page': current_page <= 3 if is_mobile else True,
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


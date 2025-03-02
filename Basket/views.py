from django.shortcuts import render, redirect, HttpResponsePermanentRedirect
from Basket.models import *
from django.http import JsonResponse


def basket_add(request, product_id):
    if not request.session.session_key:
        request.session.save()

    product = Product.objects.get(id=product_id)
    selected_size = request.POST.get('size')
    session_key = request.session.session_key

    basket = Basket.objects.filter(
        product=product,
        selected_size=selected_size,
        session_key = session_key,
    ).first()

    if basket:
        basket.quantity += 1
        basket.save()
    else:
        Basket.objects.create(
            product=product,
            quantity=1,
            selected_size=selected_size,
            session_key=session_key,
        )

    return HttpResponsePermanentRedirect(request.META['HTTP_REFERER'])

def basket_remove(request, basket_id):
    basket = Basket.objects.get(id=basket_id)
    basket.delete()

    return HttpResponsePermanentRedirect(request.META['HTTP_REFERER'])

def basket_clear(request):
    if request.method == 'POST':
        session_key = request.session.session_key
        if session_key:
            Basket.objects.filter(session_key=session_key).delete()
            return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)
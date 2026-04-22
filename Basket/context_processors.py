from Basket.models import Basket

def basket_count(request):
    
    total_quantity = 0
    
    if request.session.session_key:
        baskets = Basket.objects.filter(session_key=request.session.session_key)
        total_quantity = sum(basket.quantity for basket in baskets)
        
    return {'basket_count': total_quantity}

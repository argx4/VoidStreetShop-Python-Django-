from django.contrib import admin
from django.conf import settings
from django.urls import path
from product import views
from product.views import *
from django.conf.urls.static import static
from Basket.views import *
from Basket.models import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.catalog, name='catalog_view' ),
    path('contact/', views.contact, name='contact_view'),
    path('product/<int:pk>', views.ProductDetailView.as_view(), name="product_detail"),
    path('basket/add/<int:product_id>', basket_add , name="basket_add"),
    path('basket/remove/<int:basket_id>', basket_remove , name="basket_remove"),
    path('basket/', views.basket, name="basket_view"),
    path('ordercreate/', views.ordcreate, name="ord"),
    path('basket/clear/', basket_clear, name="basket_clear"),
    path('delivret/', views.delivret, name="delivret"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

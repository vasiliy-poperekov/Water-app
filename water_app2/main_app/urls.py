"""main_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from factory.views import ConsumerProductListView, ProductDetailView, ProductListMainView
from user.views import ClientSignupView, ConsumerSignupView, DeliveryServiceSignupView, CustomAuthToken, LogoutView, \
    ClientOnlyView, ConsumerOnlyView, DeliveryServiceOnlyView, ConsumerPutView, ClientView, DeliveryServiceDetailView
from delivery.views import DeliveryManView, DeliveryManDetailView, OrderView, OrderDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/client/', ClientSignupView.as_view()),
    path('signup/consumer/', ConsumerSignupView.as_view()),
    path('signup/delivery_service/', DeliveryServiceSignupView.as_view()),
    path('login/', CustomAuthToken.as_view(), name='auth-token'),
    path('logout/', LogoutView.as_view(), name='logout-view'),
    path('client/dashboard/', ClientOnlyView.as_view()),
    path('client/<int:pk>/', ClientView.as_view()),
    path('consumer/dashboard/', ConsumerOnlyView.as_view()),
    path('consumer/product/', ConsumerProductListView.as_view()),
    path('delivery_service/dashboard/', DeliveryServiceOnlyView.as_view()),
    path('product/', ProductListMainView.as_view()),
    path('product/<int:pk>/', ProductDetailView.as_view()),
    path('consumer/<int:pk>/', ConsumerPutView.as_view()),
    path('order/', OrderView.as_view()),
    path('order/<int:pk>/', OrderDetailView.as_view()),
    path('delivery_man/', DeliveryManView.as_view()),
    path('delivery_man/<int:pk>/', DeliveryManDetailView.as_view()),
    path('delivery_service/<int:pk>/', DeliveryServiceDetailView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

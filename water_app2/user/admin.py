from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Client)
admin.site.register(Consumer)
admin.site.register(DeliveryService)

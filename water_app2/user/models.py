from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.conf import settings
from django.dispatch import receiver


class User(AbstractUser):
    is_client = models.BooleanField(default=False)
    is_consumer = models.BooleanField(default=False)
    is_delivery_service = models.BooleanField(default=False)

    def __str__(self):
        return self.username


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Client(models.Model):
    user = models.OneToOneField(User, related_name='client', on_delete=models.CASCADE)
    client_name = models.TextField()
    phone_number = models.TextField()
    orders = models.ForeignKey('delivery.Order', related_name='user_orders', blank=True, on_delete=models.CASCADE,
                               null=True)
    address = models.TextField()

    def __str__(self):
        return self.user.username


class Consumer(models.Model):
    user = models.OneToOneField(User, related_name='consumer', on_delete=models.CASCADE)
    consumer_name = models.TextField()
    well_info = models.TextField()

    def __str__(self):
        return self.user.username


class DeliveryService(models.Model):
    user = models.OneToOneField(User, related_name='delivery_service', on_delete=models.CASCADE)
    delivery_service_name = models.TextField()

    def __str__(self):
        return self.user.username

from django.db import models


class DeliveryMan(models.Model):
    name = models.TextField()
    delivery_service = models.ForeignKey('user.DeliveryService', on_delete=models.CASCADE, related_name='delivery_men',
                                         default=None)
    phone_number = models.CharField(max_length=16, blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    product = models.ForeignKey('factory.Product', on_delete=models.CASCADE, related_name='product')
    client = models.ForeignKey('user.Client', on_delete=models.CASCADE, related_name='client_orders')
    count_of_products = models.IntegerField()
    address = models.TextField()
    delivery_service = models.ForeignKey('user.DeliveryService', on_delete=models.CASCADE,
                                         related_name='delivery_orders', blank=True, null=True)
    delivery_man = models.ForeignKey('DeliveryMan', on_delete=models.CASCADE,
                                     related_name='orders_list', blank=True, null=True)

    def __str__(self):
        return self.product.name + ' ' + self.client.client_name

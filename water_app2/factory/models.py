from django.db import models


class Product(models.Model):
    name = models.TextField()
    volume = models.FloatField()
    consist = models.TextField()
    consumer = models.ForeignKey('user.Consumer', on_delete=models.CASCADE, blank=True, null=True,
                                 related_name='consumers_products')
    image_url = models.TextField(default='')
    price_in_rub = models.IntegerField(default=0)

    def __str__(self):
        return self.name

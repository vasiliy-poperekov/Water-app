from rest_framework import serializers

from .models import Product


class ConsumersProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'volume', 'price_in_rub')


class ProductListMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'price_in_rub', 'image_url')


class ProductAllFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

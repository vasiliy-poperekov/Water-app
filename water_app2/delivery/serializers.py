from rest_framework import serializers

from .models import DeliveryMan, Order
from factory.serializers import ProductAllFieldsSerializer


class DeliveryManListSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMan
        fields = ('id', 'name')


class OrderListSerializer(serializers.ModelSerializer):
    product = ProductAllFieldsSerializer()

    class Meta:
        model = Order
        fields = ('id', 'product', 'count_of_products')


class DeliveryManDetailSerializer(serializers.ModelSerializer):
    orders_list = OrderListSerializer(many=True)

    class Meta:
        model = DeliveryMan
        fields = '__all__'


class DeliveryManSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryMan
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

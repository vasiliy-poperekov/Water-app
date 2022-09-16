from .models import *
from factory.models import Product
from delivery.models import Order
from delivery.serializers import DeliveryManDetailSerializer

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ClientSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        user = User(username=self.validated_data['username'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'error': "password do not match"})
        user.set_password(password)
        user.is_client = True
        user.save()

        Client.objects.create(id=user.id, user=user)

        return user


class ConsumerSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        user = User(username=self.validated_data['username'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'error': "password do not match"})
        user.set_password(password)
        user.is_consumer = True
        user.save()

        Consumer.objects.create(id=user.id, user=user)

        return user


class DeliveryServiceSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        user = User(username=self.validated_data['username'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'error': "password do not match"})
        user.set_password(password)
        user.is_delivery_service = True
        user.save()

        DeliveryService.objects.create(id=user.id, user=user)

        return user


class DeliveryServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryService
        fields = ('id', 'delivery_service_name')


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class ConsumerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumer
        fields = ('id', 'consumer_name')


class ProductDetailSerializer(serializers.ModelSerializer):
    consumer = ConsumerListSerializer()

    class Meta:
        model = Product
        fields = '__all__'


class ConsumerSerializer(serializers.ModelSerializer):
    consumers_products = ProductDetailSerializer(many=True)

    class Meta:
        model = Consumer
        fields = '__all__'


class ConsumerPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumer
        fields = '__all__'


class DeliveryServiceDetailSerializer(serializers.ModelSerializer):
    delivery_men = DeliveryManDetailSerializer(many=True)

    class Meta:
        model = DeliveryService
        fields = '__all__'


class DeliveryServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryService
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    product = ProductDetailSerializer()
    client = ClientSerializer()

    class Meta:
        model = Order
        fields = '__all__'


class ClientDetailSerializer(serializers.ModelSerializer):
    client_orders = OrderDetailSerializer(many=True)

    class Meta:
        model = Client
        fields = '__all__'

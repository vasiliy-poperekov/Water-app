from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DeliveryMan, Order
from .serializers import DeliveryManSerializer, DeliveryManDetailSerializer, OrderSerializer
from user.serializers import OrderDetailSerializer


class DeliveryManView(APIView):

    def get(self, request):
        delivery_man = DeliveryMan.objects
        serializer = DeliveryManDetailSerializer(delivery_man, many=True)
        return Response(serializer.data)

    def post(self, request):
        delivery_man = DeliveryManSerializer(data=request.data)
        if delivery_man.is_valid():
            delivery_man.save()
            return Response(status=201)
        else:
            return Response(status=400)


class DeliveryManDetailView(APIView):

    def get(self, request, pk):
        delivery_man = DeliveryMan.objects.get(id=pk)
        serializer = DeliveryManDetailSerializer(delivery_man)
        return Response(serializer.data)

    def delete(self, request, pk):
        delivery_man = DeliveryMan.objects.get(id=pk)
        delivery_man.delete()
        return Response(status=201)

    def put(self, request, pk):
        delivery_man = DeliveryMan.objects.get(id=pk)
        serializer = DeliveryManSerializer(delivery_man, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(DeliveryManDetailSerializer(DeliveryMan.objects.get(id=pk)).data)
        else:
            return Response(status=400)


class OrderView(APIView):

    def get(self, request):
        orders = Order.objects
        serializer = OrderDetailSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        order = OrderSerializer(data=request.data)
        if order.is_valid():
            order.save()
            return Response(status=201)
        else:
            return Response(status=400)


class OrderDetailView(APIView):
    def get(self, request, pk):
        order = Order.objects.get(id=pk)
        serializer = OrderDetailSerializer(order)
        return Response(serializer.data)

    def delete(self, request, pk):
        order = Order.objects.get(id=pk)
        order.delete()
        return Response(status=201)

    def put(self, request, pk):
        order = Order.objects.get(id=pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(OrderDetailSerializer(Order.objects.get(id=pk)).data)
        else:
            return Response(status=400)

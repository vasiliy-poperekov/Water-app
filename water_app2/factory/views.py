from rest_framework import generics
from rest_framework.response import Response

from .models import Product
from .serializers import ConsumersProductListSerializer, ProductAllFieldsSerializer, ProductListMainSerializer
from user.serializers import ProductDetailSerializer


class ConsumerProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ConsumersProductListSerializer

    def post(self, request):
        product = ProductAllFieldsSerializer(data=request.data)
        if product.is_valid():
            product.save()
        return Response(status=201)


class ProductListMainView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListMainSerializer


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

    def put(self, request, pk):
        product = Product.objects.get(id=pk)
        serializer = ProductAllFieldsSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(ProductDetailSerializer(Product.objects.get(id=pk)).data)

    def delete(self, request, pk):
        product = Product.objects.get(id=pk)
        product.delete()
        return Response(status=201)

from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .permissions import IsClientUser, IsConsumerUser, IsDeliveryServiceUser
from .serializers import *
from rest_framework.authtoken.views import ObtainAuthToken


class ClientSignupView(generics.GenericAPIView):
    serializer_class = ClientSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': Token.objects.get(user=user).key,
            'message': "account created successfully"
        })


class ConsumerSignupView(generics.GenericAPIView):
    serializer_class = ConsumerSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': Token.objects.get(user=user).key,
            'message': "account created successfully"
        })


class DeliveryServiceSignupView(generics.GenericAPIView):
    serializer_class = DeliveryServiceSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': Token.objects.get(user=user).key,
            'message': "account created successfully"
        })


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'is_client': user.is_client,
            'is_consumer': user.is_consumer,
            'is_delivery_service': user.is_delivery_service
        })


class LogoutView(APIView):
    def post(self, request, format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)


class ClientOnlyView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated & IsClientUser]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ConsumerOnlyView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated & IsConsumerUser]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class DeliveryServiceOnlyView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated & IsDeliveryServiceUser]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ClientView(APIView):
    def get(self, request, pk):
        client = Client.objects.get(id=pk)
        serializer = ClientDetailSerializer(client)
        return Response(serializer.data)

    def patch(self, request, pk):
        client = Client.objects.get(id=pk)
        serializer = ClientSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(ClientDetailSerializer(Client.objects.get(id=pk)).data)
        else:
            return Response(status=400)


class ConsumerPutView(APIView):
    def patch(self, request, pk):
        consumer = Consumer.objects.get(id=pk)
        serializer = ConsumerPatchSerializer(consumer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(ConsumerSerializer(Consumer.objects.get(id=pk)).data)
        else:
            return Response(status=400)

    def get(self, request, pk):
        consumer = Consumer.objects.get(id=pk)
        serializer = ConsumerSerializer(consumer)
        return Response(serializer.data)


class ConsumerDetailView(generics.RetrieveAPIView):
    queryset = Consumer.objects
    serializer_class = ConsumerSerializer


class DeliveryServiceDetailView(APIView):
    def get(self, request, pk):
        delivery_service = DeliveryService.objects.get(id=pk)
        serializer = DeliveryServiceDetailSerializer(delivery_service)
        return Response(serializer.data)

    def put(self, request, pk):
        delivery_service = DeliveryService.objects.get(id=pk)
        serializer = DeliveryServiceSerializer(delivery_service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(DeliveryServiceDetailSerializer(DeliveryService.objects.get(id=pk)).data)
        else:
            return Response(status=400)

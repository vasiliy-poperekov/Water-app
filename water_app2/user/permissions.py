from rest_framework.permissions import BasePermission


class IsClientUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_client)


class IsConsumerUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_consumer)


class IsDeliveryServiceUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_delivery_service)

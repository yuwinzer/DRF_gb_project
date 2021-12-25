from rest_framework import mixins, viewsets
from .models import User
from .serializers import UserModelSerializer


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserReadUpdateViewSet(mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            viewsets.GenericViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserModelSerializer
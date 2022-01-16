from rest_framework import mixins, viewsets
from .models import User
from .serializers import \
    UserModelSerializer,\
    UserModelSerializerV1


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserReadUpdateViewSet(mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.CreateModelMixin,
                            viewsets.GenericViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v1':
            return UserModelSerializerV1
        return UserModelSerializer

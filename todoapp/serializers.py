from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo
from usersapp.serializers import UserModelSerializer


class ProjectSerializer(HyperlinkedModelSerializer):
    involved_users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(HyperlinkedModelSerializer):
    related_project = ProjectSerializer()
    author = UserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'
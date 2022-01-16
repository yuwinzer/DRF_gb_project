from rest_framework.serializers import ModelSerializer
from .models import Project, Todo
from usersapp.serializers import UserModelSerializer


class ProjectSerializer(ModelSerializer):
    involved_users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    related_project = ProjectSerializer()
    author = UserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'


class TodoSerializerBase(ModelSerializer):
    related_project = ProjectSerializer()
    # author = UserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'

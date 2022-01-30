from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, Todo
from .serializers import ProjectSerializer, TodoGetSerializer, TodoSerializerBase, ProjectGetSerializer
from .filters import ProjectFilter, ToDoByProjectNDatetimeFilter


class ProjectLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('id')
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPaginator
    filterset_class = ProjectFilter


    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectGetSerializer
        return ProjectSerializer


class ToDoLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 20


class ToDoNoDelViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('id')
    serializer_class = TodoGetSerializer
    pagination_class = ToDoLimitOffsetPaginator
    filterset_class = ToDoByProjectNDatetimeFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return TodoGetSerializer
        return TodoSerializerBase

    # @action(methods=['GET'], detail=True)
    # def get_project_name(self, request, pk=None):
    #     project = Project.objects.get(pk=pk)
    #     return Response({'name': str(project)})
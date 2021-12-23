from django_filters import rest_framework as filters
from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoByProjectNDatetimeFilter(filters.FilterSet):
    date_created = filters.DateFromToRangeFilter()

    class Meta:
        model = Todo
        fields = ['related_project', 'date_created']
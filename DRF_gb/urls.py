from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from usersapp.views import UserReadUpdateViewSet
from todoapp.views import ProjectViewSet, ToDoNoDelViewSet

router = DefaultRouter()
router.register('users', UserReadUpdateViewSet)
router.register('projects', ProjectViewSet)
router.register('todos', ToDoNoDelViewSet)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api/', include(router.urls)),
]

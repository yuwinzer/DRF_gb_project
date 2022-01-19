from django.contrib import admin
from django.urls import path, include, re_path
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from usersapp.views import UserReadUpdateViewSet
from todoapp.views import ProjectViewSet, ToDoNoDelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register('users', UserReadUpdateViewSet)
router.register('projects', ProjectViewSet)
router.register('todos', ToDoNoDelViewSet)

schema_view = get_schema_view(
   openapi.Info(
      title="Users",
      default_version='v0',
      description="Documentation to out project",
      contact=openapi.Contact(email="admin@admin.local"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# path('api/get/<str:name>', AuthorViewSet.as_view({'get': 'list'})),
# path('api/get/<int:pk>/', AuthorAPIView.as_view()),

# {'get': 'list'}
# path('api/post/', post_view)
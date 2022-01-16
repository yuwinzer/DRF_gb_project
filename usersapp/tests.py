import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserReadUpdateViewSet
from .models import User
from todo.models import Project, Todo


class TestUserView(TestCase):

    # APIRequestFactory()
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'Пухарь',
                                               'first_name': 'Саня',
                                               'last_name': 'Пушкин',
                                               'email': 'sashapuh@xxx.com'}, format='json')
        view = UserReadUpdateViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        request = factory.get('/api/users/')
        view = UserReadUpdateViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_create_request(self):
    #     factory = APIRequestFactory()
    #     request = factory.post('/api/users/', {'username': 'Пухарь',
    #                                            'first_name': 'Саня',
    #                                            'last_name': 'Пушкин',
    #                                            'email': 'sashapuh@xxx.com'}, format='json')
    #     admin = User.objects.create_user('vasia', 'v@v.com', 'v123456')
    #     force_authenticate(request, admin)
    #     view = UserReadUpdateViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'Пухарь',
                                               'first_name': 'Саня',
                                               'last_name': 'Пушкин',
                                               'email': 'sashapuh@xxx.com'}, format='json')
        admin = User.objects.create_superuser('admin_vasia', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = UserReadUpdateViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # APIClient()
    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(username='Николя',
                                   first_name='Николай',
                                   last_name='Хуторный',
                                   email='koliatut@pornhub.com')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        user = User.objects.create(username='Николя',
                                   first_name='Николай',
                                   last_name='Хуторный',
                                   email='koliatut@pornhub.com')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'name': 'Грин', 'email': 'grenki@zajcev.net'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = User.objects.create(username='Николя',
                                   first_name='Николай',
                                   last_name='Хуторный',
                                   email='koliatut@pornhub.com')
        client = APIClient()
        admin = User.objects.create_superuser('admin_vasia', 'admin@admin.com', 'admin123456')
        client.login(username='admin_vasia', password='admin123456')
        response = client.put(f'/api/users/{user.id}/', {'username': 'test',
                                                         'first_name': 'test',
                                                         'last_name': 'test',
                                                         'email': 'grenki@zajcev.net'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'test')
        self.assertEqual(user.email, 'grenki@zajcev.net')
        client.logout()


# APITestCase
class TestTodoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        proj = mixer.blend(Project)
        todo = mixer.blend(Todo, author_id=1)
        admin = User.objects.create_superuser('admin_vasia', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin_vasia', password='admin123456')
        response = self.client.put(f'/api/todos/{todo.id}/',
                                   {'name': 'Политех',
                                    'related_project': proj,
                                    'author': admin.id,
                                    'task': 'test'}, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.name, 'Политех')

    # def test_edit_admin(self):
    #     proj = Project.objects.filter(id=1)
    #     user = User.objects.create(username='Николя',
    #                                first_name='Николай',
    #                                last_name='Хуторный',
    #                                email='koliatut.@pornhub.com')
    #     todo = Todo.objects.create(related_project_id=proj.first(),
    #                                related_project=1,
    #                                name='Политех',
    #                                author_id=user.id,
    #                                task='Сегодня опять с бодуна на работу')
    #     admin = User.objects.create_superuser('admin_vasia', 'admin@admin.com', 'admin123456')
    #     self.client.login(username='admin_vasia', password='admin123456')
    #     response = self.client.put(f'/api/todos/{todo.id}/',
    #                                {'name': 'Политех', 'related_project': 1, 'author_id': todo.author_id, 'task': todo.task}, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     todo = Todo.objects.get(id=todo.id)
    #     self.assertEqual(todo.name, 'Политех')
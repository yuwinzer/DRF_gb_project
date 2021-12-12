import json
import os

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User as Admin

from usersapp.models import User

JSON_PATH = 'usersapp/fixtures'
JSON_NAME = 'users_db'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), mode='r', encoding='utf8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = load_from_json(JSON_NAME)

        User.objects.all().delete()
        for user in users:
            new_user = User(**user['fields'])
            new_user.pk = user['pk']  # comment to prevent over-wright items in db (if they exist)
            new_user.save()

        Admin.objects.all().delete()
        super_user = Admin.objects.create_superuser('admin', 'x@mail.com', '123')
        if super_user:
            print("Super user created.")
# Generated by Django 4.0 on 2022-01-01 18:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usersapp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='author',
            field=models.ForeignKey(on_delete=models.SET('удален'), to='usersapp.user', verbose_name='автор'),
        ),
        migrations.AddField(
            model_name='todo',
            name='related_project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todoapp.project', verbose_name='основной проект'),
        ),
        migrations.AddField(
            model_name='project',
            name='involved_users',
            field=models.ManyToManyField(blank=True, help_text='Список участников проекта', to=settings.AUTH_USER_MODEL, verbose_name='участники'),
        ),
    ]

from django.db import models



class Project(models.Model):
    name = models.CharField(max_length=64, verbose_name='название')
    repo_link = models.FilePathField(path=None,
                                     max_length=256,
                                     allow_folders=True,
                                     blank=True,
                                     verbose_name='путь к репозиторию')
    involved_users = models.ManyToManyField(blank=True,
                                            help_text='Список участников проекта',
                                            to='usersapp.User',
                                            verbose_name='участники')
    is_active = models.BooleanField(verbose_name='активен', default=True)

    def __str__(self):
        return self.name


class Todo(models.Model):
    name = models.CharField(max_length=64, verbose_name='название')
    task = models.TextField(max_length=256, verbose_name='текст')
    related_project = models.ForeignKey(to='todoapp.Project',
                                        on_delete=models.CASCADE,
                                        verbose_name='основной проект')
    author = models.ForeignKey(to='usersapp.User',
                               on_delete=models.SET('удален'),
                               verbose_name='автор')
    date_created = models.DateTimeField(auto_now_add=True, verbose_name='дата создания')
    date_updated = models.DateTimeField(auto_now=True, verbose_name='дата изменения')
    is_active = models.BooleanField(verbose_name='активно', default=True)

    def __str__(self):
        return self.name
import graphene
from graphene_django import DjangoObjectType
from usersapp.models import User
from todoapp.models import Todo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()

    all_projects = graphene.List(UserType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

# {
#   projectById(id:1){
#     name
#     involvedUsers{
#       username
#     }
#     todoSet{
#       author{
#         username
#       }
#       name
#       task
#     }
#   }
# }


schema = graphene.Schema(query=Query)
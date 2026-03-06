from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from tasks.models import TaskList
from tasks.serializers import taskListSerializer , TaskListDetailSerializer
from core.mixins import ViewSetGetSerializerClassMixin

# Create your views here.
class TaskListViewSet(
    ViewSetGetSerializerClassMixin,
    ModelViewSet
):
    http_method_names = ['get' , 'post' , 'put' , 'delete' , 'options']
    permission_classes = [IsAuthenticated]
    serializer_class = taskListSerializer
    serializers_class_per_action = {
        'retrieve' : TaskListDetailSerializer,
        'update' : TaskListDetailSerializer,
    }
    
    def get_queryset(self):
        return TaskList.objects.filter(user = self.request.user)
    
    
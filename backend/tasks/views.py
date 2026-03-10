from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
import time

from tasks.models import TaskList , TaskItem
from tasks.serializers import taskListSerializer , TaskListDetailSerializer , TaskItemSerializer , TaskItemSerializerCreate , TaskItemSerializerDetail
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
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    
class TaskItemViewSet(
    ViewSetGetSerializerClassMixin,
    ModelViewSet
):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskItemSerializer
    serializers_class_per_action = {
        "create" : TaskItemSerializerCreate,
        "retrieve" : TaskItemSerializerDetail,
        "update" : TaskItemSerializerDetail
    }
    
    def get_task_list_pk(self):
        return self.kwargs.get("task_list_pk")
    
    def perform_create(self, serializer):
        task_list = TaskList.objects.get(pk = self.get_task_list_pk())
        return serializer.save(task_list = task_list)
    
    def get_queryset(self):
        time.sleep(2)
        return TaskItem.objects.filter(
            task_list__user = self.request.user,
            task_list__pk = self.get_task_list_pk()
        )
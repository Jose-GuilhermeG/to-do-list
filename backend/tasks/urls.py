from django.urls import path
from rest_framework.routers import SimpleRouter

from tasks.views import TaskListViewSet , TaskItemViewSet

router = SimpleRouter()

router.register(
    prefix='',
    viewset=TaskListViewSet,
    basename="task-list"
)

taskItemList = TaskItemViewSet.as_view({"get" : "list" , "post" : "create"})
taskItemDetail = TaskItemViewSet.as_view({"get" : "retrieve" , "put" : "update"})

urlpatterns = [
    path(
        '<int:task_list_pk>/tasks/',
        view=taskItemList,
        name='task-item-list'
    ),
    path(
        '<int:task_list_pk>/tasks/<int:pk>',
        view=taskItemDetail,
        name='task-item-detail'
    ),
]


urlpatterns += router.urls
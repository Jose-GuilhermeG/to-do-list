from django.urls import path
from rest_framework.routers import SimpleRouter

from tasks.views import TaskListViewSet

router = SimpleRouter()

router.register(
    prefix='',
    viewset=TaskListViewSet,
    basename="task-list"
)

urlpatterns = [
    
]


urlpatterns += router.urls
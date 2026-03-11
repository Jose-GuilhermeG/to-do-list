import pytest
from tasks.models import TaskList


@pytest.mark.django_db
class TestTaskList:
    def test_basic_methods(self , get_task_list : TaskList ):
        assert get_task_list.__str__() == f"{get_task_list.user.username} - {get_task_list.name}"

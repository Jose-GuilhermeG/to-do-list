import pytest
from django.contrib.auth import get_user_model

from tasks.models import TaskList

USER = get_user_model()

@pytest.fixture
def get_user():
    user = USER(
        username = "testUser",
        email="test@email.com"
    )
    
    user.set_password("testPass")
    user.save()
    return user

@pytest.fixture
def get_task_list(get_user):
    return TaskList.objects.create(
        name="test of list",
        description = "",
        user = get_user
    )
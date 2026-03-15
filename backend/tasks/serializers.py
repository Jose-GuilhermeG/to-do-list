from rest_framework import serializers
from tasks.models import TaskItem, TaskList


class TaskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = [ "id","title" , "description" , "status" , "created_at"]

class TaskItemSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = ["id","title" ,"status", "content" , "description"]
        read_only_fields = ["id" ,"status"]

class TaskItemSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = ["id", "title" , "description" , "content" , "status" , "created_at"]
        read_only_fields = ['created_at' , "id"]

class taskListSerializer(
    serializers.ModelSerializer
):

    task_list_url = serializers.HyperlinkedIdentityField(
        view_name = "tasks:task-list-detail",
        lookup_field = "pk"
    )
    class Meta:
        model = TaskList
        fields = ["id" , 'name' , 'description' , 'task_list_url']

class TaskListDetailSerializer(
    serializers.ModelSerializer
):
    items = TaskItemSerializer(many=True , read_only=True)

    class Meta:
        model = TaskList
        fields = ["id" ,'name' , 'description' , 'created_at' , 'items']
        read_only_fields = ['created_at']

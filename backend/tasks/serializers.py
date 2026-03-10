from rest_framework import serializers

from tasks.models import TaskList ,TaskItem

class TaskItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = [ "id","title" , "description" , "status" , "created_at"]
        
class TaskItemSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = ["title" , "content" , "description"]       
        
class TaskItemSerializerDetail(serializers.ModelSerializer):
    class Meta:
        model = TaskItem
        fields = ["title" , "description" , "content" , "status" , "created_at"]
        read_only_fields = ['created_at']

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
        fields = ['name' , 'description' , 'created_at' , 'items']
        read_only_fields = ['created_at']

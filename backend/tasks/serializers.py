from rest_framework import serializers

from tasks.models import TaskList

class taskListSerializer(
    serializers.ModelSerializer
):
    
    task_list_url = serializers.HyperlinkedIdentityField(
        view_name = "tasks:task-list-detail",
        lookup_field = "pk"
    )
    
    class Meta:
        model = TaskList
        fields = ['name' , 'description' , 'task_list_url']
        
class TaskListDetailSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = TaskList
        fields = ['name' , 'description' , 'created_at' ]
        read_only_fields = ['created_at']
        
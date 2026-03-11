from core.admin import BaseAdmin
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from tasks import models

# Register your models here.

@admin.register(models.TaskList)
class TaskListAdmin(BaseAdmin):
    list_display = ['user' , 'name' , 'created_at']
    search_fields = ['name' , 'description']
    list_filter = ['created_at']
    search_help_text = _("Pesquisar pelo nome ou descrição")

@admin.register(models.TaskItem)
class TaskItemAdmin(BaseAdmin):
    list_display = ['title' , 'task_list']
    list_filter = ['created_at']

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

from core.models import BaseModel
from core.constants import MEDIUM_TEXT_LENGTH , LONG_TEXT_LENGTH

USER = get_user_model()

# Create your models here.
class TaskList(
    BaseModel
):
    
    name = models.CharField(
        verbose_name=_("Nome da lista de tarefas"),
        max_length=MEDIUM_TEXT_LENGTH,
        unique=False,
        blank=False,
        null=False,
        db_index=True,
        help_text=_(f"Tak list name , can't be empty and have {MEDIUM_TEXT_LENGTH} length size ")
    )
    
    description = models.CharField(
        verbose_name=_("Descrição da lista de terefas"),
        max_length=LONG_TEXT_LENGTH,
        null=False,
        blank=True,
        help_text=_(f"Task list description , can be empty and have {LONG_TEXT_LENGTH} length size")
    )
    
    user = models.ForeignKey(
        verbose_name=_("Dono da lista de tarefas"),
        to=USER,
        related_name="tasklists",
        on_delete=models.CASCADE,
        null=False,
        help_text=_(f"user onwer of taks list")
    )
    
    def __str__(self):
        return f"{self.user.username} - {self.name}"
    
    class Meta:
        verbose_name = _("Lista de tarefas")
        verbose_name_plural = _("Listas de tarefas")
        db_table = "task_list"
        ordering = ['-created_at']
        
    
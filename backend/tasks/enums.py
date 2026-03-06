from django.db import models
from django.utils.translation import gettext_lazy as _

class TaskStatus(models.TextChoices):
    PENDING = "pending" , _("Pendente")
    IN_PROGRESS = "in_progress" , _("Em andamento")
    COMPLETED = "completed" , _("Concluida")
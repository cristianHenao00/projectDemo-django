from rest_framework import viewsets
from .models import Task
from .serializer import TaskSerializer

# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer

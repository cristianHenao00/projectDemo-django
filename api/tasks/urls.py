from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import TaskViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')


urlpatterns = [
    path('api/', include(router.urls)),
    path('docs/', include_docs_urls(title='Tasks API')),
]

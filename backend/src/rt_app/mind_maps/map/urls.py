from django.urls import path

from .views import *

urlpatterns = [
    path('', MindMapView.as_view())
]

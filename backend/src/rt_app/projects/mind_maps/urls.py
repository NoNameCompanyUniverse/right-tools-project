from django.urls import path

from .views import *

urlpatterns = [
    path('', MindMapView.as_view({'get': 'list', 'post': 'create'}), name='mind-map-list'),
]

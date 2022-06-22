from django.urls import path, include

from .views import *

urlpatterns = [
    path('<int:pk>/', MindMapDetailUpdateDeleteView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('<int:pk>/map/', include('rt_app.mind_maps.map.urls')),
    path('<int:pk>/mind-cards/', include('rt_app.mind_maps.mind_cards.urls')),
]

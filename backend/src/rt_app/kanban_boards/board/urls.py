from django.urls import path

from .views import *

urlpatterns = [
    path('', MindMapView.as_view()),
    path('change_position/', ChangePositionView.as_view()),
    path('connect_cards/', ConnectionView.as_view()),
]

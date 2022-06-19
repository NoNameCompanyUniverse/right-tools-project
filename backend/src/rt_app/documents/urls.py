from django.urls import path

from .views import *

urlpatterns = [
    path('<int:pk>/', DocumentDeleteView.as_view()),
]

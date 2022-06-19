from django.urls import path

from .views import *

urlpatterns = [
    path('info/', ProfileInfoView.as_view()),
    path('projects/', ProfileProjectsView.as_view()),
]

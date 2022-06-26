from django.urls import path

from .views import *

urlpatterns = [
    path('', DocumentView.as_view()),
]

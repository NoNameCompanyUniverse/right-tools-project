from django.urls import path

from .views import *

urlpatterns = [
    path('', PictureView.as_view()),
]

from django.urls import path

from .views import *

urlpatterns = [
    path('', MindCardCreateView.as_view({'post': 'create'}))
]

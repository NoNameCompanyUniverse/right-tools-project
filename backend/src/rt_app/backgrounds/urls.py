from django.urls import path

from .views import *

urlpatterns = [
    path('', BackgroundView.as_view({'get': 'list'})),
]

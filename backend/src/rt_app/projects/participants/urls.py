from django.urls import path

from .views import *

urlpatterns = [
    path('', ParticipantView.as_view(), name='participant-list'),
]

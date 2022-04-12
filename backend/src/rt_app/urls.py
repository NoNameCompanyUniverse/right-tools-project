from django.urls import path, include
from .views import PingView

urlpatterns = [
    path('users/', include('rt_app.users.urls')),
    path('subdivisions/', include('rt_app.subdivisions.urls')),
    path('ping/', PingView.as_view())
]

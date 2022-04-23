from django.urls import path, include
from .views import PingView

urlpatterns = [
    path('users/', include('rt_app.users.urls')),
    path('subdivisions/', include('rt_app.subdivisions.urls')),
    path('backgrounds/', include('rt_app.backgrounds.urls')),
    path('auth/', include('rt_app.auth.urls')),
    path('ping/', PingView.as_view())
]

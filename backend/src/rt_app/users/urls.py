from django.urls import path

from .views import *

urlpatterns = [
    path('me/', CurrentUserView.as_view({'get': 'retrieve'})),
    path('', UserView.as_view({'get': 'list', 'post': 'create'})),
    path('<int:pk>/', UserView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('<int:pk>/staff/', StaffView.as_view()),
    path('<int:pk>/password/', PasswordView.as_view()),
    path('<int:pk>/photo/', PhotoView.as_view()),
    path('<int:pk>/banner/', BannerView.as_view()),
]

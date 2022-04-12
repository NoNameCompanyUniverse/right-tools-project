from django.urls import path
from .views import SubdivisionView

urlpatterns = [
    path('', SubdivisionView.as_view({'get': 'list', 'post': 'create'})),
    path('<int:pk>/', SubdivisionView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
]
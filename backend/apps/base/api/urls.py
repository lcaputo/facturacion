from apps.base import views
from django.urls import path

urlpatterns = [
    path('configuration/', views.ConfigurationView.as_view(), name='configuration'),
]


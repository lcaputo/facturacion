from django.urls import path
from apps.services import views


urlpatterns = [
    path('', views.ListCreateView.as_view(), name='service_list'),
    path('detail/<int:pk>/', views.DetailView.as_view(), name='service_detail'),
    path('update/<int:pk>/', views.UpdateView.as_view(), name="service_update"),
    path('delete/<int:pk>/', views.DeleteView.as_view(), name="service_delete"),
]


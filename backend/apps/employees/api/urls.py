from django.urls import path
from apps.employees import views


urlpatterns = [
    path('', views.ListCreateView.as_view(), name='employee_list'),
    path('detail/<int:pk>/', views.DetailView.as_view(), name='employee_detail'),
    path('update/<int:pk>/', views.UpdateView.as_view(), name="employee_update"),
    path('delete/<int:pk>/', views.DeleteView.as_view(), name="employee_delete"),
]


from django.urls import path
from apps.expenses import views


urlpatterns = [
    path('', views.ListCreateView.as_view(), name='expenses_list'),
    path('expenses/<int:pk>/', views.DetailView.as_view(), name='expenses_detail'),
    path('expenses/<int:pk>/', views.UpdateView.as_view(), name="expenses_update"),
    path('expenses/<int:pk>/', views.DeleteView.as_view(), name="expenses_delete"),
]


from django.urls import path
from apps.bills import views


urlpatterns = [
    path('', views.ListCreateView.as_view(), name='bill_list'),
    path('detail/<int:pk>/', views.DetailView.as_view(), name='bill_detail'),
    path('update/<int:pk>/', views.UpdateView.as_view(), name="bill_update"),
    path('delete/<int:pk>/', views.DeleteView.as_view(), name="bill_delete"),
]


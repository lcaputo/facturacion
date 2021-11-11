from django.urls import path
from apps.products import views


urlpatterns = [
    path('', views.ListCreateView.as_view(), name='product_list'),
    path('detail/<int:pk>/', views.DetailView.as_view(), name='product_detail'),
    path('update/<int:pk>/', views.UpdateView.as_view(), name="product_update"),
    path('delete/<int:pk>/', views.DeleteView.as_view(), name="product_delete"),
    path('supplier/', views.SupplierListCreateView.as_view(), name="product_supplier_list"),
]


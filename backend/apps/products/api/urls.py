from django.urls import path
from apps.products import views


urlpatterns = [
    path('', views.ListCreateView.as_view(), name='product_list'),
    path('detail/<int:pk>/', views.DetailView.as_view(), name='product_detail'),
    path('update/<int:pk>/', views.UpdateView.as_view(), name="product_update"),
    path('delete/<int:pk>/', views.DeleteView.as_view(), name="product_delete"),
    path('category/', views.CategoryListCreateView.as_view(), name="product_category_list"),
    path('category/detail/<int:pk>/', views.CategoryDetailView.as_view(), name="product_category_detail"),
    path('category/update/<int:pk>/', views.CategoryUpdateView.as_view(), name="product_category_update"),
    path('category/delete/<int:pk>/', views.CategoryDeleteView.as_view(), name="product_category_delete"),
    path('supplier/', views.SupplierListCreateView.as_view(), name="product_supplier_list"),
    path('supplier/detail/<int:pk>/', views.SupplierDetailView.as_view(), name="product_supplier_detail"),
    path('supplier/update/<int:pk>/', views.SupplierUpdateView.as_view(), name="product_supplier_update"),
    path('supplier/delete/<int:pk>/', views.SupplierDeleteView.as_view(), name="product_supplier_delete"),
]


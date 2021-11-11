from django.urls import path
from apps.bills import views


urlpatterns = [
    path('list/', views.BillView.as_view(), name='bill_list')
]


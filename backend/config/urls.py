from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
)
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_refresh'),
    path('api/v1/base/', include('apps.base.api.urls'), name='base_api_views'),
    path('api/v1/user/', include('apps.users.api.urls'), name='user_api_views'),
    path('api/v1/employee/', include('apps.employees.api.urls'), name='employee_api_views'),
    path('api/v1/service/', include('apps.services.api.urls'), name='service_api_views'),
    path('api/v1/client/', include('apps.clients.api.urls'), name='client_api_views'),
    path('api/v1/product/', include('apps.products.api.urls'), name='product_api_views'),
    path('api/v1/bill/', include('apps.bills.api.urls'), name='bill_api_views'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


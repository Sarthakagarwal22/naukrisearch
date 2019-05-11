from django.urls import include, path

urlpatterns = [
    path(r'', include('rest_auth.urls')),
    path(r'registration/', include('rest_auth.registration.urls'))
]
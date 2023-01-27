from django.urls import path, include
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter
from . import views

router = SimpleRouter()

router.register('distributions', views.DistributionViewset)
distributions_router = NestedSimpleRouter(router, 'distributions', lookup='distribution')

distributions_router.register('varyants', views.VaryantViewset, basename='varyants')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(distributions_router.urls))
]

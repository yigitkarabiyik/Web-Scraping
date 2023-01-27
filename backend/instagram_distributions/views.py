from rest_framework import viewsets
from .models import Distribution, Varyant
from .serializer import DistributionSerializer, VaryantSerializer
from django.db.models import Count

class DistributionViewset(viewsets.ModelViewSet):
  queryset = Distribution.objects.all()
  serializer_class = DistributionSerializer

  def get_queryset(self):
    print(self.request)
    return Distribution.objects.annotate(
      number_of_varyants=Count('varyant')
    ).order_by('-release_date')

class VaryantViewset(viewsets.ModelViewSet):
  queryset = Varyant.objects.all()
  serializer_class = VaryantSerializer

  def get_queryset(self):
    return Varyant.objects.filter(distribution=self.kwargs['distribution_pk'])

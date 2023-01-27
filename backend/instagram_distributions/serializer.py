from django.db.models import Count
from rest_framework import serializers
from .models import Distribution, Varyant

class DistributionSerializer(serializers.ModelSerializer):
  number_of_varyants = serializers.IntegerField()
  class Meta:
    fields = [
      'id',
      'distribution_id',
      'release_date',
      'number_of_varyants'
      ]
    model = Distribution

class VaryantSerializer(serializers.ModelSerializer):
  class Meta:
    fields = [
      'id',
      'distribution',
      'varyant_id',
      'architecture',
      'min_version',
      'dpi'
    ]
    model = Varyant
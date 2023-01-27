import uuid
from django.db import models


class Distribution(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  distribution_id = models.CharField(max_length=15)
  release_date = models.DateTimeField()

  def __str__(self):
    return self.distribution_id

class Varyant(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  distribution = models.ForeignKey(Distribution, on_delete=models.CASCADE)
  varyant_id = models.CharField(max_length=15)
  architecture = models.CharField(max_length=25)
  min_version = models.CharField(max_length=25)
  dpi = models.CharField(max_length=25)

  def __str__(self):
    return self.varyant_id


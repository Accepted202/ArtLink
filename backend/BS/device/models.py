from enum import unique

from django.db import models

from gallery.models import Gallery


# Create your models here.
class Anchor(models.Model):
    anchorid = models.IntegerField()
    coorx = models.FloatField()
    coory = models.FloatField()
    gallery = models.ForeignKey(Gallery, on_delete = models.CASCADE)
    class Meta:
        db_table = 'anchor'
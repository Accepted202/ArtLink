from django.db import models

# Create your models here.
class Gallery(models.Model):
    galleryid = models.IntegerField(unique = True)

    class Meta:
        db_table = 'gallery'
from django.db import models

class Word(models.Model):
    en = models.CharField(max_length=100)
    wg = models.CharField(max_length=100)

    def _str_(self):
        return self.en

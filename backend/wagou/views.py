from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WordSerializer
from .models import Word

class WordView(viewsets.ModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.all()

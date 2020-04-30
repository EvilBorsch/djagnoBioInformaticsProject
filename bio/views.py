from django.shortcuts import render

# Create your views here.


from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


def IGORMAGIC(file):
    return ['path1', 'path2']


def saveFile(file):
    data = file.read()
    path = default_storage.save('./arch', ContentFile(data))
    return path


class ArticleView(APIView):
    def post(self, request):
        file = request.FILES['photo']
        pathes = IGORMAGIC(file)
        pathToArch = saveFile(file)
        print(pathToArch)

        return Response(pathes)

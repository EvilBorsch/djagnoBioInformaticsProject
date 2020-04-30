# Create your views here.


from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from rest_framework.response import Response
from rest_framework.views import APIView


def IGORMAGIC(file):
    return ['path1', 'path2']


def saveFile(file):
    data = file.read()
    path = default_storage.save('./arch', ContentFile(data))
    return path


class MainView(APIView):
    def post(self, request):
        file = request.FILES['photo']
        pathes = IGORMAGIC(file)
        pathToArch = saveFile(file)
        print(pathToArch)

        return Response(pathes)

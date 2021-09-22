from rest_framework import generics
from .serializers import PostSerializer
from .models import Post

# Create your views here.


class Posts(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class Post(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    
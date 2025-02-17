from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

# View for listing and creating posts
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# View for retrieving, updating, or deleting a single post
class PostRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


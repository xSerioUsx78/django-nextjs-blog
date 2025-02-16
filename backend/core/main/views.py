from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer


@api_view(['GET'])
def post_list_view(request):
    queryset = Post.objects.all()

    serializer = PostSerializer(queryset, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def post_detail_view(request, pk):
    post = get_object_or_404(Post, pk=pk)

    serializer = PostSerializer(post)

    return Response(serializer.data)


@api_view(['POST'])
def post_create_view(request):
    serializer = PostSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT', 'PATCH'])
def post_update_view(request, pk):
    post = get_object_or_404(Post, pk=pk)

    partial = request.method == 'PATCH'
    serializer = PostSerializer(
        post,
        data=request.data,
        partial=partial
    )

    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def post_delete_view(request, pk):
    Post.objects.filter(pk=pk).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

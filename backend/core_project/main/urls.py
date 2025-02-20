from django.urls import path
from .views import PostListCreateView, PostRetrieveUpdateDeleteView

urlpatterns = [
    path("api/posts/", PostListCreateView.as_view(), name="post-list"),  
    path("api/posts/<int:pk>/", PostRetrieveUpdateDeleteView.as_view(), name="post-detail"),
]

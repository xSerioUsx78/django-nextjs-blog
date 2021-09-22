from django.urls import path
from .views import Posts, Post


urlpatterns = [
    path('', Posts.as_view()),
    path('<pk>/', Post.as_view())
]
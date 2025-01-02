from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.get_posts),
    path('posts/<int:pk>/', views.get_post),
    path('posts/create/', views.create_post),
    path('posts/update/<int:pk>/', views.update_post),
    path('posts/delete/<int:pk>/', views.delete_post),
]

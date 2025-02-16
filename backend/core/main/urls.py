from django.urls import path
from . import views

urlpatterns = [
    path('post/', views.post_list_view),
    path('post/<int:pk>/', views.post_detail_view),
    path('post/create/', views.post_create_view),
    path('post/update/<int:pk>/', views.post_update_view),
    path('post/delete/<int:pk>/', views.post_delete_view),
]

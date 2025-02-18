from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'id')  # Display these fields in the list view
    search_fields = ('title', 'content')  # Add search functionality for these fields
    list_filter = ('title',)  # Allow filtering by title


admin.site.register(Post, PostAdmin)

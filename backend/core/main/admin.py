from django.contrib import admin
from .models import Post

# Register your models here.
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'id')  # Fields to display in the admin list
    search_fields = ('title', 'content')  # Fields that can be searched
    list_filter = ('title',)  # Optional: allows filtering based on 'title' field

# Register the Post model with the custom admin interface
admin.site.register(Post, PostAdmin)

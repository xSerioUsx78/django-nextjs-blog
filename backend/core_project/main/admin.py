from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'id')
    search_fields = ('title', 'content')
    list_filter = ('title',)


admin.site.register(Post, PostAdmin)

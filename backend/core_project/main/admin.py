from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'id')
    search_fields = ('title', 'content')
    list_filter = ('title',)
    ordering = ('-id',)
    list_per_page = 20
    fieldsets = (
        (None, {
            'fields': ('title', 'content')
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': ('id',),
        }),
    )

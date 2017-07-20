from django.contrib import admin
from .models import Category, Product, Images
# Register your models here.

class CatagoryAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug']
	prepopulated_fields= {'slug':('name',)}

admin.site.register(Category, CatagoryAdmin)

class ImagesInline(admin.TabularInline):
	model = Images
	raw_id_fields = ['product']


class ProductAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug','price','stock','available','created','updated']
	list_filter = ['available','created','updated']
	prepopulated_fields= {'slug':('name',)}
	inlines = [ImagesInline]

admin.site.register(Product,ProductAdmin)

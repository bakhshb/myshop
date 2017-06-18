from django.contrib import admin
from .models import Catalogue, Product, Images
# Register your models here.

class CatalogueAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug']
	prepopulated_fields= {'slug':('name',)}

admin.site.register(Catalogue,CatalogueAdmin)

class ImagesInline(admin.TabularInline):
	model = Images
	raw_id_fields = ['product']


class ProductAdmin(admin.ModelAdmin):
	list_display = ['name', 'slug','price','stock','available','created','updated']
	list_filter = ['available','created','updated', 'catalogue']
	prepopulated_fields= {'slug':('name',)}
	inlines = [ImagesInline]

admin.site.register(Product,ProductAdmin)

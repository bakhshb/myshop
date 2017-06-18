from django.contrib import admin

from .models import Coupon
# Register your models here.

class CouponAdmin (admin.ModelAdmin):
	list_display = ['code', 'valid_from','valid_to','discount','active']
	list_filter= ['code', 'valid_from','valid_to']
	search_fileds=['code']
admin.site.register(Coupon,CouponAdmin)


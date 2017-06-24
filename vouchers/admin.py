from django.contrib import admin
from .models import Voucher

# Register your models here.

class VoucherAdmin (admin.ModelAdmin):
	list_display = ['order_item', 'code','valid_till']

admin.site.register(Voucher, VoucherAdmin)
from django.contrib import admin

from .models import Order, OrderItem
from vouchers.models import Voucher 
# Register your models here.


class OrderItemInline(admin.TabularInline):
	model = OrderItem
	raw_id_fields = ['product']


class OrderAdmin(admin.ModelAdmin):
	list_display = ['first_name', 'last_name','email','address','post_code','city','created','updated','paid']
	list_filter = ['paid', 'created', 'updated']
	inlines = [OrderItemInline]


admin.site.register(Order,OrderAdmin)

class VoucherInline(admin.StackedInline):
	model = Voucher
	raw_id_fields = ['order_item']
	max_num = 1

class OrderItemAdmin (admin.ModelAdmin):
	list_display = ['order', 'product','price','quantity']
	list_filter = ['order', 'product']
	search_fields=['order',]
	inlines =[VoucherInline]

admin.site.register(OrderItem,OrderItemAdmin)



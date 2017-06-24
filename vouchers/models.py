from django.db import models
from orders.models import OrderItem
# Create your models here.
class Voucher (models.Model):
	order_item = models.ForeignKey(OrderItem, related_name="vouchers")
	code = models.CharField(max_length=50)
	secret_code = models.CharField(max_length=50)
	valid_till = models.DateTimeField ()


	def __str__(self):
		return self.code

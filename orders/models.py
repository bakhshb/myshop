from django.db import models
from catalogues.models import Product
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator, MinLengthValidator
from coupons.models import Coupon
# Create your models here.
class Order(models.Model):
	first_name = models.CharField(max_length=50, validators=[MinLengthValidator(3)])
	last_name = models.CharField(max_length=50, validators=[MinLengthValidator(3)])
	email = models.EmailField()
	address = models.CharField(max_length=50)
	post_code = models.CharField(max_length=20)
	city = models.CharField(max_length=50)
	created = models.DateTimeField (auto_now_add=True)
	updated = models.DateTimeField (auto_now=True)
	paid = models.BooleanField(default=False)
	coupon = models.ForeignKey(Coupon, related_name='orders', null=True, blank= True)
	discount = models.IntegerField(default=0,validators=[MinValueValidator(0), MaxValueValidator(100)])
	class Meta:
		ordering = ('-created',)

	def __str__(self):
		return 'order {}'.format(self.id)

	def get_total_cost (self):
		total_cost= sum(item.get_cost() for item in self.items.all())
		return total_cost - total_cost * (self.discount / Decimal('100'))

class OrderItem (models.Model):
	order = models.ForeignKey(Order, related_name='items')
	product = models.ForeignKey(Product, related_name='order_items')
	price = models.DecimalField(max_digits=10, decimal_places=2)
	quantity = models.PositiveIntegerField(default=1)

	def __str__(self):
		return '{}'.format(self.id)

	def get_cost (self):
		return self.price * self.quantity

	def save(self,*args,**kwargs):
		super(OrderItem,self).save(*args,**kwargs)
		if self.product.is_coupon:
			from vouchers.models import Voucher
			from random import randint
			import datetime

			voucher = Voucher(order_item=self, code= str(randint(100,999)),
						secret_code=str(randint(100,999)),
						 valid_till = datetime.datetime.now())
			voucher.save()
		


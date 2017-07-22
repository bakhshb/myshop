from django.db import models
from django.core.urlresolvers import reverse
from django.template.defaultfilters import slugify
import datetime



class Category (models.Model):
	name = models.CharField(max_length=200, db_index= True)
	slug = models.SlugField(max_length=200, db_index= True, unique=True)

	class Meta:
		ordering= ('name',)


	def __str__(self):
		return self.name

	def get_absolute_url (self):
		return reverse('shop:product_list_by_catalouge', args=[self.slug])
	
	def save(self, *args, **kwargs):
		if not self.id:
			self.slug = slugify(self.name)

		super(Category, self).save(*args, **kwargs)

class Product (models.Model):
	Category = models.ForeignKey(Category, related_name='products')
	name = models.CharField(max_length=200, db_index= True)
	slug = models.SlugField(max_length=200, db_index= True)
	image = models.ImageField(upload_to='product/%Y/%m/%d', blank=True,verbose_name='Image')
	description = models.TextField(blank=True)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	stock = models.PositiveIntegerField()
	available =models.BooleanField(default=True)
	is_coupon= models.BooleanField(default=True)
	created = models.DateTimeField (auto_now_add=True)
	updated = models.DateTimeField (auto_now=True)

	class Meta:
		ordering = ('-created',)
		index_together = (('id','slug'),)

	def __str__(self):
		return self.name

	def get_absolute_url (self):
		return reverse('shop:product_detail', args=[self.id,self.slug])

	# def save(self, *args, **kwargs):
	# 	from coupons.models import Coupon
	# 	from random import randint

	# 	if not self.id:
	# 		self.slug = slugify(self.name)
	# 	super(Product, self).save(*args, **kwargs) 
	# 	if self.is_coupon:
	# 		for x in range(self.stock):
	# 			b = Coupon(product=self, code= str(randint(100,999)), valid_from = datetime.datetime.now(), valid_to=datetime.datetime.now())
	# 			b.save()

class Images(models.Model):
	product = models.ForeignKey(Product, default=None, related_name='images')
	image = models.ImageField(upload_to='product/%Y/%m/%d', blank=True,verbose_name='Image')
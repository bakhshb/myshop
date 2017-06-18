from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

class Coupon (models.Model):
	code = models.CharField(max_length=200, db_index= True, default="Hello")
	valid_from = models.DateTimeField()
	valid_to = models.DateTimeField()
	discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
	active = models.BooleanField()
	created = models.DateTimeField (auto_now_add=True)
	updated = models.DateTimeField (auto_now=True)


	def __str__(self):
		return self.code
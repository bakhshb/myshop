from django import forms
from catalogues.models import Product 
from django.shortcuts import render
from cart.cart import Cart 
import json


PRODUCT_QUNATITY_CHOICES=[(i,str(i)) for i in range(1,21)]

class CartAddProductForm (forms.Form):
	# quantity = forms.TypedChoiceField(choices=PRODUCT_QUNATITY_CHOICES, coerce=int)
	quantity = forms.TypedChoiceField(choices=PRODUCT_QUNATITY_CHOICES, coerce=int)
	update = forms.BooleanField(required=False,initial=False,widget=forms.HiddenInput)

	def __init__ (self, *args,**kwargs):
		super(CartAddProductForm,self).__init__(*args)
		widget = kwargs.pop('widget', None)	
		if widget is not None:
			if widget:
				self.fields['quantity']= forms.TypedChoiceField(choices=PRODUCT_QUNATITY_CHOICES,initial='1', coerce=int)
			else:
				self.fields['quantity']= forms.TypedChoiceField(choices=PRODUCT_QUNATITY_CHOICES, initial='1',coerce=int, widget=forms.HiddenInput)			
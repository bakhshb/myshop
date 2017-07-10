from django import forms
from catalogues.models import Product 
from django.shortcuts import render
from cart.cart import Cart 
import json


class CartAddProductForm (forms.Form):
	qunatity = forms.CharField(max_length=1,widget=forms.TextInput(attrs={'size':5}))
	
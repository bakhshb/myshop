from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from catalogues.models import Product
from .forms import CartAddProductForm
from .cart import Cart 
from coupons.forms import CouponApplyForm
from catalogues.recommender import Recommender

from django.http import HttpResponse, JsonResponse
from django.contrib import messages
import json
from decimal import Decimal


def cart_detail (request):
	cart= Cart(request)
	if cart:
		for item in cart:
			item['update_quantity_form'] = CartAddProductForm(initial={'qunatity':item['quantity'],
																		'update':True},
																		widget= True)
		coupon_apply_form = CouponApplyForm()
		
		r = Recommender()
		cart_products = [item['product'] for item in cart]
		if cart_products:
			recommended_products = r.suggest_products_for (cart_products,4)
			return render(request,'cart/detail.html',{'cart':cart,
													'coupon_apply_form':coupon_apply_form,
													'recommended_products':recommended_products})
		else:
			return render(request,'cart/detail.html',{'cart':cart,
													'coupon_apply_form':coupon_apply_form})
	else:
		return redirect ('shop:product_list')


def cart_add (request, product_id):
	cart = Cart(request)
	if request.is_ajax and request.method == 'POST':
		product = get_object_or_404(Product, id = product_id)
		form = CartAddProductForm(request.POST)
		if form.is_valid():
			cd = form.cleaned_data
			
			cart.add(product = product,
						quantity= cd['quantity'],
						update_quantity=cd['update'])
			# messages.success(request,"It was added to the cart")
			data = {
			'message': 'It was added to the cart',
			'status': 'true'
			}
		
		return JsonResponse(data)

def cart_update(request, product_id):
	cart = Cart(request)
	if request.method == 'POST':
		product = get_object_or_404(Product, id = product_id)
		form = CartAddProductForm(request.POST)
		data = {}
		if form.is_valid():
			cd = form.cleaned_data
			cart.add(product = product,
						quantity= cd['quantity'],
						update_quantity=cd['update'])
			messages.success(request,"It was added to the cart")
		
		return redirect ('cart:cart_detail')

def cart_remove (request, product_id):
	cart= Cart(request)
	product = get_object_or_404(Product, id = product_id)
	cart.remove(product)
	return redirect('cart:cart_detail')

def cart_session (request):
	cart= Cart(request)
	data = {
		'qunatity': len(cart),
		'price': str(cart.get_total_price())
	}
	return HttpResponse (json.dumps(data))

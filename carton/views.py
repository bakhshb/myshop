from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from catalogues.models import Product
from catalogues.recommender import Recommender
from coupons.forms import CouponApplyForm
from .forms import CartAddProductForm
from .cart import Cart 
import json


def cart_detail (request):
	cart= Cart(request.session)
	if cart.count > 0:
		coupon_apply_form = CouponApplyForm()
		form = CartAddProductForm()
		r = Recommender()
		cart_products = cart.products
		if cart_products:
			recommended_products = r.suggest_products_for (cart_products,4)
			return render(request,'cart/detail.html',{'form': form,'coupon_apply_form':coupon_apply_form,
													'recommended_products':recommended_products})
		else:
			return render(request,'cart/detail.html',{'cart':cart,
													'coupon_apply_form':coupon_apply_form})
	else:
		return redirect ('shop:product_list')


def cart_add (request, product_id):
	cart = Cart(request.session)
	if request.is_ajax and request.method == 'POST':
		product = get_object_or_404(Product, id = product_id)
		cart.add(product, price=product.price)
		data = {
		'message': 'It was added to the cart',
		'status': 'true'
		}
		
		return JsonResponse(data)


def cart_update(request, product_id):
	cart = Cart(request.session)
	if request.method == 'POST':
		product = get_object_or_404(Product, id = product_id)
		form = CartAddProductForm(request.POST)
		if form.is_valid():
			cd = form.cleaned_data
			cart.set_quantity(product, quantity= cd['qunatity'])
			messages.success(request,"It was added to the cart")
		
		return redirect ('cart:cart_detail')

def cart_remove (request, product_id):
	cart= Cart(request.session)
	product = get_object_or_404(Product, id = product_id)
	cart.remove(product)
	return redirect('cart:cart_detail')

def cart_session (request):
	cart= Cart(request.session)
	data = {
		'quantity': cart.count,
		'price': str(cart.total)
	}
	return HttpResponse (json.dumps(data))

def cart_quantity(request, product_id):
	cart= Cart(request.session)
	product = get_object_or_404(Product, id = product_id)
	data ={
		'quantity':False
	}
	if product in cart:
		for item in cart.items:
			data={
				'quantity': item.quantity,
			}
		

	return HttpResponse (json.dumps(data))
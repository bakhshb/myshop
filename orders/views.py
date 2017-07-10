from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.views import View
from .forms import OrderCreateForm
from .models import Order, OrderItem
from cart.cart import Cart
from catalogues.models import Product

class OrderCreate (View):
	def dispatch(self, request, *args, **kwargs):
		self.cart = Cart(request)
		return super(OrderCreate, self).dispatch(request, *args, **kwargs)

	def get (self, request, *args, **kwargs):
		form = OrderCreateForm()
		return render(request,'orders/order_form.html', {'cart': self.cart,'form':form})

	def post (self, request, *args, **kwargs):
		form = OrderCreateForm(request.POST)
		if form.is_valid():
			order = form.save(commit=False)
			if self.cart.coupon():
				order.coupon = self.cart.coupon()
				order.discount = self.cart.coupon().discount
			order.save() 

			for item in self.cart:
				OrderItem.objects.create(order=order, product=item['product'],price=item['price'],
											quantity=item['quantity'])
				product_ = Product.objects.get(pk=item['product'].id)
				product_.stock -= item['quantity']
				product_.save()

			self.cart.clear()
			request.session['order_id'] = order.id

			return redirect(reverse('payment:process'))
		else:
			return render(request, 'orders/order_form.html', {'form':form})

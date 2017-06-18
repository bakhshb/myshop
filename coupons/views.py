from django.shortcuts import render, redirect
from django.views import View
from .models import Coupon
from .forms import CouponApplyForm
# Create your views here.
from django.utils import timezone

class CouponApply (View):
	def post (self, request, *args, **kwargs):
		now = timezone.now()
		form = CouponApplyForm(request.POST)
		if form.is_valid():
			code = form.cleaned_data['code']
			try:
				coupon = Coupon.objects.get (code__iexact=code)
				request.session['coupon_id']= coupon.id 
			except Coupon.DoesNotExist:
				request.session['coupon_id'] = None
		return 	redirect('cart:cart_detail')
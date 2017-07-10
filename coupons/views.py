from django.shortcuts import render, redirect
from django.views import View
from .models import Coupon
from .forms import CouponApplyForm
# Create your views here.
from django.utils import timezone
from django.contrib import messages

class CouponApply (View):
	def post (self, request, *args, **kwargs):
		now = timezone.now()
		form = CouponApplyForm(request.POST)
		if form.is_valid():
			code = form.cleaned_data['code']
			try:
				coupon = Coupon.objects.get (code__iexact=code,
												valid_to__gte=now,
												valid_from__lte=now)
				request.session['coupon_id']= coupon.id 
			except Coupon.DoesNotExist:
				request.session['coupon_id'] = None
				messages.error(request,"The coupon must be expired or not exist")

		return 	redirect('cart:cart_detail')
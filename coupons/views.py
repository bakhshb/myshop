from django.shortcuts import render, redirect
from django.views import View
from .models import Coupon
from .forms import CouponApplyForm
# Create your views here.
from django.utils import timezone
from django.contrib import messages
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


@method_decorator(csrf_exempt, name='dispatch')
class CouponApply (View):
	def post (self, request, *args, **kwargs):
		now = timezone.now()
		print(request.POST)
		form = CouponApplyForm(request.POST)
		if form.is_valid():
			code = form.cleaned_data['code']
			print('code')
			try:
				coupon = Coupon.objects.get (code__iexact=code,
												valid_to__gte=now,
												valid_from__lte=now)
				data ={
					'status': 200,
					'discount': coupon.discount,
					'code': coupon.code,
					'message': 'Coupon Applied'
				}
				request.session['coupon_id']= coupon.id 
			except Coupon.DoesNotExist:
				request.session['coupon_id'] = None
				data = {
				'status': 302,
				'message': 'The coupon must be expired or not exist'
				}
				messages.error(request,"The coupon must be expired or not exist")

		# return 	redirect('cart:cart_detail')
		return JsonResponse(data)
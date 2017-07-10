from django.shortcuts import render, redirect, get_object_or_404
from django.views import View 
from django.core.urlresolvers import reverse
from django.conf import settings
from paypal.standard.forms import PayPalPaymentsForm
from orders.models import Order, OrderItem
from catalogues.models import Images
from decimal import Decimal
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def payment_done (request):
	order_id= request.session.get('order_id')
	if order_id:
		order = get_object_or_404(Order,id=order_id)
		order.paid=True
		order.save()
		context={
			'order':order
			}
		# request.session['order_id']={}
		return render(request, 'payment/done.html', context)
	else:
		return redirect(reverse('shop:product_list'))
 
@csrf_exempt
def payment_canceled (request):
	return render(request, 'payment/canceled.html')
 

def payment_process(request):
	order_id= request.session.get('order_id')
	order = get_object_or_404(Order,id=order_id)
	host = request.get_host()

	paypal_dict = {
	'business': settings.PAYPAL_RECEIVER_EMAIL,
	'amount': '%.2f' % order.get_total_cost().quantize(Decimal('.01')),
	'item_name': 'Order {}'.format(order.id),
	'invoice': str(order.id),
	'country_code': 'NZD',
	'notify_url':'http://{}{}'.format(host, reverse('paypal-ipn')),
	'return_url': 'http://{}{}'.format(host, reverse('payment:done')),
	'cancel_return': 'http://{}{}'.format(host, reverse('payment:canceled')),
	}

	form = PayPalPaymentsForm(initial=paypal_dict)
	context = {'order':order,'form': form}
	return render(request, 'payment/process.html', context)



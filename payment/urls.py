from django.conf.urls import url
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    url(r'^process/$', views.PaymentProcess.as_view(), name='process'),
    url(r'^done/$', views.payment_done, name='done'),
    url(r'^canceled/$', csrf_exempt(TemplateView.as_view(template_name='payment/canceled.html')), name='canceled'),
    # url(r'^canceled/$', views.payment_canceled, name='canceled'),

]
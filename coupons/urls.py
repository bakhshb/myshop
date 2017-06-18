from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^apply/$', views.CouponApply.as_view(), name='coupon_apply'),
]
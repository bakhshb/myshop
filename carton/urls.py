from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.cart_detail, name='cart_detail'),
    url(r'^add/(?P<product_id>[0-9]+)/$', views.cart_add, name='cart_add'),
    url(r'^update/(?P<product_id>[0-9]+)/$', views.cart_update, name='cart_update'),
    url(r'^remove/(?P<product_id>[0-9]+)/$', views.cart_remove, name='cart_remove'),
    url(r'^session/$', views.cart_session, name='cart_session'),
    url(r'^quantity/(?P<product_id>[0-9]+)/$', views.cart_quantity, name='cart_quantity'),
]
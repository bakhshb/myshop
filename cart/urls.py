from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.CartDetail.as_view(), name='cart_detail'),
    # url(r'^add/(?P<product_id>[0-9]+)/$', views.CartAdd.as_view(), name='cart_add'),
    url(r'^remove/(?P<product_id>[0-9]+)/$', views.CartRemove.as_view(), name='cart_remove'),
    url(r'^session/$', views.cart_session, name='cart_session'),
    url(r'^add/(?P<product_id>[0-9]+)/$', views.cart_add, name='cart_add'),

]
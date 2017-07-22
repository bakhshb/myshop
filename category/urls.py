from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.ProductList.as_view(), name='product_list'),
    url(r'^product/(?P<id>[0-9]+)/(?P<slug>[-\w]+)/$', views.ProductDetail.as_view(), name='product_detail'),
]
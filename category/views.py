from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Category, Product, Images
from .recommender import Recommender



class ProductList (ListView):
	model = Product


class ProductDetail (DetailView):
	model = Product
	slug = None
	def get_queryset(self, **kwargs):
		slug = self.kwargs['slug']
		id_ = self.kwargs['id']
		return Product.objects.filter(id=id_, slug=slug)

	def get_context_data(self, **kwargs):
		# Call the base implementation first to get a context
		context = super(ProductDetail, self).get_context_data(**kwargs)
		# Add in a QuerySet of all the books
		#Recommended Product
		r = Recommender()
		recommended_products = r.suggest_products_for ([self.object],4)
		context['recommended_products'] = recommended_products
		# context['range'] = range(0, self.object.stock)

		return context 

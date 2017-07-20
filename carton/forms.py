from django import forms

class CartAddProductForm (forms.Form):
	quantity = forms.CharField(max_length=1,widget=forms.TextInput(attrs={'size':5}))
	
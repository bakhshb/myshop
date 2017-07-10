import React from 'react';
import ReactDom from 'react-dom';

import $ from 'jquery';
import axios from 'axios';

var carousel = require('./carousel');

var Cart = require('./cart');
//RENDER CART TO DOM
var cart_bar = ReactDom.render(<Cart/>, document.getElementById('cart'));

$(function(){
	var stock = $('#cart-form').data('stock');
	if (stock <0){
      $('input[type="submit"]').attr('disabled','disabled');
      return false;
    }
    console.log('baraa');


	$('#cart-form').on('click',function(e){
		e.preventDefault();
		var id = $('#cart-form').data('id');
		
		//Check Qunatity
		getQuantity(id, function(current_quantity){
			if (stock <= current_quantity){
	        $('input[type="submit"]').attr('disabled','disabled');
	        return false;
			}
		})

		var url = '/cart/add/'+id+'/';
		axios.defaults.xsrfCookieName = 'csrftoken';
		axios.defaults.xsrfHeaderName = 'X-CSRFToken';
		axios.post(url,{
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
		}).then(function(response){
			if (response.status){
					addAlert(response.data.message, 'alert-success');
				}
				cart_bar.componentDidMount();
		});// END OF AXIOS
	}); //END OF BUTTON

});


// Prevent Users to add more than Stock
function getQuantity (id, callback){
	axios.get('/cart/quantity/'+id).then(function (response) {
		callback(response.data.quantity);
  	});
}


//Push Messages
function addAlert(message, status) {
  $('#alerts').append(
      '<div class="alert '+ status+'">' +
          '<button type="button" class="close" data-dismiss="alert">' +
          '&times;</button>' + message + '</div>').fadeIn();

  setTimeout(function() {
    $('#alerts').fadeOut();
    $('.alert').remove();
  },5000);
}
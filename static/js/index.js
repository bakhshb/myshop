import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

var CartBar = require('./cart-bar');


//RENDER CART TO DOM
ReactDom.render(<CartBar/>, document.getElementById('cart'));


if (window.location.pathname === '/'){
    var FilterableProduct = require('./product-list');
    ReactDom.render(<FilterableProduct data={product_json} />, document.getElementById('product'));
}

if(window.location.pathname.includes('/product/')){
    require('./product-details');
}

if(window.location.pathname === '/cart/'){
    var CartDetail = require('./cart-details');
    ReactDom.render(<CartDetail data={cart_json} />, document.getElementById('cart-details'));
}
var carousel = require('./carousel');

import React from 'react';
import ReactDom from 'react-dom';
var Cart = require('./cart');
//RENDER CART TO DOM
ReactDom.render(<Cart/>, document.getElementById('cart'))
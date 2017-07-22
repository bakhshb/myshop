import React from 'react'
import axios from 'axios'
import $ from 'jquery'

function Items(props){
  if (props.quantity <= 0){
    return (
    <a href="#"> 
    <span className="glyphicon glyphicon-shopping-cart"></span> Your cart is empty</a>
    );
  }else{
    if (props.quantity <= 1){
      return(
      <a href="/cart/"><span className="glyphicon glyphicon-shopping-cart"></span> {props.quantity} item, ${props.price}</a>
      );
    }else{
      return(
      <a href="/cart/"><span className="glyphicon glyphicon-shopping-cart"></span> {props.quantity} items, ${props.price}</a>
      );
    }
  }
	
}

class CartBar extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            price: '',
          totalDiscount: ''};

        this.updateCart = this.updateCart.bind(this);
        $(document).bind('update.cart', this.updateCart);

  	}

  	componentDidMount(){
  	    this.updateCart();
  	 }


    updateCart(event){
    axios.get('/cart/session/').then(function (response) {

        this.setState({
          price: response.data.price,
          quantity: response.data.quantity,
          totalDiscount: response.data.totalDiscount,
        });
        this.forceUpdate();

      }.bind(this));
    }

  	render() {
      var total = this.state.totalDiscount?this.state.totalDiscount:this.state.price
      return (
          <Items quantity={this.state.quantity} price= {total}/>
      );
   	}
}

module.exports = CartBar
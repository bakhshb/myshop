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

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	quantity: '',
    	price: '',
      current_quantity: ''};
  	}

  	componentDidMount(){
  		var _this = this
      this.getCart();
  	 }


    getCart(){
      var _this = this
    axios.get('/cart/session/').then(function (response) {
        _this.setState({
          price: response.data.price,
          quantity: response.data.quantity
        });
      });
    }

  	render() {
      return (
          <Items quantity={this.state.quantity} price= {this.state.price}/>
      );
   	}
}

module.exports = App
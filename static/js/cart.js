import React from 'react'
import axios from 'axios'
import $ from 'jquery'

function Items(props){
  if (props.qunatity <= 0){
    return (
    <a href="#"> 
    <span className="glyphicon glyphicon-shopping-cart"></span> Your cart is empty</a>
    );
  }else{
    if (props.qunatity <= 1){
      return(
      <a href="/cart/"><span className="glyphicon glyphicon-shopping-cart"></span> {props.qunatity} item, ${props.price}</a>
      );
    }else{
      return(
      <a href="/cart/"><span className="glyphicon glyphicon-shopping-cart"></span> {props.qunatity} items, ${props.price}</a>
      );
    }
  }
	
}

class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	qunatity: '',
    	price: ''};
  	}

  	componentDidMount(){
  		var _this = this
      this.getdata();
      $(document).ready(function() {
        $('#cart-form').submit(function(e){
          e.preventDefault();
          var id = $('#cart-form').data('id');
          $.ajax({
              url: '/cart/add/'+id+'/',
              type:'POST',
              data:{
                  csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                  quantity: $('#id_quantity').val(),
                  update: false,
              },
              success: function(response){
                  _this.getdata();
              }
            });//END OF AJAX
         });
       }); //END OF JQUERY
  	 }


    getdata(){
      var _this = this
    axios.get('/cart/session/').then(function (response) {
        _this.setState({
          price: response.data.price,
          qunatity: response.data.qunatity
        });
      });
    }
  	

  	render() {
      return (
          <Items qunatity={this.state.qunatity} price= {this.state.price}/>
         // <div>
         // <Items qunatity={this.state.qunatity} price= {this.state.price}/>
         // </div>
      );
   	}
}

module.exports = App
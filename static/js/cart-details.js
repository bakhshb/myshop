import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class QuantityForm extends React.Component{

    constructor(props) {
    super(props);
    this.state = {value: this.props.quantity};
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleQtySubmit = this.handleQtySubmit.bind(this);
    }

    handleQtyChange(event){
        this.setState({value: event.target.value});
    }

    handleQtySubmit(event){
        event.preventDefault();
        var url = '/cart/update/'+this.props.productPK+'/';
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        $.ajax({
            url: url,
            type: 'POST',
            data:{
                csrfmiddlewaretoken: csrftoken,
                quantity: this.state.value,
            },
            success:function(response){
                addAlert(response.message,'alert-success');
                $(document).trigger('update.cart','');
                $(document).trigger('update.total','');
                this.props.onUserInput(this.state.value);
            }.bind(this)
        }, this);
    }
    render(){
        return(
            <form className="form-inline" onSubmit={this.handleQtySubmit}>
            <input type="number" className="form-control text-center"  id="id_quantity" value={this.state.value} onChange={this.handleQtyChange} size='5' maxLength='1' style={{'width':'50px'}}/>
            <button type="submit" className="btn btn-primary btn-sm" value="Update"><span className="glyphicon glyphicon-refresh"></span></button>
            </form>
        );
    }

}

class CouponForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: '', 
        };
        this.handleCouponSubmit = this.handleCouponSubmit.bind(this);
        this.handleCouponChange = this.handleCouponChange.bind(this);
    }

    handleCouponChange(event){
        this.setState({value: event.target.value});
    }

    handleCouponSubmit(event){
        event.preventDefault();
        var url = '/coupons/apply/';
        // var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        $.ajax({
            url: url,
            type: 'POST',
            data:{
                // csrfmiddlewaretoken: csrftoken,
                code: this.state.value,
            },
            success:function(response){
                if (response.status === 200){
                    addAlert(response.message, 'alert-success');
                    $(document).trigger('update.total','');
                }else{
                    addAlert(response.message, 'alert-danger');
                }
                
                
            }.bind(this)
        }, this);
    }

    render(){
        return( 
            <form method="POST" className="form-inline" onSubmit={this.handleCouponSubmit} >
            <input type="text" className="form-control" onChange= {this.handleCouponChange} />
            <button type="submit"  className="btn btn-primary btn-sm">Apply</button>
            </form>);
    }
}


class ProductRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            quantity: this.props.data.quantity,
            subtotal : this.props.data.quantity * this.props.data.price
        }
        this.handleInput= this.handleInput.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

    }
    handleInput(quantity){
        this.setState({quantity: quantity});
        this.setState({'subtotal': quantity * this.props.data.price });
        if (quantity <=0){
            window.location.href="/cart/remove/"+ this.props.data.product.pk +"/";
        }
        
    }

    handleRemove(event){
        window.location.href="/cart/remove/"+ this.props.data.product.pk +"/";
    }
    render(){
    var product = this.props.data
    const divStyle = {
      hight:'72 px', // note the capital 'W' here
      width:'72 px' // 'ms' is the only lowercase vendor prefix
    };
    return (
        <tr>
        <td className="col-sm-8 col-md-6">
        <div className="media">
        <a className="thumbnail pull-left" href="#"> <img className="media-object" src={product.product.image} style={divStyle}/> 
        </a>
        <div className="media-body">
        <h4 className="media-heading"><a href="#">{product.product.name}</a></h4>
        </div>
        </div>
        </td>
        <td className="col-sm-1 col-md-1" style={{"textAlign": "center"}}>
        <QuantityForm productPK= {product.product.pk} onUserInput={this.handleInput} quantity={this.state.quantity}/>
        </td>
        <td className="col-sm-1 col-md-1 text-center"><strong>${product.price}</strong></td>
        <td className="col-sm-1 col-md-1 text-center"><strong>${this.state.subtotal}</strong></td>
        <td className="col-sm-1 col-md-1">
        <button type="button" className="btn btn-danger" onClick={this.handleRemove}>
        <span className="glyphicon glyphicon-remove"></span> Remove
        </button></td>
        </tr>
    );
    }
}


class ProductTable extends React.Component {

    constructor(props){
        super(props);
        this.state={
            total: '',
            totalDiscount:'',
        }
        this.updateTotal = this.updateTotal.bind(this);
        $(document).bind('update.total', this.updateTotal);
    }
    componentDidMount(){
        this.updateTotal();
        
    }

    updateTotal(event){
    axios.get('/cart/session/').then(function (response) {

        this.setState({
          total: response.data.price,
          totalDiscount: response.data.totalDiscount,
        });
        this.forceUpdate();

      }.bind(this) );

       
    }


    render(){
    var rows = [];
    this.props.data.map(function(product){
        rows.push(<ProductRow data={product} key={product.product.pk} />);        
    }, this);

    var discount = (
        <tr>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td><h3>Total</h3></td>
        <td className="text-right"><h3><strong>${this.state.totalDiscount}</strong></h3></td>
        </tr>
        );
    var empty= (
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <a href="/" className="btn btn-default"><span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping</a>
        </td>
        <td>
        <a href="/orders/create" className="btn btn-success"><span className="glyphicon glyphicon-play"></span> Checkout</a>
        </td>
        </tr>
        )
    return(
        <div className="row">
        <div className="col-sm-12 col-md-10 col-md-offset-1">
        <table className="table table-hover">
        <thead>
        <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th className="text-center">Price</th>
        <th className="text-center">Total</th>
        <th> </th>
        </tr>
        </thead>
        <tbody>
        {rows}

        <tr>
        <td><CouponForm/> </td>
        <td></td>
        <td></td>
        <td><h5>{this.state.discount? 'Total': 'Subtotal'}</h5></td>
        <td className="text-right"><h5><strong>${this.state.total}</strong></h5></td>
        </tr>
        {this.state.totalDiscount? discount: empty}
        {this.state.totalDiscount? empty:''}
        </tbody>
        </table>
        </div>
        </div>
    );

    }
}

module.exports = ProductTable

//Push Messages Notifications
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
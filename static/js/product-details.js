import $ from 'jquery';
import axios from 'axios';

module.exports = $(document).ready(function($) {
 
    $('#myCarousel').carousel({
            interval: 5000
    });

    $('#carousel-text').html($('#slide-content-0').html());

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click( function(){
        var id = this.id.substr(this.id.lastIndexOf("-") + 1);
        var id = parseInt(id);
        $('#myCarousel').carousel(id);
    });


    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
             var id = $('.item.active').data('slide-number');
            $('#carousel-text').html($('#slide-content-'+id).html());
    });//END OF CAROUSEL


    var stock = $('#cart-form').data('stock');
    if (stock <=0){
      $('input[type="submit"]').attr('disabled','disabled');
      return false;
    }

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
        axios.post(url).then(function(response){
            if (response.status){
                    addAlert(response.data.message, 'alert-success');
                }
                $(document).trigger('update.cart','');
        });// END OF AXIOS
    }); //END OF BUTTON

});

// Prevent Users to add more than Stock
function getQuantity (id, callback){
    axios.get('/cart/quantity/'+id).then(function (response) {
        callback(response.data.quantity);
    });
}

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


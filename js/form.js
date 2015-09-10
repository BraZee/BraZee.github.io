$(document).ready(function() {

  function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
  };

  $("#email-form [type='submit']").click(function(event) {
    event.preventDefault();
    //get input field values
    var user_name       = $('input[name=name]').val();
    var user_email      = $('input[name=email]').val();
    var buy_rent    = $('input[name=rentbuy]').val();
    var general_area    = $('input[name=area]').val();
    //var user_message    = $('textarea[name=message]').val();

    if(user_name == ""){
      output = '<div class="error-message"><p class="from">Name is empty!</p></div>';
      $("#result").hide().html(output).slideDown();
      return;
    }

    if(!isValidEmailAddress(user_email)){
      output = '<div class="error-message"><p class="from">Please enter a valid email!</p></div>';
      $("#result").hide().html(output).slideDown();
      return;
    }
    if(buy_rent == ""){
      output = '<div class="error-message"><p class="from">Please enter Buy or Rent!</p></div>';
      $("#result").hide().html(output).slideDown();
      return;
    }
    if(general_area == ""){
      output = '<div class="error-message"><p class="from">Area is empty!</p></div>';
      $("#result").hide().html(output).slideDown();
      return;
    }

    //data to be sent to server
    post_data = post_data = {
      'Name': user_name,
      'Email': user_email,
      'RentBuy': buy_rent,
      'Area': general_area
    };

    console.log(post_data);


    //Ajax post data to server
    $.post('http://88.208.218.62:80/GeniusAPI/api/Song/AddEntry', post_data, function(response){

      //load json data from server and output message
      if(response != 200) {
        console.log('error');
        output = '<div class="error-message"><p class="from">An error occured. Please try again.</p></div>';

      } else {
        console.log('no error');
        output = '<div class="success-message"><p class="seuccses">Thank you '+user_name+'. We\'ll get back to you shortly.</p></div>';

        //reset values in all input fields
        $('#email-form input').val('');
        $('#email-form textarea').val('');
      }

      $("#result").hide().html(output).slideDown();

    }, 'json');

  });

  //reset previously set border colors and hide all message on .keyup()
  $("#email-form input, #email-form textarea").keyup(function() {
    $("#result").slideUp();
  });

});

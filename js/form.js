$(document).ready(function() {

    $("#email-form [type='submit']").click(function(event) {
        event.preventDefault();
        //get input field values
        var user_name       = $('input[name=name]').val();
        var user_email      = $('input[name=email]').val();
        var buy_rent    = $('input[name=rentbuy]').val();
        var general_area    = $('input[name=area]').val();
        //var user_message    = $('textarea[name=message]').val();

        //data to be sent to server
        post_data = post_data = {
          'Name': user_name,
          'Email': user_email,
          'RentBuy': buy_rent,
          'Area': general_area
        };

        console.log(post_data);

        //Ajax post data to server
        $.post('contact_me.php', post_data, function(response){

            //load json data from server and output message
            if(response.type == 'error') {
                console.log('error');
                output = '<div class="error-message"><p class="from">'+response.text+'</p></div>';

            } else {
                console.log('no error');
                output = '<div class="success-message"><p class="seuccses">'+response.text+'</p></div>';

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

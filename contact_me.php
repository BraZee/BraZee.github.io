<?php
if($_POST) {

    //$to_Email = "info@heijulor.com"; //Replace with recipient email address

    //check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

        //exit script outputting json data
        $output = json_encode(
        array(
            'type'=> 'error',
            'text' => 'Request must come from Ajax'
        ));

        die($output);
    }

    //check $_POST vars are set, exit if any missing
    if(!isset($_POST["Name"]) || !isset($_POST["Email"]) || !isset($_POST["RentBuy"]) || !isset($_POST["Area"])) {
        $output = json_encode(array('type'=>'error', 'text' => 'Input fields are empty!'));
        die($output);
    }

    //additional php validation
    if(empty($_POST["Name"])) {
        $output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        die($output);
    }
    if(!filter_var($_POST["Email"], FILTER_VALIDATE_EMAIL)) {
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        die($output);
    }
    if(empty($_POST["Area"])) {
        $output = json_encode(array('type'=>'error', 'text' => 'Area is empty!'));
        die($output);
    }

    //proceed with PHP email.
    // $headers = 'From: '.$_POST["Email"].'' . "\r\n" .
    // 'Reply-To: '.$_POST["Email"].'' . "\r\n" .
    // 'X-Mailer: PHP/' . phpversion();

        // send mail
    // $sentMail = @mail($to_Email, $_POST["RentBuy"], $_POST["Area"] .'  -'.$_POST["Name"], $headers);
    //
    // if(!$sentMail) {
    //     $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
    //     die($output);
    // } else {
    //     $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$_POST["Name"] .' Thank you for your email'));
    //     die($output);
    // }
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, 'http://88.208.218.62:80/GeniusAPI/api/Song/AddEntry');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    if(!$sentMail) {
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
        die($output);
    } else {
        $output = json_encode(array('type'=>'message', 'text' => 'Hi '.$_POST["Name"] .' Thank you. We\'ll contact you shortly.'));
        die($output);
    }
}
?>

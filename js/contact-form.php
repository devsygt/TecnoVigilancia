<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputPhone']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputPhone']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
$mail = new PHPMailer();


    $mail->IsHTML(true);
    $mail->From = $_POST['inputEmail'];
    $mail->FromName = $_POST['inputName'];
    //$mail->AddAddress('info@tecno-vigilancia.com'); //recipient
    $mail->AddAddress('merrickgonzzalo@outlook.com');
    $mail->Subject = "Cliente Website";
    $mail->Body = "<html>
<body>
 <div style='padding: 10px;background-color: #F3F3F4;box-shadow: 2px 2px 2px gray'>
    <span style='font-weight:bolder;color:#353E46'>Nombre:&nbsp;</span>
    <span>".$_POST['inputName']."</span>
    <br>
    <span style='font-weight:bolder;color:#353E46'>Telefono:&nbsp;</span>
    <span>".$_POST['inputPhone']."</span>
    <br>
    <h5 style='font-weight:bolder;color:#353E46'>Mensaje:</h5>
    <span>".stripslashes($_POST['inputMessage'])."</span>
</div>
</body>
</html>";

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $from = $_POST["email"];
    $message = $_POST["msg"];
    $subject = "Wiadomość z formularza na stronie portfoliomaciejtalarczyk"
    $to = "mt.contact123@gmail.com"; 
    
    $wiadomosc_email = "Imię: " .$name. "\r\n" . "Email: " . $from "\r\n" . "\r\n" . "Treść: " . $message;
    $headers = "From: " . $form . "\r\n"; 
    $headers = "Reply-To: " . $form . "\r\n"; 
    
    mail($odbiorca, $temat, $wiadomosc_email);
    // echo "Wiadomość została wysłana. Dziękujemy!";
}
?>
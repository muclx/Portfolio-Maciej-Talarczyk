<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $imie = $_POST["name"];
    $email = $_POST["email"];
    $wiadomosc = $_POST["msg"];
    
    $odbiorca = "mt.contact123@gmail.com"; 
    $temat = "Nowa wiadomość od $imie";
    $wiadomosc_email = "Od: $imie\nE-mail: $email\nWiadomość:\n$wiadomosc";
    
    mail($odbiorca, $temat, $wiadomosc_email);
    echo "Wiadomość została wysłana. Dziękujemy!";
}
?>
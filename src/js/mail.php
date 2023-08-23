<?php
//Проверяем тип запроса, обрабатываем только POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Получаем параметры, посланные с JavaScript
    $name =$_POST['nameInput'];
    $email = $_POST['emailInput'];
    $text = $_POST['textInput'];
    
    // Создаем переменную с содержанием письма 
    $content = $name . 'оставил сообщение с сайта. Его почтовый ящик: ' . $email . 'Текс тсообщения:  ' ю $text ;
    
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .='Content-type: text/html; charset=utf-8' . "\r\n";
    
    //Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
    $success = mail("tinos.lot@gmail.com", 'Сообщение с сайта', $content, $headers);
    
    if (success) {
        //Отдаем 200 код ответом на http запрос 
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        //Отдаем ошибку с кодом 500 (intrnal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }    
} else {
    //Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}
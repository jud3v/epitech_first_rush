<?php
if (isset($_POST["name"]) 
&& isset($_POST["url"]) 
&& isset($_POST["password"]) 
&& isset($_POST["birthday"])
&& isset($_POST["phone"])
&& isset($_POST["email"]) 
&& isset($_POST["genre"]) ) {


$name = $_POST["name"];
$genre = $_POST["genre"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$url = $_POST["url"];
$birthday = $_POST["birthday"];
$password = $_POST["password"];

    $base = '../../db.sqlite';

    try {
        $db = new SQLite3($base);
    } catch (SQLiteException $e) {
        die("La création ou l'ouverture de la base [$base] a échouée ".
             "pour la raison suivante: ".$e->getMessage());
    }
    $password = password_hash($password,PASSWORD_BCRYPT);
    $sql = "INSERT INTO users (name, url, genre, birthday, password, phone, email) VALUES ('$name','$url','$genre','$birthday','$password','$phone','$email');";
    $ret = $db->exec($sql);

    if(!$ret){
      echo $db->lastErrorMsg();
    } else {
      echo 1;
    }

    $db->close();
} else {
    return false;
}
<?php
    if($_POST['name']){
        $name = $_POST['name'];
        $base = './db.sqlite';

        try {
            $db = new SQLite3($base);
        } catch (SQLiteException $e) {
            die("La création ou l'ouverture de la base [$base] a échouée ".
                "pour la raison suivante: ".$e->getMessage());
        }
        $sql = "SELECT * FROM users WHERE name = '$name';";
        $ret = $db->exec($sql);
        var_dump($ret);
        if(!$ret){
            echo $db->lastErrorMsg();
        } else {
            echo 1;
        }

        $db->close();
    }
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
</head>
<body>
<form action="" method="POST">
    <div>
        <label for="name">Nom</label>
        <input type="text" name="name" id="name">
    </div>
    <div>
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password">
    </div>
    <button type="submit">Me connecter</button>
</form>
</body>
</html>


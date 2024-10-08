<?php
session_start();

$host = 'localhost'; 
$db = 'FF'; 
$user = 'postgres';  
$pass = 'postgres'; 
$port = '5432'; 

try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(50) NOT NULL,
        score INT NOT NULL,
        game_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    $conn->exec($sql);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

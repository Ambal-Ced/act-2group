<?php
include 'config_file.php'; 

function insertScore($playerName, $score) {
    global $conn; 

    $stmt = $conn->prepare("INSERT INTO scores (player_name, score, game_date) VALUES (?, ?, NOW())");
    
    $stmt->bindParam("si", $playerName, $score);

    if ($stmt->execute()) {
        echo "Score for $playerName has been successfully saved!";
    } else{
        echo "Error: " . $stmt->errorInfo();
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $team1Player = $_POST['team1Player'];
    $team2Player = $_POST['team2Player'];
    $team1Score = $_POST['team1Score'];
    $team2Score = $_POST['team2Score'];

    insertScore($team1Player, $team1Score);
    insertScore($team2Player, $team2Score);
}
?>

<?php

function fetchScores() {
    global $conn;

    if (!$conn) {
        die("Database connection failed!");
    }

    $query = "SELECT player_name, score, game_date FROM scores ORDER BY score DESC";
    $stmt = $conn->query($query);

    if ($stmt->rowCount() > 0) {
        echo "<table class='leaderboard'>";
        echo "<tr><th>Player</th><th>Score</th><th>Date</th></tr>";

        // Output data of each row
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr><td>" . htmlspecialchars($row['player_name']) . "</td><td>" . htmlspecialchars($row['score']) . "</td><td>" . htmlspecialchars($row['game_date']) . "</td></tr>";
        }

        echo "</table>";
    } else {
        echo "No scores available.";
    }
}

fetchScores();

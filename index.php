<?php 
require_once 'config_file.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Family Feud Game</title>
    <!-- Link Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Link Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header Section -->
    <header id="game-header" class="bg-primary text-center py-3">
        <h1>Family Feud Game</h1>
    </header>
    
    <!-- Navigation Section -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light text-center">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="index.php">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="rules.php">Rules</a></li>
                    <li class="nav-item"><a class="nav-link" href="#leaderboard">Leaderboard</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Game Container -->
    <div id="game-container" class="container p-4 my-5 mx-auto">
        <h2>Game Setup</h2>

        <form id="player-names-form" class="my-3">
            <label for="team1-player" class="form-label">Team 1 Player Name:</label>
            <input type="text" id="team1-player" name="team1-player" class="form-control" required>
            <br>
            <label for="team2-player" class="form-label">Team 2 Player Name:</label>
            <input type="text" id="team2-player" name="team2-player" class="form-control" required>
        </form>

        <button id="start-game-btn" class="btn btn-primary">
            <img src="assets/buzzer.png" alt="Buzzer" class="buzzer-img img-fluid mx-auto d-block">
            Start Game
        </button>

        <div id="results" class="bg-light p-3">
            <ul class="list-unstyled">
                <li>Answer : ______</li>
            </ul>
        </div>

        <div id="current-player-container">
            <h3 id="current-player">Current Player: </h3>
        </div>

        <div id="question-container">
            <h2 id="question">Question will appear here</h2>
        </div>

        <form id="answer-form" class="d-flex my-3" method="POST">
            <label for="user-answer" class="me-2">Your Answer:</label>
            <input type="text" id="user-answer" name="user-answer" class="form-control me-2" required>
            <button type="submit" class="btn btn-primary" id="submit-answer">Submit Answer</button>
        </form>

        <table class="score-table table table-bordered text-center my-4">
            <thead>
                <tr>
                    <th id="team1">Team 1</th>
                    <th id="team2">Team 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="team1-score">0</td>
                    <td id="team2-score">0</td>
                </tr>
            </tbody>
        </table>

       

        <div id="countdown-timer" class="text-danger text-center" hidden>
            <h3>Get Ready!</h3>
            <span id="timer">3</span>
        </div>

        <div id="leaderboard">
            <h3>Leaderboard</h3>
            <?php
                include 'fetch_scores.php'; 
            ?>
        </div>

        <progress id="answer-progress" value="0" max="100" class="w-100 my-4"></progress>
        <button id="reset" onclick="resetGame()">Reset Game</button>

       

        <audio controls>
            <source src="assets/buzzer.wav" id="buzzer-sound">
        </audio> 
        <audio id="game-soundtrack" controls>
            <source src="assets/theme.mp3">
            Your browser does not support the audio element.
        </audio>
    </div>

    <footer class="text-center py-3 bg-secondary">
        <h3>Game Over!</h3>
    </footer>

    <!-- Link to Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Link to JavaScript -->
    <script src="newgame.js"></script>
</body>
</html>

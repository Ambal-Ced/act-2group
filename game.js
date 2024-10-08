let team1Score = 0;
let team2Score = 0;
let currentRound = 1;
let correctAnswersInRound = 0;
let wrongAnswersInRound = 0;
let currentTeam = ''; 
const roundLimit = 3; 

const roundsData = [
    {
        question: "Magbigay ng salitang pwedeng pang describe sa saging?",
        answers: {
            "Mahaba": 43,
            "Masarap": 10,
            "Matamis": 9,
            "Dilaw": 6,
            "Malambot": 4,
            "Kurbado": 4
        }
    },
    {
        question: "Mahirap maging (blank).",
        answers: {
            "Pogi": 60,
            "Mahirap": 17,
            "Mabait": 4,
            "Pangit": 4,
            "Single": 3
        }
    },
    {
        question: "Ano ang karaniwang ginagawa sa dilim?",
        answers: {
            "Natutulog": 21,
            "Kiss": 16,
            "Sexy time": 16,
            "Nangangapa": 11,
            "Nagtatago": 11,
            "Nagse-cellphone": 7
        }
    },
    {
        question: "Anong mga pambobola ang sinasabi ng lalaki sa babae?",
        answers: {
            "Ang ganda mo": 32,
            "Ikaw lang wala nang iba": 31,
            "Di kita iiwan": 8,
            "I miss you": 8,
            "Ang sexy mo": 3
        }
    },
    {
        question: "Magbigay ng tunog na nalilikha ng katawan?",
        answers: {
            "Utot": 24,
            "Boses": 14,
            "Sipol": 10,
            "Hilik": 9,
            "Palakpak": 8
        }
    },
    {
        question: "Matutuwa ka kung ano ang mabango sa lalaki?",
        answers: {
            "Buhok": 31,
            "Ulo": 32,
            "Kilikili": 18,
            "Leeg": 12,
            "Bibig": 13, 
            "Hininga": 12,
            "Dibdib": 4
        }
    },
    {
        question: "Anong nagagawa ng bibe na kaya mo rin gawin?",
        answers: {
            "Lumangoy": 38,
            "Maligo": 38,
            "Lumakad": 26,
            "Kumendeng": 26,
            "Tumuka": 13,
            "Kumain": 13,
            "Uminom": 6,
            "Mag quack quack": 3
        }
    },
    {
        question: "Sino kinakausap mo pag may problem ka sa lovelife?",
        answers: {
            "Friend": 51,
            "Parents": 13,
            "Kapatid": 6,
            "Sarili": 4,
            "Lord": 3
        }
    }
];

let team1Player = '';
let team2Player = '';

function getRandomDelay(min, max) {
    return Math.random() * (max - min) + min;
}

function buzzerPressed(firstTeam) {
    currentTeam = firstTeam;
    const buzzerSound = document.getElementById('buzzer-sound');
    buzzerSound.play();
    alert(`${firstTeam === 'team1' ? team1Player : team2Player} gets to answer first!`);

    document.getElementById('answer-form').reset();
}

document.getElementById('start-game-btn').addEventListener('click', startGame);

function startGame() {
    team1Player = document.getElementById('team1-player').value;
    team2Player = document.getElementById('team2-player').value;

    if (!team1Player || !team2Player) {
        alert('Please enter player names.');
        return;
    }

    document.querySelector("#team1").innerHTML = team1Player;
    document.querySelector("#team2").innerHTML = team2Player;

    team1Score = 0;
    team2Score = 0;
    currentRound = 1;

    updateScore();
    alert(`${team1Player} vs ${team2Player}! Let the game begin!`);
    document.getElementById('current-player').innerHTML = 'Current Team: ' + currentTeam;
    startCountdown();
    const delay = getRandomDelay(1000, 5000);

    setTimeout(function() {
        const firstTeam = Math.random() > 0.5 ? 'team1' : 'team2';
        buzzerPressed(firstTeam);
    }, delay);

    
    displayQuestion();
}

function validateAnswer(answer) {
    const currentRoundData = roundsData[currentRound - 1];
    return currentRoundData.answers[answer];
}

document.getElementById('answer-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const userAnswer = document.getElementById('user-answer').value.trim();
    const points = validateAnswer(userAnswer);

    if (points) {
        displayCorrectAnswer(userAnswer, points);
        updateScore('correct', points, currentTeam);
    } else {
        handleWrongAnswer();
    }
    document.getElementById('current-player').innerHTML = 'Current Team: ' + currentTeam;
    document.getElementById('answer-form').reset();
});

function handleWrongAnswer() {
    alert('Incorrect answer!');
    wrongAnswersInRound++;
    
    if (wrongAnswersInRound >= 3) {
        triggerStealChance(); 
    } else {
        switchTeams();
    }
}

function switchTeams() {
    currentTeam = currentTeam === 'team1' ? 'team2' : 'team1';
    alert(`Now it's ${currentTeam === 'team1' ? team1Player : team2Player}'s turn!`);
}

function triggerStealChance() {
    alert(`${currentTeam === 'team1' ? team2Player : team1Player} gets a chance to steal!`);
    currentTeam = currentTeam === 'team1' ? 'team2' : 'team1';
    wrongAnswersInRound = 0;
}

function updateScore(result = '', points = 0, team = '') {
    if (result === 'correct') {
        if (team === 'team1') {
            team1Score += points;
        } else {
            team2Score += points;
        }
        correctAnswersInRound++;
        if (correctAnswersInRound >= 5) {
            nextRound(); 
        }
    } else if (result === 'wrong') {
        wrongAnswersInRound++;
        if (wrongAnswersInRound >= 3) {
            triggerStealChance(); 
        }
    }

    document.getElementById('team1-score').innerHTML = team1Score;
    document.getElementById('team2-score').innerHTML = team2Score;

    if (currentRound >= roundLimit) {
        startFinalRound();
    } else {
        displayQuestion();
        startCountdown();
    }
}

function displayCorrectAnswer(answer, points) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML += `<p>Correct Answer: ${answer} (${points} points)</p>`;
}

function displayQuestion() {
    const questionDiv = document.getElementById('question');
    const currentRoundData = roundsData[currentRound - 1];
    questionDiv.innerHTML = `<h2>${currentRoundData.question}</h2>`;
}

let timerInterval;
function startCountdown() {
    let timer = 5; 
    document.getElementById('countdown-timer').hidden = false;
    document.getElementById('timer').innerHTML = timer;
    
    timerInterval = setInterval(function () {
        timer--;
        document.getElementById('timer').innerHTML = timer;
        
        if (timer <= 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown-timer').hidden = true;
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    
    let winner;
    if (team1Score > team2Score) {
        winner = team1Player;
    } else if (team2Score > team1Score) {
        winner = team2Player;
    } else {
        winner = 'It\'s a tie!';
    }
    
    alert(`Game Over! The winner is: ${winner}`);

    submitScores();

    resetGame();
}
document.getElementById('reset').addEventListener('click',function()
{
    alert('The game will now be reset');
    resetGame();
})
function resetGame() {
    team1Score = 0;
    team2Score = 0;
    currentRound = 1;
    correctAnswersInRound = 0;
    wrongAnswersInRound = 0;
    document.getElementById('results').innerHTML = '';
    updateScore();
}

function startFinalRound() {
    alert('Final Round Begins! Answer the questions quickly.');
}

document.getElementById('pass-btn').addEventListener('click', function() {
    alert('You chose to Pass!');
    nextRound();
});

document.getElementById('play-btn').addEventListener('click', function() {
    alert('You chose to Play! Enter your answer in the section above.');
});

function nextRound() {
    correctAnswersInRound = 0;
    wrongAnswersInRound = 0;
    currentRound++;
    function submitScores() {
        const team1Player = document.getElementById('team1-player').value;
        const team2Player = document.getElementById('team2-player').value;
        const team1Score = team1Score;
        const team2Score = team2Score;
    
        const formData = new FormData();
        formData.append('team1Player', team1Player);
        formData.append('team2Player', team2Player);
        formData.append('team1Score', team1Score);
        formData.append('team2Score', team2Score);
    
        fetch('index.php', { 
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(result => alert(result))
          .catch(error => console.error('Error:', error));
    }
    
    submitScores();
    
    if (currentRound <= roundLimit) {
        displayQuestion();
        startCountdown();
    } else {
        endGame(); 
    }
}

function updateLeaderboard() {
    fetch('leaderboard.php')
        .then(response => response.json())
        .then(data => {
            let leaderboard = document.getElementById('leaderboard');
            leaderboard.innerHTML = '';
            data.forEach(player => {
                leaderboard.innerHTML += `<li>${player.player_name}: ${player.score}</li>`;
            });
        });
}

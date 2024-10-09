let team1Score = 0;
let team2Score = 0;
let currentRound = 1;
let correctAnswersInRound = 0;
let wrongAnswersInRound = 0;
let currentTeam = '';
let stealingTeam = '';
const roundLimit = 3;
const maxWrongAnswers = 3;
let answeredCorrectly = [];
let currentQuestion = {};
let team1Player = '';
let team2Player = '';

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

document.getElementById('start-game-btn').addEventListener('click', startGame);

function startGame() {
    team1Player = document.getElementById('team1-player').value;
    team2Player = document.getElementById('team2-player').value;

    if (team1Player === '' || team2Player === '') {
        alert('Please enter names for both teams before starting the game.');
        return;
    }

    currentRound = 1;
    team1Score = 0;
    team2Score = 0;
    correctAnswersInRound = 0;
    wrongAnswersInRound = 0;
    answeredCorrectly = [];

    faceOff();
}

function faceOff() {
    currentTeam = Math.random() < 0.5 ? team1Player : team2Player;
    document.getElementById('current-player').textContent = `Current Player: ${currentTeam}`;

    currentQuestion = roundsData[currentRound - 1];
    document.getElementById('question').textContent = currentQuestion.question;

    document.getElementById('answer-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const userAnswer = document.getElementById('user-answer').value.trim();
        validateAnswer(userAnswer, faceOffOutcome);
    });
}

function faceOffOutcome(isCorrect) {
    if (isCorrect) {
        playRounds();
    } else {
        currentTeam = currentTeam === team1Player ? team2Player : team1Player;
        document.getElementById('current-player').textContent = `Current Player: ${currentTeam}`;
    }
}

function playRounds() {
    document.getElementById('answer-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const userAnswer = document.getElementById('user-answer').value.trim();
        validateAnswer(userAnswer, playRoundOutcome);
    });
}

function playRoundOutcome(isCorrect) {
    if (isCorrect) {
        correctAnswersInRound++;
        if (correctAnswersInRound === 5) {
            proceedToNextRound(); 
        }
    } else {
        wrongAnswersInRound++;
        if (wrongAnswersInRound === maxWrongAnswers) {
            initiateSteal();
        }
    }
}

function validateAnswer(userAnswer, callback) {
    const answers = currentQuestion.answers;

    if (userAnswer in answers && !answeredCorrectly.includes(userAnswer)) {
        answeredCorrectly.push(userAnswer);
        alert('Correct answer!');
        
        const resultList = document.querySelectorAll('#results li');
        resultList[correctAnswersInRound].textContent = `Answer: ${userAnswer}, Points: ${answers[userAnswer]}`;
        
        if (currentTeam === team1Player) {
            team1Score += answers[userAnswer];
            document.getElementById('team1-score').textContent = team1Score;
        } else {
            team2Score += answers[userAnswer];
            document.getElementById('team2-score').textContent = team2Score;
        }

        callback(true); 
    } else {
        alert('Wrong answer!');
        callback(false); 
    }
}

function initiateSteal() {
    stealingTeam = currentTeam === team1Player ? team2Player : team1Player;
    document.getElementById('current-player').textContent = `Steal Attempt by: ${stealingTeam}`;

    document.getElementById('answer-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const userAnswer = document.getElementById('user-answer').value.trim();
        validateAnswerForSteal(userAnswer);
    });
}

function validateAnswerForSteal(userAnswer) {
    const answers = currentQuestion.answers;

    if (userAnswer in answers && !answeredCorrectly.includes(userAnswer)) {
        alert('Correct answer! Stealing team gets the points!');
        
        if (stealingTeam === team1Player) {
            team1Score += answers[userAnswer];
            document.getElementById('team1-score').textContent = team1Score;
        } else {
            team2Score += answers[userAnswer];
            document.getElementById('team2-score').textContent = team2Score;
        }
    } else {
        alert('Wrong answer! The round ends.');
    }

    proceedToNextRound();
}

function proceedToNextRound() {
    correctAnswersInRound = 0;
    wrongAnswersInRound = 0;
    answeredCorrectly = [];

    currentRound++;

    if (currentRound > roundLimit) {
        FinalRound();
    } else {
        faceOff();
    }
}

function FinalRound() {
    alert(`Final Round: ${currentTeam} gets to answer!`);

    let finalRoundQuestions = [
        "Final question 1?",
        "Final question 2?",
        "Final question 3?",
        "Final question 4?",
        "Final question 5?"
    ];

    let finalRoundPoints = 0;
    let questionIndex = 0;

    function askNextFinalQuestion() {
        if (questionIndex < finalRoundQuestions.length) {
            let finalQuestion = finalRoundQuestions[questionIndex];
            document.getElementById('question').textContent = finalQuestion;

            document.getElementById('answer-form').addEventListener('submit', function (e) {
                e.preventDefault();
                const userAnswer = document.getElementById('user-answer').value.trim();
                validateFinalAnswer(userAnswer, function (isCorrect, points) {
                    if (isCorrect) {
                        finalRoundPoints += points;
                        alert(`Correct! Points earned: ${points}`);
                    } else {
                        alert('Wrong answer!');
                    }

                    questionIndex++;
                    askNextFinalQuestion(); 
                });
            }, { once: true }); 
        } else {
            endGame(finalRoundPoints);
        }
    }

    askNextFinalQuestion();
}

function validateFinalAnswer(userAnswer, callback) {
    const finalRoundAnswers = {
        "Final question 1?": { "Answer1": 10 },
        "Final question 2?": { "Answer2": 20 },
        "Final question 3?": { "Answer3": 30 },
        "Final question 4?": { "Answer4": 40 },
        "Final question 5?": { "Answer5": 50 }
    };

    const currentQuestion = document.getElementById('question').textContent;
    const answerData = finalRoundAnswers[currentQuestion];

    if (userAnswer in answerData) {
        callback(true, answerData[userAnswer]);
    } else {
        callback(false, 0);
    }
}

function endGame(finalRoundPoints) {
    if (currentTeam === team1Player) {
        team1Score += finalRoundPoints;
        document.getElementById('team1-score').textContent = team1Score;
    } else {
        team2Score += finalRoundPoints;
        document.getElementById('team2-score').textContent = team2Score;
    }

    let winner = '';
    if (team1Score > team2Score) {
        winner = team1Player;
    } else if (team2Score > team1Score) {
        winner = team2Player;
    } else {
        winner = 'It\'s a tie!';
    }

    alert(`Game Over! The winner is: ${winner}`);

    resetGame();
}

function resetGame() {
    currentRound = 1;
    team1Score = 0;
    team2Score = 0;
    correctAnswersInRound = 0;
    wrongAnswersInRound = 0;
    answeredCorrectly = [];
    currentTeam = '';

    document.getElementById('team1-score').textContent = team1Score;
    document.getElementById('team2-score').textContent = team2Score;
    document.getElementById('question').textContent = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('current-player').textContent = 'Game reset. Enter team names to start a new game!';
}

window.addEventListener('load', function() {
    const soundtrack = document.getElementById('game-soundtrack');
    soundtrack.play().catch((error) => {
        console.error('Playback failed:', error);
    });
});


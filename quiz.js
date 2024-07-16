document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const quizSection = document.getElementById('quiz-section');
    const profileSection = document.getElementById('profile-section');
    const leaderboardSection = document.getElementById('leaderboard-section');
    const questionContainer = document.getElementById('question-container');
    const choicesList = document.getElementById('choices');
    const nextBtn = document.getElementById('next-btn');
    const leaderboard = document.getElementById('leaderboard');

    let currentQuestionIndex = 0;
    let score = 0;
    let userName = '';

    const questions = [
        {
            question: "What is the maximum speed limit in a residential area?",
            choices: ["20 km/h", "50 km/h", "80 km/h", "100 km/h"],
            correct: 1
        },
        {
            question: "What does a red traffic light mean?",
            choices: ["Go", "Stop", "Caution", "Yield"],
            correct: 1
        },
        {
            question: "What should you do if you see a pedestrian crossing the street?",
            choices: ["Speed up", "Slow down and stop", "Honk the horn", "Ignore and continue driving"],
            correct: 1
        },
        {
            question: "What is the first thing to do if someone is injured in a road accident?",
            choices: ["Move them immediately", "Give them water", "Call emergency services", "Leave them alone"],
            correct: 2
        },
        {
            question: "What is the correct hand signal for a right turn?",
            choices: ["Left arm straight out", "Left arm bent up at the elbow", "Right arm straight out", "Right arm bent up at the elbow"],
            correct: 1
        },
        {
            question: "What should you use to stop bleeding?",
            choices: ["Cold water", "Bandage or clean cloth", "Ice pack", "Sand"],
            correct: 1
        },
        {
            question: "What should you do if your car breaks down on a highway?",
            choices: ["Leave the car and walk away", "Stay inside the car", "Move the car to the side and use hazard lights", "Stand behind the car"],
            correct: 2
        },
        {
            question: "How often should you check your mirrors while driving?",
            choices: ["Every 5 minutes", "Every 10 seconds", "Only when turning", "Once at the start of the trip"],
            correct: 1
        },
        {
            question: "What does a yellow traffic light mean?",
            choices: ["Speed up", "Slow down and prepare to stop", "Stop immediately", "Ignore"],
            correct: 1
        },
        {
            question: "What is the first step in performing CPR?",
            choices: ["Check for responsiveness", "Start chest compressions", "Call for help", "Give mouth-to-mouth breaths"],
            correct: 0
        },
        {
            question: "What should you do if you see someone unconscious on the road?",
            choices: ["Move them to the side", "Check for breathing and pulse", "Give them water", "Start chest compressions"],
            correct: 1
        },
        {
            question: "What is the best way to handle a small burn?",
            choices: ["Apply ice directly", "Run cool water over it", "Cover with a blanket", "Pop any blisters"],
            correct: 1
        }
    ];

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userName = document.getElementById('name').value;
        profileSection.style.display = 'none';
        quizSection.style.display = 'block';
        showQuestion();
    });

    nextBtn.addEventListener('click', () => {
        const selectedChoice = document.querySelector('input[name="choice"]:checked');
        if (selectedChoice && selectedChoice.value == questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    });

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.querySelector('#question').textContent = question.question;
        choicesList.innerHTML = '';
        question.choices.forEach((choice, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="radio" name="choice" value="${index}"> ${choice}`;
            choicesList.appendChild(li);
        });
    }

    function endQuiz() {
        quizSection.style.display = 'none';
        leaderboardSection.style.display = 'block';
        const li = document.createElement('li');
        li.textContent = `${userName}: ${score} points`;
        leaderboard.appendChild(li);
        saveLeaderboard(userName, score);
        displayLeaderboard();
    }

    function saveLeaderboard(name, score) {
        let leaderboardData = localStorage.getItem('leaderboard');
        if (!leaderboardData) {
            leaderboardData = [];
        } else {
            leaderboardData = JSON.parse(leaderboardData);
        }
        leaderboardData.push({ name, score });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }

    function displayLeaderboard() {
        leaderboard.innerHTML = '';
        let leaderboardData = localStorage.getItem('leaderboard');
        if (leaderboardData) {
            leaderboardData = JSON.parse(leaderboardData);
            leaderboardData.sort((a, b) => b.score - a.score);
            leaderboardData.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.name}: ${entry.score} points`;
                leaderboard.appendChild(li);
            });
        }
    }

    displayLeaderboard();
});

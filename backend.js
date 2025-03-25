let num1, num2, operation, timer, score = 0, questionCount = 0;

function generateProblem() {
    const operations = ['+', '-', '*'];
    operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '+') {
        num1 = Math.floor(Math.random() * 900) + 100; // 3-digit number
        num2 = Math.floor(Math.random() * 9000) + 1000; // 4-digit number
    } else if (operation === '-') {
        num1 = Math.floor(Math.random() * 9000) + 1000;
        num2 = Math.floor(Math.random() * 900) + 100;
    } else {
        num1 = Math.floor(Math.random() * 90) + 10; // 2-digit numbers
        num2 = Math.floor(Math.random() * 90) + 10;
    }
}

function calculateAnswer(n1, op, n2) {
    switch (op) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
    }
}

function startQuiz() {
    score = 0;
    questionCount = 0;
    document.getElementById("startButton").style.display = "none";
    nextQuestion();
}

function nextQuestion() {
    if (questionCount >= 25) {
        endGame();
        return;
    }
    questionCount++;
    generateProblem();
    document.getElementById("question").innerText = `${num1} ${operation} ${num2} = ?`;
    document.getElementById("answer").value = "";
    document.getElementById("answer").disabled = false;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").focus();
    document.getElementById("score").innerText = `Score: ${score}`;
    startTimer(20);
}

function startTimer(seconds) {
    clearInterval(timer);
    let timeLeft = seconds;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("message").innerText = "Time's up!";
            document.getElementById("answer").disabled = true;
            setTimeout(nextQuestion, 2000);
        }
    }, 1000);
}

function autoCheckAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    if (!isNaN(userAnswer)) {
        const correctAnswer = calculateAnswer(num1, operation, num2);
        if (userAnswer === correctAnswer) {
            document.getElementById("message").innerText = "Correct!";
            score++;
            clearInterval(timer);
            setTimeout(nextQuestion, 2000);
        } else {
            document.getElementById("message").innerText = "Try again!";
        }
    }
}

function endGame() {
    clearInterval(timer);
    document.querySelector(".container").innerHTML = `<h2>Game Over!</h2>
        <p>Your Score: ${score}/25</p>
        <p>Would you like to play again?</p>
        <button onclick="restartGame()">Play Again</button>
        <button onclick="exitGame()">Exit</button>`;
}

function restartGame() {
    document.querySelector(".container").innerHTML = `
        <h2>Math Quiz</h2>
        <p id="question">Press "Start" to begin</p>
        <input type="number" id="answer" placeholder="Your Answer" disabled oninput="autoCheckAnswer()">
        <button id="startButton" onclick="startQuiz()">Start</button>
        <p id="message"></p>
        <p id="timer"></p>
        <p id="score">Score: 0</p>
    `;
    score = 0;
    questionCount = 0;
}

function exitGame() {
    document.querySelector(".container").innerHTML = "<h2>Thank you for playing!</h2>";
}

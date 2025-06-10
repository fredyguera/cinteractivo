document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');

    // Variables del cuestionario
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    // Preguntas y respuestas
    const quizQuestions = [
        {
            question: "¿Cuál es la capital de Francia?",
            answers: [
                { text: "Madrid", correct: false },
                { text: "París", correct: true },
                { text: "Berlín", correct: false },
                { text: "Roma", correct: false }
            ]
        },
        {
            question: "¿Cuál es el río más largo del mundo?",
            answers: [
                { text: "Nilo", correct: false },
                { text: "Amazonas", correct: true },
                { text: "Yangtsé", correct: false },
                { text: "Misisipi", correct: false }
            ]
        },
        {
            question: "¿En qué año llegó el hombre a la Luna?",
            answers: [
                { text: "1965", correct: false },
                { text: "1969", correct: true },
                { text: "1972", correct: false },
                { text: "1958", correct: false }
            ]
        },
        {
            question: "¿Cuál es el elemento químico con símbolo 'O'?",
            answers: [
                { text: "Oro", correct: false },
                { text: "Osmio", correct: false },
                { text: "Oxígeno", correct: true },
                { text: "Oganesón", correct: false }
            ]
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            answers: [
                { text: "Pablo Picasso", correct: false },
                { text: "Vincent van Gogh", correct: false },
                { text: "Leonardo da Vinci", correct: true },
                { text: "Miguel Ángel", correct: false }
            ]
        }
    ];

    // Iniciar el cuestionario
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', restartQuiz);

    function startQuiz() {
        startButton.classList.add('hide');
        questions = [...quizQuestions];
        totalQuestionsElement.textContent = questions.length;
        scoreElement.textContent = '0';
        score = 0;
        currentQuestionIndex = 0;
        questionContainer.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            endQuiz();
        }
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        
        if (correct) {
            selectedButton.classList.add('correct');
            score++;
            scoreElement.textContent = score;
        } else {
            selectedButton.classList.add('incorrect');
        }
        
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        
        if (questions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            restartButton.classList.remove('hide');
        }
    }

    function endQuiz() {
        questionContainer.classList.add('hide');
        scoreContainer.classList.remove('hide');
        restartButton.classList.remove('hide');
    }

    function restartQuiz() {
        scoreContainer.classList.add('hide');
        restartButton.classList.add('hide');
        startButton.classList.remove('hide');
    }
});
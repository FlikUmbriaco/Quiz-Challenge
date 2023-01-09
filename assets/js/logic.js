// adding variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// adding variables to set up DOM elements 
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

// starting the quiz baby

function startQuiz() {
    //hide her (start screen)
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class','hide');

    //show her (the questions)
    questionsEl.removeAttribute('class');

    //time her (start timer)
    timerId = etInterval(clockTick, 1000);

    //show her start time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    //grab current question from array
    var currentQuestion = questions[currentQuestionIndex];
    //update title element with the current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    //bye old (clear out old choices)
    choicesEl.innerHTML = '';

    //loop the choices
    for(car i = 0; i <currentQuestion.choices.length: i++) {
        //new buttons for each choice
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute('class', 'choice');
        choiceNode.setAttribute('value', 'choice');
        choiceNode.textContent = i + 1 + '. ' + choice;

        //display her (on the page)
        choicesEl.appendChild(choiceNode);
    }
}
function questionClick(event) {
    var buttonEl = event.target;

//if clicked element is not a choice, do nothing
if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    //lower time
    time -= 15;

    if (time <0) {
        time = 0;
    }
    //display new time
    timerEl.textContent = time;

    feedbackEl.textContent = 'NO!';
} else {
    feedbackEl.textContent = 'YES!';
}
//right/wrong feedback on page for half second
feedbackEl.setAttribute('class', 'feedback');
setTimeout(function () {
    feedbackEl.setAttribute ('class', 'feedback hide');
}, 1000);

//move to next question
currentQuestionIndex++;

//check if there are more questions
if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
} else {
    getQuestion();
}
}
function quizEnd() {
    //stop timer
    clearInterval(timerId);

    //show the end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    //show score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    //hide questions
    questionsEl.setAttribute('class', 'hide');
}
function clockTick () {
    time--;
    timerEl.textContent = time
    
    //check if we ran out of time
    if (time <= 0) {
        quizEnd();
    }
}
function saveHighscore() {
    var initials = initialsEl.value.trim();

    // make sure value isn't empty
    if (initials !== '') {
        //get saved scores from localstorage. if none, set to empty array
        var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];

        //format new score object for current user
        var newScore = {
            score.time,
            initials: initials,
        };

        //save score to localstorage
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));
        
        //redirect to next page
        window.location.href = 'highscores.html';
    }
}
function.checkForEnter(event) {
    if (event.key === 'Enter') {
        saveHighscore();
    }
}
// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
//user clicks button to start quiz
startBtn.onclick = startQuiz;
//user clicks on element containing choices
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
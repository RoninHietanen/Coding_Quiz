var highScore = document.querySelector('.highScore');
var timer = document.querySelector('.timer');
var timeText = document.querySelector(".timer .timeLeft");
var timeCount = document.querySelector('.timer .timeCount');
var startBtn = document.querySelector('.startBtn button');
var quizCard = document.querySelector('.quizCard');
var submitBtn = document.querySelector('#user .btn button')
var cancelBtn = document.querySelector('.cancel button');
var restartBtn = document.querySelector('.restart button');
var resultsBox = document.querySelector(".resultsBox");
var nextBtn = document.querySelector('footer .nextBtn');
var bottomQuesCounter = document.querySelector("footer .totalQuestions");
var options = document.querySelector('.options');
var questions = document.querySelector('.questions');

startBtn.onclick = ()=>{
    quizCard.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}

let timeValue =  15;
let queCount = 0;
let queNumber = 1;
let userScore = 0;
let counter;
let widthValue = 0;


restartBtn.onclick = ()=>{
    quizCard.classList.add("activeQuiz");
    resultsBox.classList.remove("activeResult");
    timeValue = 15; 
    queCount = 0;
    queNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount);
    queCounter(queNumber);
    clearInterval(counter);
    startTimer(timeValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
}

cancelBtn.onclick = ()=>{
    window.location.reload();
}

nextBtn.onclick = ()=>{
    if(queCount < questions.length - 1){
        queCount++;
        queNumber++;
        showQuestions(queCount);
        queCounter(queNumber);
        clearInterval(counter);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        nextBtn.classList.remove("show");
    }else{
        clearInterval(counter);
        showResult();
    }
}

function showQuestions(index){
    let queTag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let optionsTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[4] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[5] +'</span></div>';
    questions.innerHTML = queTag;
    options.innerHTML = optionsTag;
    
    for(i=0; i < options.length; i++){
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}


function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    var allOptions = options.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend");
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend");
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(options.children[i].textContent == correctAns){
                options.children[i].setAttribute("class", "option correct");
                options.children[i].insertAdjacentHTML("beforeend");
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        options.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

function showResult(){
    quizCard.classList.remove("activeQuiz");
    resultsBox.classList.add("activeResult");
    var scoreText = resultsBox.querySelector(".scoreText");
    if (userScore > 3){
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Out of Time!";
            const allOptions = options.children.length;
            let correctAns = questions[queCount].answer;
            for(i=0; i < allOptions; i++){
                if(options.children[i].textContent == correctAns){
                    options.children[i].setAttribute("class", "option correct");
                    options.children[i].insertAdjacentHTML("beforeend");
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                options.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

function queCounter(index){
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuesCounter.innerHTML = totalQueCountTag;
}
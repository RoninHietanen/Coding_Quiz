var startBtn = document.querySelector(".startBtn button");
var info_box = document.querySelector(".info_box");
var exitBtn = info_box.querySelector(".buttons .quit");
var continueBtn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var result_box = document.querySelector(".result_box");
var optionList = document.querySelector(".option_list");
var timeLine = document.querySelector("header .time_line");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");
var highScore = document.querySelector(".highscore");
var userName = document.querySelector(".userName");
var restartQuiz = result_box.querySelector(".buttons .restart");
var quitQuiz = result_box.querySelector(".buttons .quit");
var nextBtn = document.querySelector("footer .next_btn");
var bottomQuesCounter = document.querySelector("footer .total_que");
var saveBtn = document.querySelector(".save_button");
var storedHighScore = localStorage.getItem("highScore");
var storedUserName = localStorage.getItem("user");

let timeValue =  10;
let queCount = 0;
let queNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

/* Start button calls the highscore and retrieves the info box on click */
startBtn.onclick = ()=> {
    info_box.classList.add("activeInfo");
    getHighScore();
    getUsername();
}

/* Removes the info box */
exitBtn.onclick = ()=> {
    info_box.classList.remove("activeInfo");
}

/* removes the info box, adds the quiz box, and called the questions, question counter, timer and timer line functions */
continueBtn.onclick = ()=> {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

/* adds the quiz box, removes the results box, sets the values back to default and calls questions content same as above */
restartQuiz.onclick = ()=> {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 10; 
    queCount = 0;
    queNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(queCount);
    queCounter(queNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
}

/* Reloads the window */
quitQuiz.onclick = ()=> {
    window.location.reload();
}

/* This moves the question onto the next one in the lineup until all questions are answered then it shows the results */
nextBtn.onclick = ()=> {
    if(queCount < questions.length - 1){
        queCount++;
        queNumber++;
        showQuestions(queCount);
        queCounter(queNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        nextBtn.classList.remove("show");
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

/* This calls the questions and options */
function showQuestions(index) {
    var queText = document.querySelector(".que_text");
    
    let queTag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[4] +'</span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    
    var option = optionList.querySelectorAll(".option");
    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

/* This checks whether the option selected was the correct question or not and disables the ability to select options once one has been chosen */
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    var allOptions = optionList.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

/* This shows the results box with the results and calls the function to set the high score and user name */
function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    setHighScore()
}

/* This starts the timer and stops it once it has reached the end or a question has been selected */
function startTimer(time) {
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
            timeText.textContent = "Out of Time";
            const allOptions = optionList.children.length;
            let correctAns = questions[queCount].answer;
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAns){
                    optionList.children[i].setAttribute("class", "option correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

/* This colours the line in time with the timer for an extra time keeping feature */
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine); 
        }
    }
}

/* This counts the questions and displays it in the footer of the box */
function queCounter(index) {
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuesCounter.innerHTML = totalQueCountTag;
}

/* Sets the highscore and username */
function setHighScore() {
    if (storedHighScore === null) {
        highScore.textContent = userScore;
        localStorage.setItem("highScore", userScore);
        /* This saves the username entered */
        saveBtn.onclick = ()=> {
            localStorage.setItem("user", (saveBtn.val()));
        }
    } else if (storedHighScore > userScore) {
        highScore.textContent = storedHighScore;
    } else {
        userScore = storedHighScore;
        saveBtn.onclick = ()=> {
            localStorage.setItem("user", (saveBtn.val()));
        }
    }
}

/* Gets the highscore and username if there is one from local storage */
function getHighScore() {
    if (storedHighScore === null) {
        userScore = 0;
    } else if (storedHighScore > userScore) {
        highScore.textContent = storedHighScore;
        userName.textContent = storedUserName;
    }
}
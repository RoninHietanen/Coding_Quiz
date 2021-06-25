var highScore = document.querySelector('.highScore');
var timer = document.querySelector('.timer');
var timeCount = document.querySelector('.timeCount');
var startBtn = document.querySelector('.startBtn button');
var card = document.querySelector('.card');
var submitBtn = document.querySelector('#user .btn button')
var cancelBtn = document.querySelector('.cancel button');
var restartBtn = document.querySelector('.restart button');
var resultsBox = document.querySelector(".resultsBox");
var nextBtn = document.querySelector('footer .nextBtn');
var bottomQuesCounter = document.querySelector("footer .totalQuestions");


startBtn.onclick = ()=>{
    card.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;


restartBtn.onclick = ()=>{
    card.classList.add("activeQuiz");
    resultsBox.classList.remove("activeResult");
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
}

cancelBtn.onclick = ()=>{
    window.location.reload();
}

nextBtn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
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
    var questions = document.querySelector('.questions');
    
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[4] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[5] +'</span></div>';
    questions.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    var options = document.querySelector('.options');
    
    for(i=0; i < options.length; i++){
        options[i].setAttribute("onclick", "optionSelected(this)");
    }
}


function optionSelected(answer){
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    var allOptions = option_list.children.length;
    
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
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend");
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

function showResult(){
    card.classList.remove("activeQuiz");
    resultsBox.classList.add("activeResult");
    var scoreText = resultsBox.querySelector(".score_text");
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
            const allOptions = option_list.children.length;
            let correctAns = questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

function queCounter(index){
    let totalQueCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuesCounter.innerHTML = totalQueCountTag;
}
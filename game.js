const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

//Reference to the header of the Game page
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let accetingAnswer = false;
let currentQuestion = [];
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

//constant

//For every correct answer.
const CORRECT_BONUS = 10;

//Questions in Quiz
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // ... => Spread operator , to assign an Array to another.
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

//Loading new questions to HTML, everytime.
getNewQuestion = () => {

    //If availQuestion = 0 , finish the game
    if(availableQuestions.length === 0 ||  questionCounter >= MAX_QUESTIONS){
        //Navigate to end page
        return window.location.assign('/end.html');
    }

    questionCounter++;

    //Update the number of questions left on screen
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    //get a random question based on index with random number
    const questionIndex = Math.floor((Math.random() * availableQuestions.length));
    currentQuestion = availableQuestions[questionIndex];
    //Bring the random question or element from the array
    question.innerText = currentQuestion.question;

    //set the choices 
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        //set the choices based on the number from currentQuestion
        choice.innerText = currentQuestion['choice' + number];
    });

    //Remove the question we just used 

    availableQuestions.splice(questionIndex, 1);

    accetingAnswer = true;
};

//OnClick of a new choice 
choices.forEach(choice => {
    choice.addEventListener("click", e => {

        if(!accetingAnswer){
            return;
        }

        accetingAnswer = false;
        //The content written in each choice
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
       
        classsToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        //update the BONUS for each correct answer
        if(classsToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        /*
         get the whole container of each choice and set a parameter
         of CORRECT & INCORRECT
         */
        selectedChoice.parentElement.classList.add(classsToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classsToApply);
            getNewQuestion();
        }, 1000);
        

        //Once aa choice has been selected select a new question.
      //  getNewQuestion();
    });
});



incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}

startGame();

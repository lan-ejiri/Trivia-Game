$(document).ready(function () {

    //all questions
    var storeQuestions = [
        {
            question: 'What was the name of the AI computer in 2001: A Space Odessy?',
            answers: ['HAL 9000', 'Watson', 'Spacey', 'Siri'],
            correctAnswer: 'HAL 9000',
            pic: 'assets/images/hal.gif'
        },
        {
            question: 'Matt Damon survives off of potatos on a far away planet in which movie?',
            answers: ['The Martian', 'Prometheus', 'Interstellar', 'Gravity'],
            correctAnswer: 'The Martian',
            pic: 'assets/images/potato.gif'
        },
        {
            question: 'An AI robot named Ava murders her creator in which film?',
            answers: ['ex Machina', 'iRobot', 'District 9', 'Avatar'],
            correctAnswer: 'ex Machina',
            pic: 'assets/images/ava.gif'
        },
        {
            question: 'Which movie has an alien species affectionately named "Prawn"?',
            answers: ['District 9', 'Alien', 'Interstellar', 'The Day the Earth Stood Still'],
            correctAnswer: 'District 9',
            pic: 'assets/images/prawn.gif'
        },
        {
            question: 'Which Star Wars movie first introduced the spherical companion BB-8?',
            answers: ['The Force Awakens', 'The Last Jedi', 'Rogue One', 'Revenge of the Sith'],
            correctAnswer: 'The Force Awakens',
            pic: 'assets/images/bb8.gif'
        },
        {
            question: 'Which film features a waste allocation load lifter earth class robot??',
            answers: ['Wall-E', 'Planet of the Apes', 'Arrival', 'E.T.'],
            correctAnswer: 'Wall-E',
            pic: 'assets/images/walle.gif'
        },
        {
            question: 'In the movie "The Thing," what is the antagonist?',
            answers: ['An alien being', 'An ancient demon', 'An ancient ghost', 'An adaptive mutant'],
            correctAnswer: 'An alien being',
            pic: 'assets/images/thing.gif'
        },
        {
            question: 'Which Sci-fi classic was read aloud on the radio, causing many people to believe it was real and freak out?',
            answers: ['District 9', 'War of the Worlds', 'Metropolis', '2000 Leagues Under the Sea'],
            correctAnswer: 'War of the Worlds',
            pic: 'assets/images/war.gif'
        },
        {
            question: 'In which film does the population get euthanized once they turn 30 years old?',
            answers: ['Total Recall', 'Bladerunner', "Logan's Run", 'Terminator'],
            correctAnswer: "Logan's Run",
            pic: 'assets/images/logan.gif'
        },
        {
            question: 'What was the mysterious entity that was threatening earth in "Star Trek The Motion Picture"?',
            answers: ['Tyranus', 'Cobaly', 'Cygnus', "V'ger"],
            correctAnswer: "V'ger",
            pic: 'assets/images/star.gif'
        },
    ];

    //jumbles questions
    var randomQuestions;
    randomQuestions = storeQuestions.sort(function (a, b) { return 0.5 - Math.random() });

    //initializing some variables
    var questionNumber = 0;
    var correct = 0;
    var wrong = 0;
    var missed = 0;

    /////////ONE OF TWO TIMERS, ONE FOR countdown during question
    //set global variables
    var intervalQuestion;
    var questionCountdown = 10;
    //decrement
    function decrementQuestions() {

        //if this countdown reaches 0
        if (questionCountdown === 0) {

            ///if there are questions left; when the timer reaches 0
            if (questionNumber < storeQuestions.length) {
                //stop the timer
                stopTimeQuestion();
                //empty and reset
                $(".content").empty();
                questionCountdown = 10;
                //u suck all u had to do was click something
                $("#questionsgohere").text("You ran out of time! The correct answer was " + randomQuestions[questionNumber].correctAnswer);
                //increments
                questionNumber++;
                missed++;
                //put the GIF and start the waiting timer
                DISPLAYWAIT();
            }

            //if there are no questions left when the timer reaches zero
            else {
            };
        }

        //if the countdown is still going, keep decrementing
        else {
            $("#timeremaining").text("Time Remaining: " + questionCountdown);
            questionCountdown--;
        };
    }


    //just to start questiontimer
    function startTimeQuestion() {
        intervalQuestion = setInterval(decrementQuestions, 1000);
    }
    //just to stop questiontimer
    function stopTimeQuestion() {
        $("#timeremaining").empty();
        clearInterval(intervalQuestion);
    }
    /////////TWO OF TWO TIMERS, for countdown during right/wrong WAIT screen
    //set global variables
    var intervalWait;
var waitingCountdown = 6;
//decrement
function decrementWait() {
    //WHEN THE WAITING SCREEN COUNTDOWN IS OVER 
    if (waitingCountdown === 0) {
        //stop the timer we dont want negative number
        stopTimeQuestion();
        //clear everything and move onto next question IF THERE ARE QUESTIONS LEFT
        if (questionNumber < storeQuestions.length) {
            waitingCountdown = 6;
            $(".content").empty();
            DISPLAYQUESTIONS();
        }

        //BUT  IF THRE ARENT ANY MORE QUESTIONS LEFT, move onto end screen
        else {
            ENDSCREEN();
        }
    }

    // DO DECREMENTY THINGS WHILE THE COWNDOWN IS STILL HAPPENING

    else {
        waitingCountdown--;
        $("#timeremaining").text(waitingCountdown + "...");
    };
}
//just to start wait
function startTimeWait() {
    intervalWait = setInterval(decrementWait, 1000);
}
//just to stop wait
function stopTimeWait() {
    $("#timeremaining").empty();
    $("#picgoeshere").empty();
    clearInterval(intervalWait);
}

//////START BUTTON
$("#theactualstartbutton").click(function () {
    $("#startbutton").hide();
    DISPLAYQUESTIONS();
});

//////DISPLAY QUESTION AND ANSWER CHOICES
var DISPLAYQUESTIONS = function () {

    stopTimeWait();

    /////IF THERE ARE QUESTIONS LEFT
    if (questionNumber < storeQuestions.length) {
        //start the question timer
        startTimeQuestion();

        //display the question
        $("#questionsgohere").text(randomQuestions[questionNumber].question);

        //jumbles question order
        randomAnswerChoices = randomQuestions[questionNumber].answers.sort(function (a, b) { return 0.5 - Math.random() });

        //makes buttons for each answer choice, displays answer choices
        for (i = 0; i < 4; i++) {
            var buttons = $("<button>");
            buttons.text(randomAnswerChoices[i]);
            buttons.attr('value', randomAnswerChoices[i]);
            buttons.attr('id', 'button' + i);
            buttons.attr('class', 'answerchoice');
            $("#answersgohere").append(buttons).append("<br>");
        };

        //when you click a answer choice
        $(".answerchoice").click(function () {
            //stores user guess
            var userGuess = this.value;
            //stop the timer and reset
            stopTimeQuestion();
            questionCountdown = 10;

            //if user guess is the same as correct answer
            if (userGuess === randomQuestions[questionNumber].correctAnswer) {
                //empty out everything
                $(".content").empty();
                //display YES UR CORRECT
                $("#questionsgohere").text("Right! The answer was " + randomQuestions[questionNumber].correctAnswer);
                //increments
                questionNumber++;
                correct++;
                //SHOW THE GIF AND START WAITING TIMER
                DISPLAYWAIT();
            }
            //if ur just plain wrong
            else {
                //empty out evrything
                $(".content").empty();
                //display NAH UR WRONG
                $("#questionsgohere").text("Sorry! The correct answer was " + randomQuestions[questionNumber].correctAnswer);
                //increments
                questionNumber++;
                wrong++;
                //ADD THE GIF AND START WAITING TIMER
                DISPLAYWAIT();

            }
        });
    }

    ///if there ARENT any more questions left, clear everything and show the endscreen
    else {
        $(".content").empty();
        ENDSCREEN();
    }

};

//PUTS A GIF AND STARTS THE WAITING TIMER
var DISPLAYWAIT = function () {
    var giphy = $("<img>");
    giphy.attr("src", randomQuestions[questionNumber - 1].pic);
    giphy.attr("width", "500px");
    giphy.attr("class", "card");
    $("#picgoeshere").append(giphy); //put image
    startTimeWait(); //start the waiting timer
};

//endscreen function: stops all timers. empties everything. shows number of questions right/wrong. shows play again button
var ENDSCREEN = function () {
    stopTimeQuestion();
    stopTimeWait();
    $(".content").empty();
    $("#timer").empty();
    $("#endscreen").append("GAME OVER!" + "<br>" + "You got: " + correct + " correct, " + wrong + " wrong, and " + missed + " missed questions!");
    $("#endscreen").append("<br><br><br> Thanks for Playing! :D");
    $("#theactualstartbutton").show();
    $("#theactualstartbutton").html("<button id = 'playagain' class='button-default'> Click Here to Play Again!</button>");

    // ///PLAY AGAIN BUTTON IN PROGRESSSSS
    // $("#playagain").click(function () {
    //     $("#questionsgohere").empty();
    //     ///////////////RESETTING EVERYTHING///////////////////
    //     //jumbles questions
    //     randomQuestions = storeQuestions.sort(function (a, b) { return 0.5 - Math.random() });
    //     //initializing some variables
    //     questionNumber = 0;
    //     correct = 0;
    //     wrong = 0;
    //     missed = 0;
    //     waitingCountdown = 6;
    //     questionCountdown = 10;
    //     DISPLAYQUESTIONS();
    // });
}
});



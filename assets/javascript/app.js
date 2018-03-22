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
        // {
        //     question: 'Which Star Wars movie first introduced the spherical companion BB-8?',
        //     answers: ['The Force Awakens', 'The Last Jedi', 'Rogue One', 'Revenge of the Sith'],
        //     correctAnswer: 'The Force Awakens',
        //     pic: 'assets/images/bb8.gif'
        // },
        // {
        //     question: 'Which film features a waste allocation load lifter earth class robot??',
        //     answers: ['Wall-E', 'Planet of the Apes', 'Arrival', 'E.T.'],
        //     correctAnswer: 'Wall-E',
        //     pic: 'assets/images/walle.gif'
        // },
        // {
        //     question: 'In the movie "The Thing," what is the antagonist?',
        //     answers: ['An alien being', 'An ancient demon', 'An ancient ghost', 'An adaptive mutant'],
        //     correctAnswer: 'An alien being',
        //     pic: 'assets/images/thing.gif'
        // },
        // {
        //     question: 'Which Sci-fi classic was read aloud on the radio, causing many people to believe it was real and freak out?',
        //     answers: ['District 9', 'War of the Worlds', 'Metropolis', '2000 Leagues Under the Sea'],
        //     correctAnswer: 'War of the Worlds',
        //     pic: 'assets/images/war.gif'
        // },
        // {
        //     question: 'In which film does the population get euthanized once they turn 30 years old?',
        //     answers: ['Total Recall', 'Bladerunner', "Logan's Run", 'Terminator'],
        //     correctAnswer: "Logan's Run",
        //     pic: 'assets/images/logan.gif'
        // },
        // {
        //     question: 'What was the mysterious entity that was threatening earth in "Star Trek The Motion Picture"?',
        //     answers: ['Tyranus', 'Cobaly', 'Cygnus', "V'ger"],
        //     correctAnswer: "V'ger",
        //     pic: 'assets/images/star.gif'
        // },
    ];

    //jumbles questions
    var randomQuestions;
    randomQuestions = storeQuestions.sort(function (a, b) { return 0.5 - Math.random() });

    //initializing some variables
    var questionNumber = 0;
    var correct = 0;
    var wrong = 0;
    var missed = 0;

    /////////TWO TIMERS, ONE FOR countdown during question
    var intervalQuestion;
    var questionCountdown = 7;
    function decrementQuestions() {
        //if this countdown reaches 0, move onto the right/wrong WAIT screen
        if (questionCountdown === 0) {
            questionNumber++;
            missed++;
            alert("U RAN OUTTA TIME");
            stopTimeQuestion();
            $(".content").empty();
            questionCountdown = 7;
            DISPLAYQUESTIONS();
        }
        //if the countdown is still going, keep decrementing
        else {
            $("#timeremaining").text(questionCountdown);
            questionCountdown--;
        }
    }
    function startTimeQuestion() {
        intervalQuestion = setInterval(decrementQuestions, 1000);
    }
    function stopTimeQuestion() {
        $("#timeremaining").empty();
        clearInterval(intervalQuestion);
    }
    ///////////////another for countdown during right/wrong WAIT screen
    var intervalWait;
    var waitingCountdown = 4;
    function decrementWait() {
        //if this countdown reaches 0, clear everything and move onto next question
        if (waitingCountdown === 0) {
            waitingCountdown = 4;
            $(".content").empty();
            DISPLAYQUESTIONS();
        }
        else {
            waitingCountdown--;
            $("#timeremaining").text(waitingCountdown);
        }
    }
    function startTimeWait() {
        intervalWait = setInterval(decrementWait, 1000);
    }
    function stopTimeWait() {
        $("#timeremaining").text("");
        $("#picgoeshere").empty();
        clearInterval(intervalWait);
    }


    //////START BUTTON
    $("#startbutton").click(function () {
        $("#startbutton").hide();
        DISPLAYQUESTIONS();
    });

    //////DISPLAY QUESTION AND ANSWER CHOICES
    var DISPLAYQUESTIONS = function () {

        stopTimeWait();

        /////IF THERE ARE QUESTIONS LEFT
        if (questionNumber < storeQuestions.length) {
            
            startTimeQuestion();

            //displays question
            $("#questionsgohere").text(randomQuestions[questionNumber].question);

            //jumbles question order
            randomAnswerChoices = randomQuestions[questionNumber].answers.sort(function (a, b) { return 0.5 - Math.random() });

            //makes buttons for each answer choice, displays anmswer choices
            for (i = 0; i < 4; i++) {
                var buttons = $("<button>");
                buttons.text(randomAnswerChoices[i]);
                buttons.attr('value', randomAnswerChoices[i]);
                buttons.attr('id', 'button' + i);
                buttons.attr('class', 'answerchoice');
                $("#answersgohere").append(buttons).append("<br>");
            };

            //when you click a wrong or right answer
            $(".answerchoice").click(function () {
                var userGuess = this.value;
                console.log(userGuess);
                stopTimeQuestion();        ///stop timer
                questionCountdown = 7; ///reset timer count

                //if user guess is the same as correct answer
                if (userGuess === randomQuestions[questionNumber].correctAnswer) {
                    console.log("hell yeah");
                    $(".content").empty();
                   $("#questionsgohere").text("Right! The answer was " + randomQuestions[questionNumber].correctAnswer);
                    questionNumber++;
                    correct++;
                    DISPLAYWAIT();
                }
                //if ur just plain wrong
                else {
                    console.log("hell nah");
                    $(".content").empty();
                    $("#questionsgohere").text("Wrong! The correct answer was " + randomQuestions[questionNumber].correctAnswer);
                    questionNumber++;
                    wrong++;
                    DISPLAYWAIT();

                }
            });
        }

        ///if no more questions
        else {
            $(".content").empty();
            alert("All Questions Done!");
            ENDSCREEN();
        }

    };

    var DISPLAYWAIT = function (){

        if (questionNumber <= storeQuestions.length ){
        var giphy = $("<img>");
        giphy.attr("src",randomQuestions[questionNumber-1].pic);
        giphy.attr("width","500px");
        $("#picgoeshere").append(giphy);
        startTimeWait();
        }

        else {
            ENDSCREEN();
        }
    };


    var ENDSCREEN = function(){
        $(".content").empty();
        $("#picgoeshere").append("You got: " + correct + " correct, " + wrong + " wrong, and missed " + missed + " questions!");
    }
});
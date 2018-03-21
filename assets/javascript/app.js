$(document).ready(function(){

    var storeQuestions = [

        {question: 'What was the name of the AI computer in 2001: A Space Odessy?' ,
        answers: [ 'HAL 9000', 'Watson', 'Spacey', 'Siri'],
        correctAnswer: 'HAL 9000'},

        {question: 'Matt Damon survives off of potatos on a far away planet in which movie?' ,
        answers: [ 'The Martian', 'Prometheus', 'Interstellar', 'Gravity'],
        correctAnswer: 'The Martian'},

        {question: 'An AI robot named Ava murders her creator in which film?' ,
        answers: [ 'ex Machina', 'iRobot', 'District 9', 'Avatar'],
        correctAnswer: 'ex Machina'},

        {question: 'Which movie has an alien species affectionately named "Prawn"?' ,
        answers: [ 'District 9', 'Alien', 'Interstellar', 'The Day the Earth Stood Still'],
        correctAnswer: 'District 9'},
    ];

    //makes sure every time refreh is pressed, question appear in different order
    function randomizeQuestions() {
        var randomQuestions = everything.sort(function(a, b){return 0.5 - Math.random()});
        
        $("#questionsgohere").append(randomQuestions[0].question);
    }


    randomizeQuestions();


    // for ( i = 0; i < everything.length; i++) {
    //     $("#questionsgohere").text(everything[i].question);
    //     $("#answersgohere").text(everything[i].answers);


    // }   
    
    

});

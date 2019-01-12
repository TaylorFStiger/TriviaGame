$('#tryagain').on('click', function () {
    location.reload();
});

$(document).ready(function () {

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
    var game = {
        questions: [{
            question: 'Who were the 3 original founders of Starbucks?',
            possibles: ['Gordon Bowker, Jerry Baldwin, and Zev Siegl', 'Howard Behar, Orin Smith, and Michelle Gass', 'Howard Schultz, Cliff Burrows, and Joe Thornton', 'Erin Shane, Linda Mills, and Sanja Gould'],
            id: 'question-one',
            answer: 0
        }, {
            question: 'In what city did the first Starbucks open up?',
            possibles: ['Chicago', 'Portland', 'Seattle', 'Long Beach'],
            id: 'question-two',
            answer: 2
        }, {
            question: 'The original logo for Starbucks had what in its name? Finish this phrase: “Coffee, tea, and …”',
            possibles: ['gifts', 'lemonade', 'bagels', 'spices'],
            id: 'question-three',
            answer: 3
        }, {
            question: 'What is the name of the size of hot drink cup that still exists but is not listed on the menu boards?',
            possibles: ['Tiny', 'Short', 'Mini', 'Solo'],
            id: 'question-four',
            answer: 1
        }, {
            question: 'Starbucks currently operates one store in the United States which is sometimes called a “stealth Starbucks” or an “unbranded Starbucks”. It’s a store that doesn’t have a Starbucks menu (in terms of either beverage or food), baristas wear a dress code even more relaxed than in stores, offers beer and wine, and doesn’t have a Starbucks logo hanging anywhere in the windows. What is this “stealth Starbucks” called?',
            possibles: ['Beacon Hill Coffee and Tea House', 'Downtown Coffee Tree House', 'Mt. Rainier Coffee and Tea', 'Roy Street Coffee and Tea'],
            id: 'question-five',
            answer: 3
        }]
    }


    startgame();

    function startgame() {


        // This initializes the button that starts the game 

        $("#startGame").on("click", function () {
            $(this).hide();
            buildQuestions();
            run();
            $('#movie_video').html('<video width="420" height="315"  controls autoplay><source src="assets/images/BLADE RUNNER - Official Trailer.mp4" type="video/mp4"></video>');
        })

        // create a function with an onclick event for the doneButton that both checks the Answers 
        // and stops the clock when "done" button is pressed

        $('#doneButton').on('click', function () {
            checkAnswers();
            stop();
            $("#messageDiv").html("Game Over!");
        })

        // These events start the timer: set the number of seconds the guesser has 
        var number = 30;

        // the run function sets the spacing of the decrement function's time interval so that
        // it can be equal to a second per number decrement.
        function run() {
            counter = clearInterval();
            counter = setInterval(decrement, 1000);
        }

        // This function enables the number of seconds to decrease with time, and to display
        // the result of that decrease until time is up. 
        function decrement() {
            number--;
            $('#timeLeft').html('<h2>' + "Time Remaining: " + number + " seconds" + '</h2>');
            if (number === 0) {
                $("#messageDiv").html("Times UP " + " Game Over!");
                stop();
                checkAnswers();
            }
        }
    }


    // The stop function
    function stop() {
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
        clearInterval(counter);
        
    }

    // this function takes the template created in the Template function, allows it to be displayed on the page
    function buildQuestions() {
        var questionBOX = ''
        for (var i = 0; i < game.questions.length; i++) {
            questionBOX = questionBOX + formTemplate(game.questions[i]);
        }
        $('#questions-container').html(questionBOX);
    }

    // this function dynamically creates the inputs needed for the form 
    function formTemplate(data) {
        // the first variable relates the form field for question with the data 
        var qString = "<br><strong><form id='questionOne'>" + data.question + "</strong><br>";
        var possibles = data.possibles;
        for (var i = 0; i < possibles.length; i++) {
            var possiblelist = possibles[i];
            qString = qString + "<input type='radio' name='" + data.id + "' value= " + i + " >" + possiblelist + "<br>";
            // qString = qString + "<input type='radio' name='" + data.id + "' value= " + i + " style=height:35px; width:35px; vertical-align: middle; > " + possiblelist + "<br>";
        }
        return qString + "</form>";
    }

    // function to tabulate the guesser results
    function checkAnswers() {
        var correct = 0;
        var incorrect = 0;

        for (var i = 0; i < game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
                incorrect++;
            }
        }
        $('.results').html('Correct: ' + correct + "<br>" + 'Incorrect: ' + incorrect + "<br>");
    }

    function isCorrect(Checkquestion) {
        var answers = $('[name=' + Checkquestion.id + ']');
        var correct = answers.eq(Checkquestion.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }

});


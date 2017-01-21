(function() {
    'use strict'

    // DOM references //
    var $score = document.getElementById('score');
    var $timer = document.getElementById('timer')
    var $question = document.getElementById('question');
    var $form = document.getElementById('answer');
    var $feedback = document.getElementById('feedback');
    var $start = document.getElementById('start');

    var quiz = {
        'name': 'Super Hero Name Quiz',
        'description': 'HOw many super heros can you name?',
        'question': 'What is the real name of ',
        'questions': [
            {'question': 'Superman', 'answer': 'Clark Kent'},
            {'question': 'Wonderwoman', 'answer': 'Dianna Prince'},
            {'question': 'Batman', 'answer': 'Bruce Wayne'},
        ]
    };


    // view functions //
    function update(element, content, klass) {
        var p = element.firstChild || document.createElement('p');

        p.textContent = content;
        element.appendChild(p);

        if (klass) {
            p.className = klass;
        }
    }

    // Event listeners
    $start.addEventListener('click', function() {
        play(quiz)
    }, false);

    function hide(element) {
        element.style.display = 'none';
    }

    function show(element) {
        element.style.display = 'block';
    }

    hide($form);

    // main function declaration
    function play(quiz) {
        var score = 0; // init score
        var i = 0;
        // initialize timer and set up an interval that counts down
        var time = 20;
        hide($start);
        update($timer, time);
        var interval = window.setInterval(countDown, 1000);
        show($form);
        chooseQuestion();
        $form.addEventListener('submit', function(event) {
            event.preventDefault();
            check($form[0].value);
        }, false);

        // helper functions
        function chooseQuestion() {
            console.log("chooseQuestion() invoked");
            var question = quiz.questions[i].question;
            ask(question);
        }

        function ask(question) {
            console.log("ask() invoked");
            update($question, quiz.question + question);
            $form[0].value = '';
            $form[0].focus();
        }

        function check(answer) {
            console.log("check() invoked");
            if (answer === quiz.questions[i].answer) {
                update($feedback, 'Correct!', 'right');
                // increase score by 1
                score++;
                update($score, score);
            } else {
                update($feedback, 'Wrong!', 'wrong');
            }
            i++;
            if (i === quiz.questions.length) {
                gameOver();
            } else {

                chooseQuestion();
            }
        }

        function gameOver() {
            console.log("gameOver() invoked");
            // inform the player that the game has finished
            // and tell them how many points they have scored
            update($question, 'Game Over, you scored ' + score + ' points');
            // stop the countDown interval
            window.clearInterval(interval);
            hide($form);
            show($start);
        }

        function countDown() {
            // decrease time by 1
            time--;
            // update the time dispalyed
            update($timer, time);
            // the game is over, if the timer has reached 0
            if (time <= 0) {
                gameOver();
            }
        }
    }
}());

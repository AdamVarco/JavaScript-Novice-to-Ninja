(function () {
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
            { 'question': 'Superman', 'answer': 'Clark Kent'},
            { 'question': 'Wonderwoman', 'answer': 'Dianna Prince'},
            { 'question': 'Batman', 'answer': 'Bruce Wayne'},
        ]
    };

    hide($form);
    $start.addEventListener('click', function() {new Game(quiz);}, false);


    // Game constructor
    function Game(quiz) {
        this.questions = quiz.questions;
        this.phrase = quiz.question;
        this.score = 0; // initialize score
        this.time = 20; // initialize timer
        this.interval = window.setInterval(this.countDown.bind(this), 1000); // set up an interval that counts down

        update($score, this.score);
        update($timer, this.time);
        hide($start); // hide start button
        show($form); // show quiz form

        // add event listener to quiz form
        $form.addEventListener('click', function(event) {
            event.preventDefault();
            this.check(event.target.value);
        }.bind(this), false);
        this.chooseQuestion();
    }

    // Method definitions
    Game.prototype.chooseQuestion = function() {
        var questions = this.questions.filter(function(question) {
            return !question.asked;
        });
        if(questions.length > 0) {
            // set the current question
            this.question = questions[Math.floor(Math.random() * questions.length)];
            this.ask(this.question);
        } else {
            this.gameOver();
        }
    }

    Game.prototype.ask = function(question) {
        // This allows us to refer to the Game object as quiz inside the nested chooseOption() function,
        // because the value of this changes to the window object inside nested functions.
        var quiz = this;

        // set the question asked property to true, so it's not asked again
        question.asked = true;
        update($question, this.phrase + question.question + '?');
        // clear the previous options
        $form.innerHTML = '';
        // create an array to put the different options in and a button variable
        var options = [];
        var button;

        var option1 = chooseOption();
        options.push(option1.answer);
        var option2 = chooseOption();
        options.push(option2.answer);

        // add the actual answer at a random place in the options arrray
        options.splice(Math.floor(Math.random() * 3), 0, this.question.answer);
        // loop through each option and dispaly it as a button
        options.forEach(function (name) {
            button = document.createElement('button');
            button.value = name;
            button.textContent = name;
            $form.appendChild(button);
        });

        // choose an option from all the possible answers but
        // without choosing the answer or the same option twice
        function chooseOption() {
            var option = quiz.questions[Math.floor(Math.random() * quiz.questions.length)];

            // check to see if the option chosen is the current question or
            // already one of the options, if it is then recursively call this
            // function until it isn't
            if (option === question || options.indexOf(option.answer) !== -1) {
                return chooseOption();
            }
            return option;
        }

    }

    Game.prototype.check = function(answer) {
        if (answer === this.question.answer) {
            update($feedback, "Correct!", "correct");
            // increase score by 1
            this.score++;
            update($score, this.score)
        } else {
            update($feedback, "Wrong!", "wrong");
        }
        this.chooseQuestion();
    }

    Game.prototype.countDown = function () {
        // this is called every second and decreases the time
        // decrease time by 1
        this.time--;
        // update the time displayed
        update($timer, this.time);
        // the game is over if the timer has reached 0
        if (this.time <= 0) {
            this.gameOver();
        }
    }

    Game.prototype.gameOver = function() {
        // inform the player that the game has finished and tell them how
        // many points they have scored
        update($question, "Game Over, you scored " + this.score + " points");
        // stop the countdown interval
        window.clearInterval(this.interval);
        hide($form);
        // show($start);
    }

    // helpers
    function hide(element) {
        element.style.display = 'none';
    }

    function show(element) {
        element.style.display = 'block';
    }

    function update(element, content, klass) {
        var p = element.firstChild || document.createElement('p');

        p.textContent = content;
        element.appendChild(p);

        if (klass) {
            p.className = klass;
        }
    }
}());

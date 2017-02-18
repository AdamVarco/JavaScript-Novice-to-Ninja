(function () {
    'use strict'

    // gets the question JSON file using Ajax
    function getQuiz() {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                var quiz = JSON.parse(xhr.responseText);
                new Game(quiz);
            }
        }
        xhr.open('GET', 'https://s3.amazonaws.com/sitepoint-book-content/jsninja/quiz.json', true);
        xhr.overrideMimeType('application/json');
        xhr.send();
        update($question, 'Waiting for questions...');
    }

    // DOM references //
    var $score = document.getElementById('score');
    var $highestScore = document.getElementById('highestScore');
    var $timer = document.getElementById('timer')
    var $question = document.getElementById('question');
    var $form = document.getElementById('answer');
    var $feedback = document.getElementById('feedback');
    var $start = document.getElementById('start');

    hide($form);
    $start.addEventListener('click', getQuiz, false);


    // Game constructor
    function Game(quiz) {
        this.questions = quiz.questions;
        this.phrase = quiz.question;
        this.score = 0; // initialize score
        this.time = 15; // initialize timer
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
        update($highestScore, this.highestScore());
        this.chooseQuestion();
    }

    Game.prototype.highestScore = function() {
        if (window.localStorage) {
            // the value held in localStorage is initally null so make it 0
            var highest = localStorage.getItem('highestScore') || 0;
            // check if the hi-score has been beaten and display a message if it has
            if (this.score > highest || highest === 0) {
                localStorage.setItem('highestScore', this.score);
            }
            return localStorage.getItem('highestScore');
        }
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
            update($feedback, "Correct!", "right");
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
        update($highestScore, this.highestScore());
        hide($form);
        show($start);
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

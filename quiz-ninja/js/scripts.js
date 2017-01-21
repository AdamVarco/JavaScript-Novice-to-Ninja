
// DOM references //
var $question = document.getElementById('question');
var $score = document.getElementById('score');
var $feedback = document.getElementById('feedback');

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
    console.log(element);
    var p = element.firstChild || document.createElement('p');

    p.textContent = content;
    element.appendChild(p);

    if (klass) {
        p.className = klass;
    }
}

// start the quiz //
play(quiz);

// main function declaration
function play(quiz) {
    var score = 0; // init score
    // main game loop
    update($score, score);
    for (var i = 0, question, answer; i < quiz.questions.length; i++) {
        question = quiz.questions[i].question;
        answer = ask(question);

        check(answer);
    }
    // end of main game loop
    gameOver();

    // helper functions
    function ask(question) {
        update($question, quiz.question + question);
        return prompt('Enter your answer');
    }

    function check(answer) {
        if (answer === quiz.questions[i].answer) {
            update($feedback, 'Correct!', 'right');
            // increase score by 1
            score++;
            update($score, score);
        } else {
            update($feedback, 'Wrong!', 'wrong');
        }
    }

    function gameOver() {
        // inform the player that the game has finished
        // and tell them how many points they have scored
        update($question, 'Game Over, you scored ' + score + ' points');
    }
}

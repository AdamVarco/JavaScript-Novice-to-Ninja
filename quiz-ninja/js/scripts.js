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

var score = 0; // init score

play(quiz);

// main function declaration
function play(quiz) {
    // main game loop
    for (var i = 0, question, answer; i < quiz.questions.length; i++) {
        question = quiz.questions[i].question;
        answer = ask(question);

        check(answer);
    }
    // end of main game loop
    gameOver();

    // helper functions
    function ask(question) {
        return prompt(quiz.question + question);
    }

    function check(answer) {
        console.log(answer);
        if (answer === quiz.questions[i].answer) {
            // increase score by 1
            score++;
        } else {
            alert('Wrong!');
        }
    }

    function gameOver() {
        // inform the player that the game has finished
        // and tell them how many points they have scored
        alert('Game over, you scored ' + score + ' points');
    }
}

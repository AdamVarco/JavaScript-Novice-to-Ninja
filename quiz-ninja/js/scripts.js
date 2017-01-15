var quiz = [
    ['What is Superman\'s real name?', 'Clark Kent'],
    ['What is Wonderwoman\'s real name?', 'Dianna Prince'],
    ['What is Batman\'s real name?', 'Bruce Wayne']
];
var score = 0; // init score

play(quiz);

// main function declaration
function play(quiz) {
    // main game loop
    for (var i = 0, question, answer; i < quiz.length; i++) {
        question = quiz[i][0];
        answer = ask(question);

        check(answer);
    }
    // end of main game loop
    gameOver();

    // helper functions
    function ask(question) {
        return prompt(question); // quiz[i][0] is the ith questions
    }

    function check(answer) {
        if (answer === quiz[i][1]) {
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

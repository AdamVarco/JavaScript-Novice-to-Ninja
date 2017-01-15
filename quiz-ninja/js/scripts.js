// quiz' questions and answers
var quiz = [
    ['What is Superman\'s real name?', 'Clark Kent'],
    ['What is Wonderwoman\'s real name?', 'Dianna Prince'],
    ['What is Batman\'s real name?', 'Bruce Wayne']
];

var score = 0; // init score

for (var i = 0; i < quiz.length; i++) {
    // get answer from user
    var answer = prompt(quiz[i][0]);

    //check if answer is correct
    if (answer === quiz[i][1]) {
        alert('Correct!');
        // increase score by 1
        score++;
    } else {
        alert('Wrong!');
    }
}

alert('Game Over, you scored ' + score + ' points');

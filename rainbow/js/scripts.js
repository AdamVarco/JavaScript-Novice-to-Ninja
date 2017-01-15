var button = document.getElementById('button');
var rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

button.addEventListener('click', change);

function change() {
    document.body.style.background = rainbow[Math.floor(7*Math.random())];
};

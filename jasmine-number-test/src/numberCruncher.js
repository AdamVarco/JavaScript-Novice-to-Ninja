'use strict';

function factorsOf(number) {
    var factors = [];

    for (var i = 1; i <= Math.sqrt(number); i++) {
        if (number%i === 0) {
            factors.push(i, number/i);
        }
    }
    return factors.sort(function(a, b) {return a > b});
}

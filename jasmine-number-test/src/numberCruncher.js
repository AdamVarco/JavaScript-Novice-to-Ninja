'use strict';

function factorsOf(number) {
    var factors = [];

    for (var i = 1; i <= number; i++) {
        if (number/i === Math.floor(number/i)) {
            factors.push(i);
        }
    }
    return factors;
}

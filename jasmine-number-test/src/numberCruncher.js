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

// This will use the factorsOf() function and check to see if the number of factors in the array returned by the factorsOf()
// function is 2.
// This is because all prime numbers have precisely two factors.

function isPrime(number) {
    return factorsOf(number).length === 2;
}

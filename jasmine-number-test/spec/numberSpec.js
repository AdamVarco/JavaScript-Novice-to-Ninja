describe('The factorsOf() function', function() {
    it('should find the factors of 12', function() {
        expect(factorsOf(12)).toEqual([1, 2, 3, 4, 6, 12]);
    });
})

describe('This isPrime() function', function() {
    it('should say 2 is prime', function() {
        expect(isPrime(2)).toBe(true);
    });
    it('should say 10 is not prime', function() {
        expect(isPrime(10)).toBe(false);
    });
});

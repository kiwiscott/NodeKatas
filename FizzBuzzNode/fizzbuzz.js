var a = require('./arrayExtensions.js');

var fb = function () {
    var fizzDivisor = 3;
    var buzzDivisor = 5;
    var isDivisibleBy = function (n, divisor) {
        return (n % divisor == 0);
    }
    var isNotDivisibleBy = function (n, divisor) {
        return (n % divisor != 0);
    }
    var tests = [
         { name: 'isFizzBuzz', text: 'FizzBuzz', match: function (n) { return isDivisibleBy(n, fizzDivisor) && isDivisibleBy(n, buzzDivisor); } },
         { name: 'isFizz', text: 'Fizz', match: function (n) { return isDivisibleBy(n, fizzDivisor) && isNotDivisibleBy(n, buzzDivisor); } },
         { name: 'isBuzz', text: 'Buzz', match: function (n) { return isNotDivisibleBy(n, fizzDivisor) && isDivisibleBy(n, buzzDivisor); } },
    ];

    function valueOf(n) {
        if (isNaN(n)) {
            return new Error('n is not a number');
        }

        var testMatch = tests.firstOrDefault(function (p) { return p.match(n); }, { text: n.toString() });

        return testMatch.text;
    };

    function fizzBuzzForRange(start, end) {
        var numbers = Array.fromNumberRange(start, end);
        return numbers.select(function (i) {
            var fizzBuzzValue = valueOf(i);
            return { number: i, value: fizzBuzzValue };
        });
    }

    return {
        valueOf: valueOf,
        fizzBuzzForRange: fizzBuzzForRange
    };
}();
module.exports = fb;


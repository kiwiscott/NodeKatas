var fizzBuzz = require('./../fizzbuzz.js');
var should = require('should');
/*
Write a program that prints the numbers from 1 to 100. 
But For multiples of 3 print “Fizz” instead of the number 
and for the multiples of five print “Buzz”. 
For numbers which are multiple of both 3 and 5, print “FizzBuzz”.
*/
describe('FizzBuzz', function () {
    describe('For non-multiples of 3 and 5 print the number', function () {
        it('should return 2 when 2', function () {
            fizzBuzz.valueOf(2).should.equal('2');
        })
        it('should return Fizz when the value is 14', function () {
            fizzBuzz.valueOf(14).should.equal('14');
        })
    });

    describe('For multiples of 3 print “Fizz”', function () {
        it('should return Fizz when the value is 3', function () {
            fizzBuzz.valueOf(3).should.equal('Fizz');
        })
        it('should return Fizz when the value is 6', function () {
            fizzBuzz.valueOf(6).should.equal('Fizz');
        })
    });

    describe('If the value isnot a number return and error', function () {
        it('should return an error when the value is "Scott"', function () {
            should(fizzBuzz.valueOf('Scott')).Error;
        })
    });


    describe('For multiples of 5 print “Buzz”', function () {
        it('should return Buzz when the value is 5', function () {
            fizzBuzz.valueOf(5).should.equal('Buzz');
        })
        it('should return Fizz when the value is 10', function () {
            fizzBuzz.valueOf(10).should.equal('Buzz');

        })
    });

    describe('For numbers which are multiple of both 3 and 5, print “FizzBuzz”.', function () {
        it('should return FizzBuzz when the number is 15', function () {
            fizzBuzz.valueOf(15).should.equal('FizzBuzz');
        })
    });
})

describe('FizzBuzz Range', function () {
    describe('Write a program that prints the numbers from 1 to 100', function () {
        it('should return a simple array for 1..10', function () {
            var numbers = [{ number: 1, value: "1" }, { number: 2, value: "2" }, { number: 3, value: "Fizz" }, { number: 4, value: "4" }, { number: 5, value: "Buzz" }, { number: 6, value: "Fizz" }, { number: 7, value: "7" }, { number: 8, value: "8" }, { number: 9, value: "Fizz" }, { number: 10, value: "Buzz" }];
            fizzBuzz.fizzBuzzForRange(1, 10).should.eql(numbers);
        })

        it('should return a simple array for 1..100', function () {
            var numbers = [{ number: 1, value: "1" }, { number: 2, value: "2" }, { number: 3, value: "Fizz" }, { number: 4, value: "4" }, { number: 5, value: "Buzz" }, { number: 6, value: "Fizz" }, { number: 7, value: "7" }, { number: 8, value: "8" }, { number: 9, value: "Fizz" }, { number: 10, value: "Buzz" }, { number: 11, value: "11" }, { number: 12, value: "Fizz" }, { number: 13, value: "13" }, { number: 14, value: "14" }, { number: 15, value: "FizzBuzz" }, { number: 16, value: "16" }, { number: 17, value: "17" }, { number: 18, value: "Fizz" }, { number: 19, value: "19" }, { number: 20, value: "Buzz" }, { number: 21, value: "Fizz" }, { number: 22, value: "22" }, { number: 23, value: "23" }, { number: 24, value: "Fizz" }, { number: 25, value: "Buzz" }, { number: 26, value: "26" }, { number: 27, value: "Fizz" }, { number: 28, value: "28" }, { number: 29, value: "29" }, { number: 30, value: "FizzBuzz" }, { number: 31, value: "31" }, { number: 32, value: "32" }, { number: 33, value: "Fizz" }, { number: 34, value: "34" }, { number: 35, value: "Buzz" }, { number: 36, value: "Fizz" }, { number: 37, value: "37" }, { number: 38, value: "38" }, { number: 39, value: "Fizz" }, { number: 40, value: "Buzz" }, { number: 41, value: "41" }, { number: 42, value: "Fizz" }, { number: 43, value: "43" }, { number: 44, value: "44" }, { number: 45, value: "FizzBuzz" }, { number: 46, value: "46" }, { number: 47, value: "47" }, { number: 48, value: "Fizz" }, { number: 49, value: "49" }, { number: 50, value: "Buzz" }, { number: 51, value: "Fizz" }, { number: 52, value: "52" }, { number: 53, value: "53" }, { number: 54, value: "Fizz" }, { number: 55, value: "Buzz" }, { number: 56, value: "56" }, { number: 57, value: "Fizz" }, { number: 58, value: "58" }, { number: 59, value: "59" }, { number: 60, value: "FizzBuzz" }, { number: 61, value: "61" }, { number: 62, value: "62" }, { number: 63, value: "Fizz" }, { number: 64, value: "64" }, { number: 65, value: "Buzz" }, { number: 66, value: "Fizz" }, { number: 67, value: "67" }, { number: 68, value: "68" }, { number: 69, value: "Fizz" }, { number: 70, value: "Buzz" }, { number: 71, value: "71" }, { number: 72, value: "Fizz" }, { number: 73, value: "73" }, { number: 74, value: "74" }, { number: 75, value: "FizzBuzz" }, { number: 76, value: "76" }, { number: 77, value: "77" }, { number: 78, value: "Fizz" }, { number: 79, value: "79" }, { number: 80, value: "Buzz" }, { number: 81, value: "Fizz" }, { number: 82, value: "82" }, { number: 83, value: "83" }, { number: 84, value: "Fizz" }, { number: 85, value: "Buzz" }, { number: 86, value: "86" }, { number: 87, value: "Fizz" }, { number: 88, value: "88" }, { number: 89, value: "89" }, { number: 90, value: "FizzBuzz" }, { number: 91, value: "91" }, { number: 92, value: "92" }, { number: 93, value: "Fizz" }, { number: 94, value: "94" }, { number: 95, value: "Buzz" }, { number: 96, value: "Fizz" }, { number: 97, value: "97" }, { number: 98, value: "98" }, { number: 99, value: "Fizz" }, { number: 100, value: "Buzz" }];
            fizzBuzz.fizzBuzzForRange(1, 100).should.eql(numbers);
        })
    });
})

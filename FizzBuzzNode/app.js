/*
Write a program that prints the numbers from 1 to 100. 
But For multiples of 3 print “Fizz” instead of the number 
and for the multiples of five print “Buzz”. 
For numbers which are multiple of both 3 and 5, print “FizzBuzz”.
*/
var fizzBuzz = require('./fizzbuzz.js');

var rangeOfValues = fizzBuzz.fizzBuzzForRange(1, 100);
rangeOfValues.forEach(function (resultNumberValue) {
    console.log(resultNumberValue.value);
});

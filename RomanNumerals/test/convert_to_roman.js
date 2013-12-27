var romanConvertor = require('./../romanConvertor.js');
var should = require('should');
var knownValues = [
        [1, 'I'],
        [4, 'IV'],
       [5, 'V'],
       [7, 'VII'],
       [10, 'X'],
       [11, 'XI'],
       [12, 'XII'],
       [50, 'L'],
       [80, 'LXXX'],
       [90, 'XC'],
       [99, 'XCIX'],
       [100, 'C'],
       [400, 'CD'],
       [456, 'CDLVI'],
       [500, 'D'],
       [800, 'DCCC'],
       [1000, 'M'],
       [1984, 'MCMLXXXIV'],
       [2013, 'MMXIII'],
       [4608, 'MMMMDCVIII']
];
describe('Decimal to Roman', function () {

    knownValues.forEach(function (romanPair) {
        var decimalNumber = romanPair[0];
        var romanNumeral = romanPair[1];

        it(romanNumeral + ' = ' + decimalNumber, function () {
            romanConvertor.toRoman(decimalNumber).should.equal(romanNumeral);
        })
    });
});
describe('Roman To Decimal', function () {

    knownValues.forEach(function (romanPair) {
        var decimalNumber = romanPair[0];
        var romanNumeral = romanPair[1];

        it(romanNumeral + ' = ' + decimalNumber, function () {
            romanConvertor.toDecimal(romanNumeral).should.equal(decimalNumber);
        })
    });

    it('Roman Scott is not valid throw error', function () {
        (function () {
            romanConvertor.toDecimal('Scott');
        }).should.throw();
    });
});

describe('Romans Never understood 0', function () {
    it('0 should return empty', function () {
        romanConvertor.toRoman(0).should.equal('');
    });
    it('Cant Map decimal 0 as the romans did not have it', function () {
        (function () {
            romanConvertor.toDecimal('');
        }).should.throw();
    });
});


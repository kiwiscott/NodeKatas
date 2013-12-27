/*
http://codingdojo.org/cgi-bin/wiki.pl?KataRomanNumerals

The Romans were a clever bunch. They conquered most of Europe and ruled it for hundreds of years. They invented concrete and straight roads and even bikinis[1]. One thing they never discovered though was the number zero. This made writing and dating extensive histories of their exploits slightly more challenging, but the system of numbers they came up with is still in use today. For example the BBC uses Roman numerals to date their programmes.

The Romans wrote numbers using letters - I, V, X, L, C, D, M. (notice these letters have lots of straight lines and are hence easy to hack into stone tablets)

The Kata says you should write a function to convert from normal numbers to Roman Numerals: eg

     1 --> I
     10 --> X
     7 --> VII
*/
var romanConvertor = function () {
    var romanRegex = new RegExp('^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$');

    var romanConversions = [
        { decimal: 1000, roman: 'M' },
        { decimal: 900, roman: 'CM' },
        { decimal: 500, roman: 'D' },
        { decimal: 400, roman: 'CD' },
        { decimal: 100, roman: 'C' },
        { decimal: 90, roman: 'XC' },
        { decimal: 50, roman: 'L' },
        { decimal: 10, roman: 'X' },
        { decimal: 9, roman: 'IX' },
        { decimal: 5, roman: 'V' },
        { decimal: 4, roman: 'IV' },
        { decimal: 1, roman: 'I' },
    ];

    function toRoman(decimal) {
        var result = '';

        while (decimal > 0) {
            loopAllConvertors(function (roman, decimalConversion) {
                if (decimalConversion <= decimal) {
                    decimal = decimal - decimalConversion;
                    result += roman;
                    return true;
                }
                return false;
            });
        }
        return result;
    };


    function toDecimal(roman) {
        if (roman == '' || !roman.match(romanRegex)) {
            throw new Error('String roman is invalid');
        }

        var result = 0;
        while (roman.length > 0) {
            loopAllConvertors(function (romanNumeral, decimal) {
                if (roman.indexOf(romanNumeral) == 0) {
                    roman = roman.substring(romanNumeral.length);
                    result += decimal;
                    return true;
                }
                return false;
            });
        }

        return result;
    };

    function loopAllConvertors(callback) {
        for (var i = 0; i < romanConversions.length; i++) {
            var result = callback(romanConversions[i].roman, romanConversions[i].decimal);
            if (result) break;
        }
    }

    return {
        toRoman: toRoman,
        toDecimal: toDecimal
    };
}();

module.exports = romanConvertor;



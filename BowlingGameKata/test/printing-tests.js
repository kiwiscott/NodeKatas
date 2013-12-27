var game = require('./../bowling.js');
var Scorecard = require('./../bowling-scorecard.js');
var scorecard = new Scorecard();
var should = require('should');
/*
Expanding on the last Problem print the current score in ascii after each bowl
-You can only print the score for a frame when the score is known
|__1__|__2__|__3__|__4__|__5__|__6__|__7__|__8__|__9__|__10___|
|   |X|  8|/|  3|6|   |X|  9|/|  8|/|   |X|  9|/|  9|G|  X|X|X|
|  20 |  33 |  42 |  62 |  80 | 100 | 120 | 139 | 148 |  178  |
|_____|_____|_____|_____|_____|_____|_____|_____|_____|_______|
*/
var header = '|__1__|__2__|__3__|__4__|__5__|__6__|__7__|__8__|__9__|__10___|\n';
var footer = '|_____|_____|_____|_____|_____|_____|_____|_____|_____|_______|\n';


describe('Score Board -Ten Pin Bowling', function () {
    it('Empty Board', function () {
        var b = new game();
        var board = header;
        board += '|   | |   | |   | |   | |   | |   | |   | |   | |   | |   | | |\n';
        board += '|     |     |     |     |     |     |     |     |     |       |\n';
        board += footer;
        scorecard.render(b).should.equal(board);
    });
    it('Rolled One Strike Nothing Should Be Complete', function () {
        var b = new game();
        b.roll(10);
        var board = header;
        board += '|   |X|   | |   | |   | |   | |   | |   | |   | |   | |   | | |\n';
        board += '|     |     |     |     |     |     |     |     |     |       |\n';
        board += footer;
        scorecard.render(b).should.equal(board);
    });
    it('Rolled Three Strikes First Frame Only Should Be Complete', function () {
        var b = new game();        
        rollAll(b, 3, 10);
        var board = header;
        board += '|   |X|   |X|   |X|   | |   | |   | |   | |   | |   | |   | | |\n';
        board += '|  30 |     |     |     |     |     |     |     |     |       |\n';
        board += footer;
        scorecard.render(b).should.equal(board);
    });
    it('Rolled 1 then 9 ten Last Frame Only Should Not Be Complete', function () {
        var b = new game();
        for (var i = 0; i < 10; i++) {
            b.roll(1);
            b.roll(9);
        }
        var board = header;
        board += '|  1|/|  1|/|  1|/|  1|/|  1|/|  1|/|  1|/|  1|/|  1|/|  1|/| |\n';
        board += '|  11 |  22 |  33 |  44 |  55 |  66 |  77 |  88 |  99 |       |\n';
        board += footer;
        scorecard.render(b).should.equal(board);
    });
    it('Rolled 10 Strikes Game Not Complete', function () {
        var b = new game();
        rollAll(b, 10, 10);
        var board = header;
        board += '|   |X|   |X|   |X|   |X|   |X|   |X|   |X|   |X|   |X|  X| | |\n';
        board += '|  30 |  60 |  90 | 120 | 150 | 180 | 210 | 240 |     |       |\n';
        board += footer;
        scorecard.render(b).should.equal(board);
    });
    it('Rolled All Twos', function () {
        var b = new game();
        rollAll(b, 20, 2);
        var board = header;
        board += '|  2|2|  2|2|  2|2|  2|2|  2|2|  2|2|  2|2|  2|2|  2|2|  2|2| |\n';
        board += '|   4 |   8 |  12 |  16 |  20 |  24 |  28 |  32 |  36 |   40  |\n';
        board += footer;
        scorecard.render(b).should.equal(board);
    });
    it('Rolled All 5s - Resulting In Spears', function () {
        var b = new game();
        rollAll(b, 21, 5);
        var board = header;
        board += '|  5|/|  5|/|  5|/|  5|/|  5|/|  5|/|  5|/|  5|/|  5|/|  5|/|5|\n';
        board += '|  15 |  30 |  45 |  60 |  75 |  90 | 105 | 120 | 135 |  150  |\n';
        board += footer;

        scorecard.render(b).should.equal(board);
    });
    it('Rolled All Strikes except last two bonus - Resulting In Spears', function () {
        var b = new game();
        rollAll(b, 10, 10);
        b.roll(0);
        b.roll(0);
        var board = header;
        board += '|   |X|   |X|   |X|   |X|   |X|   |X|   |X|   |X|   |X|  X|0|0|\n';
        board += '|  30 |  60 |  90 | 120 | 150 | 180 | 210 | 240 | 260 |  270  |\n';
        board += footer;

        scorecard.render(b).should.equal(board);
    });

    it('Rolled All Strikes - Resulting In Spears', function () {
        var b = new game();
        rollAll(b, 12, 10);
        var board = header;
        board += '|   |X|   |X|   |X|   |X|   |X|   |X|   |X|   |X|   |X|  X|X|X|\n';
        board += '|  30 |  60 |  90 | 120 | 150 | 180 | 210 | 240 | 270 |  300  |\n';
        board += footer;

        scorecard.render(b).should.equal(board);
    });

    var rollAll = function (game, rollXTimes, pinsToKnockDown) {
        for (var i = 0; i < rollXTimes; i++) {
            game.roll(pinsToKnockDown);
        };
    };
});
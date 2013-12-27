var game = require('./../bowling.js');
var should = require('should');
/*
Bowling Kata - Based on Uncle Bob
Linked From -http://codingdojo.org/cgi-bin/wiki.pl?KataBowling


*/
describe('Ten Pin Bowling', function () {
    describe('Set Up', function () {
        it('A game has 10 frames', function () {
            var b = new game();
            b.frames.length.should.equal(10);
        });

        it('should return 1 when only 1 pin hit', function () {
            var b = new game();
            b.roll(1);
            b.roll(0);
            b.score().should.equal(1);
        })

        it('should return 0 when no pins hit', function () {
            var b = new game();
            b.roll(0);
            b.roll(0);
            b.score().should.equal(0);
        })
        it('Rolling 2 Pins will result in a complete frame', function () {
            var b = new game();
            b.roll(4);
            b.roll(5);
            var frame = b.frames[0];
            frame.firstRoll.should.equal(4);
            frame.secondRoll.should.equal(5);
            frame.isComplete().should.equal(true);
        });

        it('A strike should take the next two rolls append it to the frame score', function () {
            var b = new game();
            b.roll(10);
            b.roll(5);
            b.roll(4);
            b.roll(0); //Must complete the Frame
            b.score().should.equal(28);
        });

        it('A spare should take the next roll and append it to the frame score', function () {
            var b = new game();
            b.roll(9);
            b.roll(1);
            b.roll(9);
            b.roll(0); //Must complete the Frame
            b.score().should.equal(28);
        });
    })
    describe('Games', function () {
        it('Rolling All Ones should Equal 20', function () {
            var b = new game();
            rollAll(b, 20, 1);
            b.score().should.equal(20);
        })
        it('1 strikes should equal 0', function () {
            var b = new game();
            b.roll(10);
            b.score().should.equal(-1);
        });

        it('12 strikes should equal 300 - a perfect game', function () {
            var b = new game();
            rollAll(b, 12, 10);
            b.score().should.equal(300);
        });
        //"9-9-9-9-9-9-9-9-9-9-" (20 rolls: 10 pairs of 9 and miss) = 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 + 9 = 90
        it('All 9s then 0s should be 90', function () {
            var b = new game();
            for (var i = 0; i < 10; i++) {
                b.roll(9);
                b.roll(0);
            }
            b.score().should.equal(90);
        });

        it('Rolled 1 then 9 ten times the score should be -1 as there is still one roll to go', function () {
            var b = new game();
            for (var i = 0; i < 10; i++) {
                b.roll(1);
                b.roll(9);
            }
            b.score().should.equal(-1);
        });


        //"5/5/5/5/5/5/5/5/5/5/5" (21 rolls: 10 pairs of 5 and spare, with a final 5) = 10+5 + 10+5 + 10+5 + 10+5 + 10+5 + 10+5 + 10+5 + 10+5 + 10+5 + 10+5 = 150
        it('All 5s should be 150', function () {
            var b = new game();
            rollAll(b, 21, 5);
            b.score().should.equal(150);
        });

        it('11 strikes and a 9 should equal should equal 299', function () {
            var b = new game();
            rollAll(b, 11, 10);
            b.roll(9);
            b.score().should.equal(299);
        });
    })

    var rollAll = function (game, rollXTimes, pinsToKnockDown) {
        for (var i = 0; i < rollXTimes; i++) {
            game.roll(pinsToKnockDown);
        };
    };
});


var framesPerGame = 10;
var allpins = 10;
var notRolledYet = -1;
var cannotCalculateScore = -1;

function Frame(id) {
    this.rolls = new Array(notRolledYet, notRolledYet, notRolledYet);
    this.nextFrame = null;
    this.id = id; 

    this.knockDown = function (pinsKnockedDown) {

        if (this.rolls[0] == notRolledYet) {
            this.rolls[0] = pinsKnockedDown;

            if (!this.isLastFrame() && pinsKnockedDown == allpins) {
                this.rolls[1] = 0;
            }
        }
        else if (this.rolls[1] == notRolledYet) {
            this.rolls[1] = pinsKnockedDown;
        }
        else if (this.rolls[2] == notRolledYet) {
            this.rolls[2] = pinsKnockedDown;
        }
    };

    this.isStrike = function () {
        return allpins == this.rolls[0];
    };
    this.isSpear = function () {
        return (allpins != this.rolls[0]) && allpins == (this.rolls[0] + this.rolls[1]);
    };
    this.isComplete = function () {
        return (this.rolls[0] != notRolledYet && this.rolls[1] != notRolledYet);
    };
    this.isLastFrame = function () {
        return this.nextFrame == null;
    };

    this.score = function () {
        if (!this.isComplete()) {
            return cannotCalculateScore;
        }

        if (this.isSpear()) {
            return this.scoreSpearOrStrike(1);
        }
        if (this.isStrike()) {
            return this.scoreSpearOrStrike(2);
        }
        return this.rolls[0] + this.rolls[1];
    }

    this.pinsKnockedDownInFrame = function () {
        return this.rolls;
    }



    this.scoreSpearOrStrike = function (numberOfRollsToFind) {
        if (this.isLastFrame() && this.rolls[2] == notRolledYet) {
            return cannotCalculateScore;
        }
        else if (this.isLastFrame()) {
            return this.rolls[0] + this.rolls[1] + this.rolls[2];
        }
        else {
            var nextRollValue = this.nextFrame.FindNextRollValue(numberOfRollsToFind);
            if (nextRollValue == cannotCalculateScore) {
                return cannotCalculateScore;
            }
            return this.rolls[0] + this.rolls[1] + nextRollValue;
        }
    }

    this.FindNextRollValue = function (numberOfRolls) {
        if (numberOfRolls == 1) {
            return (this.rolls[0] == notRolledYet) ? cannotCalculateScore : this.rolls[0];
        }

        if (numberOfRolls == 2) {
            if (this.rolls[1] == notRolledYet) {
                return cannotCalculateScore;
            } else if (this.isStrike() && this.isLastFrame() && this.rolls[2] == notRolledYet) {
                return cannotCalculateScore;
            } else if (this.isStrike() && this.isLastFrame()) {
                return this.rolls[0] + this.rolls[1];
            } else if (this.isStrike()) {
                var nextRoll = this.nextFrame.FindNextRollValue(1);
                if (nextRoll == -1)
                    return cannotCalculateScore;

                return this.rolls[0] + nextRoll;
            }
            else {
                return this.rolls[0] + this.rolls[1];
            }
        }
    }

}

function Game() {
    this.frames = new Array(10);
    this.init = function () {
        for (var i = 0; i < 10; i++) {
            this.frames[i] = new Frame(i);
            if (i != 0) {
                this.frames[i - 1].nextFrame = this.frames[i];
            }
        }
    }

    this.init();

    this.currentFrame = function () {
        for (var i = 0; i < this.frames.length; i++) {
            var frameo = this.frames[i];

            if (!frameo.isComplete() || frameo.isLastFrame()) {
                return frameo;
            }
        };
    }

    this.score = function () {
        return this.scoreAfterFrame(this.frames.length);
    }

    this.scoreAfterFrame = function (untilFrameIndex) {
        var total = 0;
        for (var i = 0; i < untilFrameIndex; i++) {
            var frame = this.frames[i];
            var frameScore = frame.score();
            if (frameScore == cannotCalculateScore) {
                return cannotCalculateScore;
            }
            
            total += frameScore;
        };
        return total;
    }

    this.roll = function (pinsKnockedDown) {
        var framex = this.currentFrame();
        framex.knockDown(pinsKnockedDown);
    };
}

module.exports = Game;

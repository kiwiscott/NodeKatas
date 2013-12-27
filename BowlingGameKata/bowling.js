var framesPerGame = 10;
var allpins = 10;
var notRolledYet = -1;
var cannotCalculateScore = -1;

function Frame(index) {
    this.index = index;
    this.firstRoll = notRolledYet;
    this.secondRoll = notRolledYet;
}
Frame.prototype.knockDown = function (pinsKnockedDown) {
    if (this.firstRoll == notRolledYet) {
        this.firstRoll = pinsKnockedDown;
        if (pinsKnockedDown == allpins) {
            this.secondRoll = 0;
        }
    }
    else if (this.secondRoll == notRolledYet) {
        this.secondRoll = pinsKnockedDown;
    }
};
Frame.prototype.isStrike = function () {
    return allpins == this.firstRoll;
};
Frame.prototype.isSpear = function () {
    return (allpins != this.firstRoll) && allpins == this.firstRoll + this.secondRoll;
};
Frame.prototype.isComplete = function () {
    return (this.firstRoll != notRolledYet && this.secondRoll != notRolledYet);
};
Frame.prototype.isLastFrame = function () {
    return false;
};
Frame.prototype.score = function (nextPinAfter, nextPinAfterThat) {
    if (!this.isComplete())
        return 0;
    var frameTotal = this.firstRoll + this.secondRoll;
    if (this.isSpear()) {
        if (nextPinAfter == notRolledYet) {
            return cannotCalculateScore;
        }
        return frameTotal + nextPinAfter;
    }
    else if (this.isStrike()) {
        if (nextPinAfter == notRolledYet || nextPinAfterThat == notRolledYet) {
            return cannotCalculateScore;
        }
        return frameTotal + nextPinAfter + nextPinAfterThat;
    }
    return frameTotal;
};

function LastFrame() {
    this.bonusThirdRoll = notRolledYet;
    this.bonusFourthRoll = notRolledYet;
    Frame.apply(this, Array.prototype.slice.call(arguments));
};
LastFrame.prototype = new Frame();
LastFrame.prototype.score = function (nextPinAfter, nextPinAfterThat) {
    if (this.isSpear() && this.bonusThirdRoll == notRolledYet) {
        return cannotCalculateScore;
    }
    if (this.isStrike() && (this.bonusThirdRoll == notRolledYet || this.bonusFourthRoll == notRolledYet)) {
        return cannotCalculateScore;
    }

    var minThirdRoll = this.bonusThirdRoll == notRolledYet ? 0 : this.bonusThirdRoll;
    var minFourthRoll = this.bonusFourthRoll == notRolledYet ? 0 : this.bonusFourthRoll;
    return Frame.prototype.score.call(this, minThirdRoll, minFourthRoll);
};
LastFrame.prototype.knockDown = function (pinsKnockedDown) {
    if (!this.isComplete()) {
        Frame.prototype.knockDown.call(this, pinsKnockedDown);

    } else if (this.bonusThirdRoll == notRolledYet) {
        this.bonusThirdRoll = pinsKnockedDown;
    }
    else if (this.bonusFourthRoll == notRolledYet) {
        this.bonusFourthRoll = pinsKnockedDown;
    }
};
LastFrame.prototype.isLastFrame = function () {
    return true;
};

function Game() {
    this.frames = new Array();
    this.init = function () {
        for (var i = 0; i < 9; i++) {
            this.frames.push(new Frame(i));
        }
        this.frames.push(new LastFrame(i));
    }
    this.init();
}
Game.prototype.score = function () {
    return this.scoreAfterFrame(this.frames.length);
}
Game.prototype.scoreAfterFrame = function (untilFrameIndex) {
    var total = 0;
    for (var i = 0; i < untilFrameIndex; i++) {
        rollAfter = 0;
        rollAfterThat = 0;
        var nextFrame = this.frames[i + 1];

        if (nextFrame != undefined) {
            rollAfter = nextFrame.firstRoll;
            rollAfterThat = nextFrame.secondRoll;

            if (nextFrame.isStrike()) {
                if (nextFrame.isLastFrame()) {
                    rollAfterThat = nextNextFrame.bonusThirdRoll;
                }
                else {
                    var nextNextFrame = this.frames[i + 1 + 1];
                    if (nextNextFrame != undefined) {
                        rollAfterThat = nextNextFrame.firstRoll;
                    }
                }
            }
        }
        var frameScore = this.frames[i].score(rollAfter, rollAfterThat);
        if (frameScore == cannotCalculateScore) {
            return cannotCalculateScore;
        }
        total += frameScore;
    };
    return total;
}

Game.prototype.currentFrame = function () {
    for (var i = 0; i < this.frames.length; i++) {
        if (!this.frames[i].isComplete() || this.frames[i].isLastFrame()) {
            return this.frames[i];
        }
    };
}
Game.prototype.roll = function (pinsKnockedDown) {
    var frame = this.currentFrame();
    frame.knockDown(pinsKnockedDown);
};

module.exports = Game;

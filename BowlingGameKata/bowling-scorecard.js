

function ScoreCard() {
    this.newline = '\n';
    var frameheader = '|__%INDEX%__';
    var lastFrameheader = '|__%INDEX%___|';

    var frameRow = '|  %FIRST%|%SECOND%';
    var lastFrameRow = '|  %FIRST%|%SECOND%|%THIRD%|';

    var totalRow = '| %TOTAL% ';
    var lastTotalRow = '|  %TOTAL%  |';

    var lastFrameFooter = '|_______|';
    var frameFooter = '|_____';
    
    this.header = function (game) {
        return buildRowFromFrames(game,
            function (frame) {
                var frameHead = frame.isLastFrame() ? lastFrameheader : frameheader;
                frameHead = frameHead.replace(/%INDEX%/gi, frame.index + 1);
                return frameHead;
            });
    }

    this.totalRow = function (game) {
        return buildRowFromFrames(game,
           function (frame) {
               var totalTemplate = frame.isLastFrame() ? lastTotalRow : totalRow;

               var canRender = frame.isComplete();
               if (canRender) {
                   var scoreAfterFrame = game.scoreAfterFrame(frame.index + 1);
                   if (scoreAfterFrame == -1) {
                       canRender = false;
                   }
               }

               totalTemplate = canRender
                   ? totalTemplate.replace(/%TOTAL%/gi, pad3(scoreAfterFrame))
                   : totalTemplate.replace(/%TOTAL%/gi, '   ');
               return totalTemplate;
           });
    }

    this.frameRows = function (game) {
        var theRow = '';
        game.frames.forEach(function (frame) {
            var rowTemplate = '';
            rowTemplate = frame.isLastFrame() ? lastFrameRow : frameRow;

            if (frame.isLastFrame()) {

                if (frame.isStrike()) {
                    rowTemplate = rowTemplate.replace(/%FIRST%/gi, 'X');
                    rowTemplate = rowTemplate.replace(/%SECOND%/gi, frame.bonusThirdRoll == -1 ? ' ' : frame.bonusThirdRoll === 10 ? 'X' : frame.bonusThirdRoll);
                    rowTemplate = rowTemplate.replace(/%THIRD%/gi, frame.bonusFourthRoll == -1 ? ' ' : frame.bonusFourthRoll === 10 ? 'X' : frame.bonusFourthRoll);
                }
                else if (frame.isSpear()) {
                    rowTemplate = rowTemplate.replace(/%FIRST%/gi, frame.firstRoll == -1 ? ' ' : frame.firstRoll);
                    rowTemplate = rowTemplate.replace(/%SECOND%/gi, '/');
                    rowTemplate = rowTemplate.replace(/%THIRD%/gi, frame.bonusThirdRoll == -1 ? ' ' : frame.bonusThirdRoll == 10 ? 'X' : frame.bonusThirdRoll);
                }
                else {
                    rowTemplate = rowTemplate.replace(/%FIRST%/gi, frame.firstRoll == -1 ? ' ' : frame.firstRoll);
                    rowTemplate = rowTemplate.replace(/%SECOND%/gi, frame.secondRoll == -1 ? ' ' : frame.secondRoll);
                    rowTemplate = rowTemplate.replace(/%THIRD%/gi, ' ');
                }
            }
            else {
                if (frame.isStrike()) {
                    rowTemplate = rowTemplate.replace(/%FIRST%/gi, ' ');
                    rowTemplate = rowTemplate.replace(/%SECOND%/gi, 'X');
                }
                else if (frame.isSpear()) {
                    rowTemplate = rowTemplate.replace(/%FIRST%/gi, frame.firstRoll == -1 ? ' ' : frame.firstRoll);
                    rowTemplate = rowTemplate.replace(/%SECOND%/gi, '/');
                }
                else {
                    rowTemplate = rowTemplate.replace(/%FIRST%/gi, frame.firstRoll == -1 ? ' ' : frame.firstRoll);
                    rowTemplate = rowTemplate.replace(/%SECOND%/gi, frame.secondRoll == -1 ? ' ' : frame.secondRoll);
                }
            }

            theRow += rowTemplate;
        });
        return theRow;
    }

    this.footer = function (game) {
        return buildRowFromFrames(game,
           function (frame) {
               return frame.isLastFrame() ? lastFrameFooter : frameFooter;
           });
    }

    function pad3(n) {
        if (n < 10) return ("  " + n);
        if (n < 100) return (" " + n);
        return n.toString();
    }

    function buildRowFromFrames(game, callBack) {
        var theRow = '';
        game.frames.forEach(function (frame) { theRow += callBack(frame) });
        return theRow;
    }
}

ScoreCard.prototype.render = function (game) {
    var boardrendered = '';
    boardrendered += this.header(game);
    boardrendered += this.newline;
    boardrendered += this.frameRows(game);
    boardrendered += this.newline;
    boardrendered += this.totalRow(game);
    boardrendered += this.newline;
    boardrendered += this.footer(game);
    boardrendered += this.newline;
    return boardrendered;
};

module.exports = ScoreCard;

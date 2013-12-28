

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
            function (frame, index) {
                var frameHead = frame.isLastFrame() ? lastFrameheader : frameheader;
                frameHead = frameHead.replace(/%INDEX%/gi, index + 1);
                return frameHead;
            });
    }

    this.totalRow = function (game) {
        return buildRowFromFrames(game,
           function (frame, index) {
               var totalTemplate = frame.isLastFrame() ? lastTotalRow : totalRow;

               scoreAfterFrame = 0;
               var canRender = frame.isComplete();
               if (canRender) {
                   scoreAfterFrame = game.scoreAfterFrame(index + 1);
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

            var pinsKnockedDownInFrame = frame.pinsKnockedDownInFrame();

            rowTemplate = rowTemplate.replace(/%FIRST%/gi, valueFor(1, pinsKnockedDownInFrame));
            rowTemplate = rowTemplate.replace(/%SECOND%/gi, valueFor(2, pinsKnockedDownInFrame));
            rowTemplate = rowTemplate.replace(/%THIRD%/gi, valueFor(3, pinsKnockedDownInFrame));
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
    function valueFor(column, pinsKnockedDown) {
        value = -1;
        switch (column) {
            case 1:
                value = pinsKnockedDown[0] == 10 && pinsKnockedDown[1] == 0 && pinsKnockedDown[2] == -1 ? -1 : pinsKnockedDown[0];
                break;
            case 2:
                value = (pinsKnockedDown[0] == 10 && pinsKnockedDown[1] == 0 && pinsKnockedDown[2] == -1) ? 10
                : pinsKnockedDown[1] == 0 ? 0
                : (pinsKnockedDown[0] + pinsKnockedDown[1] == 10) ? '\/'
                : pinsKnockedDown[1];
                break;
            default:
                value = pinsKnockedDown[2];
        }

        if (value == -1) return ' ';
        if (value == 0) return '-';
        if (value == 10) return 'X';
        return value;
    }

    function buildRowFromFrames(game, callBack) {
        var theRow = '';
        game.frames.forEach(function (frame, i) { theRow += callBack(frame, i) });
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

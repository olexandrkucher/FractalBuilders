function Exercise16(canvasId) {
    var canvas = document.getElementById(canvasId);

    this.arrow = 10;
    this.xRetreat = 50;
    this.yRetreat = 50;
    this.numberCount = 10;
    this.xMultiplier = 1000;
    this.width = canvas.width;
    this.height = canvas.height;

    if (!canvas.getContext) {
        return;
    }

    this.context = canvas.getContext('2d');
    this.context.font = "14pt Helvetica";
    this.context.fillStyle = "black";
    this.context.lineWidth = 1;
}

Exercise16.prototype.build = function(missDigits, radix, iterations) {
    this.radix = radix || 10;
    this.iterations = iterations || 1000;
    this.buildFractal(missDigits);
    this.ruler();
};

Exercise16.prototype.buildFractal = function(missDigits) {
    var missDigitsStr = this.missDigitsToString(missDigits);

    for(var i = 0; i < this.iterations; i++) {
        if(!this.containsMissNumber(missDigitsStr, i)) {
            this.point(i);
        }
    }
};

Exercise16.prototype.containsMissNumber = function(missDigitsStr, currentNumber) {
    var currentNumberStr = currentNumber.toString(this.radix);
    for (var i = 0; i < missDigitsStr.length; i++) {
        if (currentNumberStr.indexOf(missDigitsStr[i]) != -1) {
            return true;
        }
    }
    return false;
};

Exercise16.prototype.missDigitsToString = function(missDigits) {
    var missDigitsStr = [];
    for (var i = 0; i < missDigits.length; i++) {
        missDigitsStr.push(String(missDigits[i]));
    }
    return missDigitsStr;
};

Exercise16.prototype.point = function(x){
    this.context.fillRect(x + this.xRetreat, this.yRetreat + 10, 1, 5);
};

Exercise16.prototype.ruler = function() {
    var xShift = this.xMultiplier / this.numberCount;
    this.context.beginPath();

    /** x coordinate line **/
    this.context.moveTo(0, this.yRetreat);
    this.context.lineTo(this.width, this.yRetreat);

    this.context.moveTo(this.width - this.arrow, this.yRetreat - this.arrow);
    this.context.lineTo(this.width, this.yRetreat);
    this.context.lineTo(this.width - this.arrow, this.yRetreat + this.arrow);
    /** x coordinate line **/

    /** y coordinate line **/
    this.context.moveTo(this.xRetreat, 0);
    this.context.lineTo(this.xRetreat, this.height);

    this.context.moveTo(this.xRetreat - this.arrow, this.height - this.arrow);
    this.context.lineTo(this.xRetreat, this.height);
    this.context.lineTo(this.xRetreat + this.arrow, this.height - this.arrow);
    /** y coordinate line **/

    /** Zero point **/
    this.context.fillText("0", this.xRetreat - 15, this.yRetreat - 10);
    /** Zero point **/

    /** x coordinates **/
    var xPosition = this.xRetreat + xShift;
    for(var i = 0; i < this.numberCount; i++) {
        this.context.moveTo(xPosition, this.yRetreat - 5);
        this.context.lineTo(xPosition, this.yRetreat + 5);
        this.context.fillText(Number(i + 1).toString(), xPosition - 13, this.yRetreat - 10);
        xPosition += xShift;
    }
    /** x coordinates **/

    this.context.strokeStyle = "black";
    this.context.stroke();
};
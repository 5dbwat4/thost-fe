class PaintTools{
    constructor(dom){
        this.dom=dom
        this.paintlines=[]
        this.painting=false
        this.context = dom.getContext("2d");
    }

    onmousedown(e){
        this.paintlines.push(new RoadwayArea({}))
        this.painting=true
        this.paintlines[this.paintlines.length-1].touchDown(e.layerX,e.layerY)
        this.paintlines[this.paintlines.length-1].touchMove(e.layerX+1,e.layerY+1)
        this.refreshCanvas()
        console.log(this.paintlines[this.paintlines.length-1]);
    }
    onmouseup(e){
        this.painting=false
        this.paintlines[this.paintlines.length-1].touchUp(e.layerX,e.layerY)
        console.log(this.paintlines[this.paintlines.length-1]);
    }

    onpointermove(e){
        if(this.painting){
            // const coalescedEvents = e.getCoalescedEvents();
            // for (let coalescedEvent of coalescedEvents) {
            //     // give it an offset so we can see the difference and color it red
            //     this.paintlines[this.paintlines.length-1].touchMove(coalescedEvent.layerX,coalescedEvent.layerY)
            //     // drawCircle(coalescedEvent.clientX + 20, coalescedEvent.clientY + 20, "red");
            //   }
            this.paintlines[this.paintlines.length-1].touchMove(e.layerX,e.layerY)
            this.refreshCanvas()
            console.log(this.paintlines[this.paintlines.length-1]);
        }

    }
    refreshCanvas(e){

        this.paintlines.forEach(v=>{v.drawSelf(this.context)})
    }
    clear(){
        this.paintlines=[]
        this.refreshCanvas()
    }
}


class Paint {
    constructor() {
        this.color = "black";
        this.lineWidth = 2 ;
        this.operation = "source-over";
        this.alpha = 1;
        this.mode = 0;
        this.equals = function (paint) {
            return this.color == paint.color && this.operation == paint.operation
                && Math.abs(this.lineWidth - paint.lineWidth) < 0.0000001 && this.alpha == paint.alpha;
        };
        this.config = function (p) {
            this.alpha = p.alpha || 1;
            this.mode = p.mode || 0;
            this.color = p.color || "#000000";
            if (this.color.indexOf("#") === -1) {
                this.color = "#" + this.color;
            }
            if (p.operation) {
                this.operation = p.operation;
            } else {
                if (this.mode == 1) {
                    this.operation = "destination-out";
                } else {
                    this.operation = "source-over";
                }
            }
            this.lineWidth = p.lineWidth || 1;
        };
    }
}

class RoadwayArea {
    constructor(p) {
        this.path = new Path2D();
        this.paint = new Paint();
        this.paint.config(p);
        this.step = -1;
        var lineArray = [];
        var line = null, px, py;

        this.isEffective = function () {
            return lineArray.length > 0 && this.step >= 0;
        };
        this.getCacheData = function () {
            if (lineArray.length <= 0 || !this.isEffective()) {
                return null;
            }
            var jsonArray = [];
            for (var index in lineArray) {
                if (index > this.step) {
                    break;
                }
                var line = lineArray[index];
                var pathJSONArray = null;
                for (var i in line) {
                    if (pathJSONArray == null) {
                        pathJSONArray = [];
                    }
                    pathJSONArray.push(line[i].x + "," + line[i].y);
                }
                if (pathJSONArray != null) {
                    jsonArray.push(pathJSONArray);
                }
            }
            if (jsonArray.length > 0) {
                return {
                    points: jsonArray,
                    color: this.paint.color.replace("#", ""),
                    line_width: this.paint.lineWidth,
                    alpha: this.paint.alpha,
                    mode: this.paint.mode
                };
            }
            return null;
        };
        this.setCacheData = function (jsonObject) {
            try {
                this.paint.config(jsonObject);
                var pointJSONArray = jsonObject.points;
                for (var index in pointJSONArray) {
                    var pathJSONArray = pointJSONArray[index];
                    for (var i in pathJSONArray) {
                        var point = pathJSONArray[i];
                        var di = point.split(",");
                        var x = parseFloat(di[0]);
                        var y = parseFloat(di[1]);
                        if (i == 0) {
                            this.touchDown(x, y);
                        } else {
                            this.touchMove(x, y);
                        }
                    }
                    this.touchUp();
                }
            } catch (e) {const density=3
            }
        };

        this.touchDown = function (x, y) {
            const density=3
            px = x;
            py = y;
            this.path.moveTo(x * density, y * density);
            line = [];
            line.push({ x: x, y: y });
            return true;
        };
        this.touchMove = function (x, y) {
            const density=3
            if (line != null && (Math.abs(x - px) >= 4 || Math.abs(y - py) >= 4)) {
                this.path.quadraticCurveTo(px * density, py * density, (x + px) / 2 * density, (y + py) / 2 * density);
                px = x;
                py = y;
                line.push({ x: x, y: y });
                return true;
            }
            return false;
        };
        this.touchUp = function () {
            const density=3
            if (line && line.length > 0) {
                if (this.step < lineArray.length - 1) {
                    lineArray.splice(this.step + 1);
                }
                lineArray.push(line);
                this.step = lineArray.length - 1;
                line = null;
                return true;
            }
            line = null;
            return false;
        };
        this.mementoStep = function (value) {
            var step = this.step + value;
            if (step >= -1 && step < lineArray.length) {
                this.path = new Path2D();
                this.step = step;
                for (var i = 0; i <= step; i++) {
                    var px = 0;
                    var py = 0;
                    var line = lineArray[i];
                    for (var index in line) {
                        var p = line[index];
                        if (index == 0) {
                            px = p.x;
                            py = p.y;
                            this.path.moveTo(p.x * density, p.y * density);
                        } else {
                            if (Math.abs(p.x - px) >= 4 || Math.abs(p.y - py) >= 4) {
                                this.path.quadraticCurveTo(px * density, py * density, (p.x + px) / 2 * density, (p.y + py) / 2 * density);
                                px = p.x;
                                py = p.y;
                            }
                        }
                    }
                }
                return true;
            }
            return false;
        };
        this.drawSelf = function (context) {
            const density=3
            context.globalCompositeOperation = this.paint.operation;
            context.strokeStyle = this.paint.color;
            context.globalAlpha = this.paint.alpha;
            context.lineWidth = this.paint.lineWidth * density;
            context.lineCap = "round";
            context.stroke(this.path);
        };
    }
}

export{PaintTools}
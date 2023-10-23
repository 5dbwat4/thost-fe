//modified by 5dbwat4

// var MODE_RUBBER = 1;
// var MODE_NORMAl_PEN = 2;
// var MODE_FLUORESCENT_PEN = 3;

// function selectPaint(mode) {
//     if (mode == MODE_RUBBER) {
//         if (!singleDraw.qid) {
//             makeEvent(2);
//         }
//         $("#color-picker-container").hide();
//     } else {
//         if (!singleDraw.qid) {
//             makeEvent(1);
//         }
//         $("#color-picker-container").show();
//     }
//     var set = toolPaint[mode];
//     toolVue.mode = mode;
//     toolVue.colorIndex = set.colorIndex;
//     toolVue.scaleIndex = set.scaleIndex;
//     toolVue.refreshPointer();
//     for (var i = 1; i <= 3; i++) {
//         if (mode == i) {
//             $("#pt" + i).css('filter', 'invert(100%)');
//         } else {
//             $("#pt" + i).css('filter', 'invert(0%)');
//         }
//     }

// }




/**
 * 手写功能
 */
function DrawCanvas(dom) {
    function mementoCursorChanged() {
        // if (typeof option.mementoCursorChanged == "function") {
        //     option.mementoCursorChanged(mementoCursor > 0, mementoCursor < mementoList.length - 1);
        // }
    }

    var roadwayAreaWrap = {};
    var density = 2;
    var innerPaint = new Paint();
    var mementoList = [{areaWrap: null, roadway: null}];
    var mementoCursor = 0;
    // mementoCursorChanged();
    this.setPaintConfig = function (p) {
        innerPaint.config(p);
    };
    this.refreshPosition = function (dom, plusHeight) {
        if (roadwayAreaWrap[qid] == null) {
            roadwayAreaWrap[qid] = new RoadwayAreaWrap(dom);
        }
        roadwayAreaWrap[qid].refreshPosition(plusHeight);
    };
    this.getCacheData = function () {
        var jsonObject = null;
        for (var key in roadwayAreaWrap) {
            var obj = roadwayAreaWrap[key].getCacheData();
            if (obj == null) {
                continue;
            }
            if (jsonObject == null) {
                jsonObject = {};
            }
            jsonObject[key] = obj;
        }
        return jsonObject;
    };
    this.setCacheData = function (jsonObject) {
        try {
            for (var qid in jsonObject) {
                var obj = jsonObject[qid];
                this.refreshPosition(qid, obj.question_plus_height);
                roadwayAreaWrap[qid].setCacheData(obj);
            }
        } catch (e) {
        }
    };
    this.undo = function () {
        if (mementoCursor <= 0) {
            return;
        }
        var memento = mementoList[mementoCursor];
        if (memento.roadway.mementoStep(-1)) {
            memento.areaWrap.refreshCanvas();
        }
        mementoCursor -= 1;
        mementoCursorChanged();
    };
    this.redo = function () {
        if (mementoCursor >= mementoList.length - 1) {
            return;
        }
        mementoCursor += 1;
        var memento = mementoList[mementoCursor];
        if (memento.roadway.mementoStep(1)) {
            memento.areaWrap.refreshCanvas();
        }
        mementoCursorChanged();
    };

   

    class RoadwayAreaWrap {
        constructor(dom) {
            var canvas = dom;
            var context = null;
            var roadwayAreaArray = [];
            var areaWrap = this;
            var roadwayArea = null;
            var canvasWidth = 0;
            var canvasHeight = 0;
            var plusHeight = 0;
            this.refreshPosition = function (ph) {
                plusHeight = ph;
                canvasWidth = canvas.clientWidth;
                console.log(canvasWidth);
                canvasHeight = canvas.clientHeight;
                if (canvas.height !== canvasHeight * density || canvas.width !== canvasWidth * density) {
                    canvas.width = canvasWidth * density;
                    canvas.height = canvasHeight * density;
                    _refreshCanvas();
                }
            };
            this.refreshCanvas = function () {
                _refreshCanvas();
            };
            this.getCacheData = function () {
                var jsonArray = null;
                for (var i in roadwayAreaArray) {
                    var obj = roadwayAreaArray[i].getCacheData();
                    if (obj == null) {
                        continue;
                    }
                    if (jsonArray == null) {
                        jsonArray = [];
                    }
                    jsonArray.push(obj);
                }
                if (jsonArray == null) {
                    return null;
                }
                return {
                    draw_info: jsonArray,
                    screen_width: $("#paper_wrap").outerWidth(),
                    density: density,
                    platform: 3,
                    version: 2,
                    app_version: 0,
                    draw_area: [0, 0, canvasWidth, canvasHeight + plusHeight],
                    question_width: canvasWidth,
                    question_height: canvasHeight,
                    question_plus_height: plusHeight
                };
            };

            this.setCacheData = function (jsonObject) {
                try {
                    var jsonArray = jsonObject.draw_info;
                    for (var i in jsonArray) {
                        var obj = jsonArray[i];
                        if (obj.mode <= 3) {
                            obj.lineWidth = obj.line_width;
                            var paint = new Paint();
                            paint.config(obj);
                            var roadwayArea = new RoadwayArea(paint);
                            roadwayArea.setCacheData(obj);
                            roadwayAreaArray.push(roadwayArea);
                        }
                    }
                } catch (e) {
                }
                _refreshCanvas();
            };

            function _refreshCanvas() {
                if (context == null) {
                    context = canvas.getContext("2d");
                }
                context.lineWidth = 2 * density;
                context.strokeStyle = "black";
                context.clearRect(0, 0, canvas.width, canvas.height);
                for (var i in roadwayAreaArray) {
                    roadwayAreaArray[i].drawSelf(context);
                }
            }

            function getRoadwayArea(paint) {
                if (roadwayArea == null) {
                    roadwayArea = new RoadwayArea(paint);
                    roadwayAreaArray.push(roadwayArea);
                } else {
                    if (!roadwayArea.isEffective() || !roadwayArea.paint.equals(paint)) {
                        roadwayArea = new RoadwayArea(paint);
                        roadwayAreaArray.push(roadwayArea);
                    }
                }
                return roadwayArea;
            }

            function removeRoadwayArea(roadway) {
                if (!roadway.isEffective()) {
                    var index = roadwayAreaArray.indexOf(roadway);
                    if (index > -1) {
                        roadwayAreaArray.splice(index, 1);
                    }
                }
            }

            var preX, preY;
            canvas.addEventListener("mousedown", function (e) {
                e.preventDefault();
                getRoadwayArea(innerPaint).touchDown(e.clientX, e.clientY);
                console.log("md1",e);
                _refreshCanvas();
                console.log(context);
                preX = e.clientX;
                preY = e.clientY;
            }, { passive: false });
            // canvas.addEventListener("mousemove", function (e) {
            //     if (context == null) {
            //         return;
            //     }
            //     e.preventDefault();
            //     var ex = e.offsetX;
            //     var ey = e.offsetY;
            //     if (ex < 0) {
            //         ex = 0;
            //     } else if (ex > canvasWidth) {
            //         ex = canvasWidth;
            //     }
            //     if (ey < 0) {
            //         ey = 0;
            //     } else if (ey > canvasHeight) {
            //         ey = canvasHeight;
            //     }
            //     if (preX === ex && preY === ey) {
            //         return;
            //     }
            //     if (roadwayArea && roadwayArea.touchMove(ex, ey)) {
            //         _refreshCanvas();
            //     }
            //     console.log(e);
            //     preX = ex;
            //     preY = ey;
            // }, { passive: false });

            function mouseEnded(e) {
                e.preventDefault();
                console.log("me");
                if (roadwayArea == null) {
                    context = null;
                    return;
                }

                if (roadwayArea.touchUp()) {
                    for (var i = mementoList.length - 1; i > mementoCursor; i--) {
                        removeRoadwayArea(mementoList[i].roadway);
                        mementoList.splice(i); //指针后面的记录删除
                    }
                    mementoList.push({
                        areaWrap: areaWrap,
                        roadway: roadwayArea
                    });
                    if (mementoList.size > 100) {
                        mementoList.splice(0, 1);
                    }
                    mementoCursor = mementoList.length - 1;
                    mementoCursorChanged();
                } else {
                    removeRoadwayArea(roadwayArea);
                }
                _refreshCanvas();
                context = null;
            }

            canvas.addEventListener("mouseleave", mouseEnded, { passive: false });
            canvas.addEventListener("mouseup", mouseEnded, { passive: false });

            this.mousemove=(e)=>{
                console.log("mo",context);
                if (context == null) {
                    return;
                }
                e.preventDefault();
                var ex = e.clientX;
                var ey = e.clientY;
                if (ex < 0) {
                    ex = 0;
                } else if (ex > canvasWidth) {
                    ex = canvasWidth;
                }
                if (ey < 0) {
                    ey = 0;
                } else if (ey > canvasHeight) {
                    ey = canvasHeight;
                }
                console.log("mo1",e);
                if (preX === ex && preY === ey) {
                    return;
                }
                console.log("mo2",e);
                if (roadwayArea && roadwayArea.touchMove(ex, ey)) {
                    _refreshCanvas();
                }
                
                preX = ex;
                preY = ey;
            
        }
        }
    }

    function RoadwayArea(p) {
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
                return null
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
                    jsonArray.push(pathJSONArray)
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
                for (var index in  pointJSONArray) {
                    var pathJSONArray = pointJSONArray[index];
                    for (var i in pathJSONArray) {
                        var point = pathJSONArray[i];
                        var di = point.split(",");
                        var x = parseFloat(di[0]);
                        var y = parseFloat(di[1]);
                        if (i == 0) {
                            this.touchDown(x, y)
                        } else {
                            this.touchMove(x, y)
                        }
                    }
                    this.touchUp()
                }
            } catch (e) {

            }
        };

        this.touchDown = function (x, y) {
            px = x;
            py = y;
            this.path.moveTo(x * density, y * density);
            line = [];
            line.push({x: x, y: y});
            return true;
        };
        this.touchMove = function (x, y) {
            if (line != null && (Math.abs(x - px) >= 4 || Math.abs(y - py) >= 4)) {
                this.path.quadraticCurveTo(px * density, py * density, (x + px) / 2 * density, (y + py) / 2 * density);
                px = x;
                py = y;
                line.push({x: x, y: y});
                return true;
            }
            return false;
        };
        this.touchUp = function () {
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
            return false
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
                            this.path.moveTo(p.x * density, p.y * density)
                        } else {
                            if (Math.abs(p.x - px) >= 4 || Math.abs(p.y - py) >= 4) {
                                this.path.quadraticCurveTo(px * density, py * density, (p.x + px) / 2 * density, (p.y + py) / 2 * density);
                                px = p.x;
                                py = p.y;
                            }
                        }
                    }
                }
                return true
            }
            return false
        };
        this.drawSelf = function (context) {
            context.globalCompositeOperation = this.paint.operation;
            context.strokeStyle = this.paint.color;
            context.globalAlpha = this.paint.alpha;
            context.lineWidth = this.paint.lineWidth * density;
            context.lineCap = "round";
            context.stroke(this.path);
        }
    }

    function Paint() {
        this.color = "black";
        this.lineWidth = density;
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
        }
    }
    var innerPaint = new Paint();
    var ra=new RoadwayAreaWrap(dom);
    this.mousemove=(e)=>{
        // console.log("rp",e);
        ra.mousemove(e)
    }
}




function initDraw(dom) {
    var dc=new DrawCanvas(dom)
    return {
        mousemove:(e)=>{
            // console.log("ie",e);
            dc.mousemove(e)
        }
    }
}

export{initDraw}
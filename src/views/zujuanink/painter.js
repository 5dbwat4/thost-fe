//modified by 5dbwat4

var MODE_RUBBER = 1;
var MODE_NORMAl_PEN = 2;
var MODE_FLUORESCENT_PEN = 3;

function selectPaint(mode) {
    if (mode == MODE_RUBBER) {
        if (!singleDraw.qid) {
            makeEvent(2);
        }
        $("#color-picker-container").hide();
    } else {
        if (!singleDraw.qid) {
            makeEvent(1);
        }
        $("#color-picker-container").show();
    }
    var set = toolPaint[mode];
    toolVue.mode = mode;
    toolVue.colorIndex = set.colorIndex;
    toolVue.scaleIndex = set.scaleIndex;
    toolVue.refreshPointer();
    for (var i = 1; i <= 3; i++) {
        if (mode == i) {
            $("#pt" + i).css('filter', 'invert(100%)');
        } else {
            $("#pt" + i).css('filter', 'invert(0%)');
        }
    }

}




/**
 * 手写功能
 */
function DrawCanvas(option) {
    function mementoCursorChanged() {
        if (typeof option.mementoCursorChanged == "function") {
            option.mementoCursorChanged(mementoCursor > 0, mementoCursor < mementoList.length - 1);
        }
    }

    var roadwayAreaWrap = {};
    var density = option.density || 2;
    var innerPaint = new Paint();
    var mementoList = [{areaWrap: null, roadway: null}];
    var mementoCursor = 0;
    mementoCursorChanged();
    this.setPaintConfig = function (p) {
        innerPaint.config(p);
    };
    this.refreshPosition = function (qid, plusHeight) {
        if (roadwayAreaWrap[qid] == null) {
            roadwayAreaWrap[qid] = new RoadwayAreaWrap("canvas" + qid);
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
                $("#plus_area" + qid).css("height", obj.question_plus_height + "px");
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

    function RoadwayAreaWrap(canvasId) {
        var canvas = document.getElementById(canvasId);
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
                jsonArray.push(obj)
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
            }
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
            getRoadwayArea(innerPaint).touchDown(e.offsetX, e.offsetY);
            _refreshCanvas();
            preX = e.offsetX;
            preY = e.offsetY;
        }, {passive: false});
        canvas.addEventListener("mousemove", function (e) {
            if (context == null) {
                return;
            }
            e.preventDefault();
            var ex = e.offsetX;
            var ey = e.offsetY;
            if (ex < 0) {
                ex = 0
            } else if (ex > canvasWidth) {
                ex = canvasWidth
            }
            if (ey < 0) {
                ey = 0;
            } else if (ey > canvasHeight) {
                ey = canvasHeight
            }
            if (preX === ex && preY === ey) {
                return;
            }
            if (roadwayArea && roadwayArea.touchMove(ex, ey)) {
                _refreshCanvas();
            }
            preX = ex;
            preY = ey;
        }, {passive: false});

        function mouseEnded(e) {
            e.preventDefault();
            if (roadwayArea == null) {
                context = null;
                return;
            }
            if (roadwayArea.touchUp()) {
                for (var i = mementoList.length - 1; i > mementoCursor; i--) {
                    removeRoadwayArea(mementoList[i].roadway);
                    mementoList.splice(i) //指针后面的记录删除
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

        canvas.addEventListener("mouseleave", mouseEnded, {passive: false});
        canvas.addEventListener("mouseup", mouseEnded, {passive: false});
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

}


var questionDrawEvent = {};
var optionSelect = {};
var isDrawEvent = false;
var makeEventValue = 0;
var singleDraw = {
    qid: null,
    event: 1
};


function toggleSelectOption(ele, status) {
    if (status == 1) {
        ele.addClass("option-sel");
        ele.removeClass("option-nor");
        ele.removeClass("option-del");
        ele.css("font-weight", "bold");
    } else if (status == -1) {
        ele.addClass("option-del");
        ele.removeClass("option-nor");
        ele.removeClass("option-sel");
        ele.css("font-weight", "normal");
    } else {
        ele.removeClass("option-sel");
        ele.addClass("option-nor");
        ele.removeClass("option-del");
        ele.css("font-weight", "normal");
    }
}

$(function () {
    addClickEvent();
});

function addClickEvent() {
    $(".list-option").each(function () {
        var ele = $(this);
        var qid = ele.attr("q_id");
        var index = ele.attr("q_index");
        var order = ele.attr("q_order");
        var timeOutEvent = 0;
        var isMultiple = false;

        function startevent() {
            isMultiple = $("#draw_area" + qid).attr("channel_type_name").indexOf("多选") > -1 || $("#multiple_order_dot" + qid).css("display") == "block";

            // 长按事件触发
            timeOutEvent = setTimeout(function () {
                timeOutEvent = 0;
                //长按事件
                if (makeEventValue == 3) {
                    if (isMultiple) {
                        if (typeof optionSelect[qid] == 'object') {
                            if (typeof optionSelect[qid][index] == 'object') {
                                var _index = optionSelect[qid][index].indexOf(order);
                                if (_index > -1) {
                                    optionSelect[qid][index].splice(_index, 1);
                                }
                            } else if (typeof optionSelect[qid][index] == 'string') {
                                delete  optionSelect[qid][index];
                            }
                        }
                        toggleSelectOption($("#qid" + qid + "index" + index + "order" + order), -1);
                    } else {
                        if (optionSelect[qid] && optionSelect[qid][index]) {
                            delete  optionSelect[qid][index];
                        }
                        toggleSelectOption($("#qid" + qid + "index" + index + "order" + order), -1);
                    }
                }
            }, 400);
            $(".question-input").blur();
        }

        function moveevent() {
            clearTimeout(timeOutEvent);
            timeOutEvent = 0;
        }

        function endevent() {
            clearTimeout(timeOutEvent);
            if (timeOutEvent && makeEventValue == 3) {

                if (!optionSelect[qid]) {
                    optionSelect[qid] = {};
                }

                if (isMultiple) {
                    if (typeof optionSelect[qid][index] == 'string' && !!optionSelect[qid][index]) {
                        optionSelect[qid][index] = [optionSelect[qid][index]];
                    }

                    if (typeof optionSelect[qid][index] != 'object') {
                        optionSelect[qid][index] = [];
                    }
                    var _index = optionSelect[qid][index].indexOf(order);
                    if (_index === -1) {
                        optionSelect[qid][index].push(order);
                        toggleSelectOption($("#qid" + qid + "index" + index + "order" + order), 1);
                    } else {
                        optionSelect[qid][index].splice(_index, 1);
                        toggleSelectOption($("#qid" + qid + "index" + index + "order" + order), 0);
                    }
                } else {

                    optionSelect[qid][index] = order;
                    toggleSelectOption($(".list-option" + qid + "index" + index), 0);
                    toggleSelectOption($("#qid" + qid + "index" + index + "order" + order), 1);
                }

            }
            return false;
        }


        if (!!("ontouchstart" in window)) {
            ele.on({
                touchstart: startevent,
                touchmove: moveevent,
                touchend: endevent
            });
        } else {
            ele.on({
                mousedown: startevent,
                mouseup: endevent
            });
        }

    });
    $(".single-option").each(function () {
        var ele = $(this);
        var qid = ele.attr("q_id");
        var order = ele.attr("q_order");
        var isMultiple = false;
        var timeOutEvent = 0;

        function startevent() {
            var ea = $("#answer_text" + qid);
            isMultiple = $("#draw_area" + qid).attr("channel_type_name").indexOf("多选") > -1 || $("#multiple_order_dot" + qid).css("display") == "block";
            if (!isMultiple && ea.length > 0) {
                var answerText = ea.html().replace(/(<([^>]+)>)/ig, "").toUpperCase();
                var letters = ["A", "B", "C", "D", "E"];
                var ct = 0;
                for (var i in letters) {
                    if (answerText.indexOf(letters[i]) > -1) {
                        ct += 1;
                    }
                }
                isMultiple = ct > 1;
            }
            // 长按事件触发
            clearTimeout(timeOutEvent);
            timeOutEvent = setTimeout(function () {
                timeOutEvent = null;
                //长按事件
                if (makeEventValue == 3) {

                    if (isMultiple) {
                        if (typeof optionSelect[qid] == 'object') {
                            var _index = optionSelect[qid].indexOf(order);
                            if (_index > -1) {
                                optionSelect[qid].splice(_index, 1);
                            }
                        } else if (typeof optionSelect[qid] == 'string' && optionSelect[qid] == order) {
                            delete optionSelect[qid];
                        }
                        toggleSelectOption($("#qid" + qid + "order" + order), -1)
                    } else {
                        if (optionSelect[qid] == order) {
                            delete optionSelect[qid];
                        }
                        toggleSelectOption($("#qid" + qid + "order" + order), -1)
                    }
                }

            }, 400);
            $(".question-input").blur();
        }

        function moveevent() {
            clearTimeout(timeOutEvent);
            timeOutEvent = null;
        }

        function endevent() {
            if (timeOutEvent && makeEventValue == 3) {
                if (isMultiple) {
                    if (typeof optionSelect[qid] == 'string' && !!optionSelect[qid]) {
                        optionSelect[qid] = [optionSelect[qid]];
                    }
                    if (typeof optionSelect[qid] != 'object') {
                        optionSelect[qid] = [];
                    }
                    var _index = optionSelect[qid].indexOf(order);
                    if (_index === -1) {
                        optionSelect[qid].push(order);
                        toggleSelectOption($("#qid" + qid + "order" + order), 1)
                    } else {
                        optionSelect[qid].splice(_index, 1);
                        toggleSelectOption($("#qid" + qid + "order" + order), 0)
                    }
                } else {
                    optionSelect[qid] = order;
                    toggleSelectOption($(".single-option" + qid), 0);
                    toggleSelectOption($("#qid" + qid + "order" + order), 1);
                }
            }
            clearTimeout(timeOutEvent);
            timeOutEvent = null;
            return false;
        }


        if (!!("ontouchstart" in window)) {
            ele.on({
                touchstart: startevent,
                touchmove: moveevent,
                touchend: endevent
            });
        } else {
            ele.on({
                mousedown: startevent,
                mouseup: endevent
            });
        }
    });
}

function showOptionsByQid(qid) {
    var option = optionSelect[qid];
    var _ele = $("#plus_area" + qid);
    if (_ele.length < 1) {
        return;
    }
    var type = _ele.attr("option_type");
    if (type == 'normalOption') {
        _ele = $(".single-option" + qid);
        _ele.removeClass("option-sel");
        _ele.addClass("option-check option-nor");
        if (typeof option == 'object') { //多选了
            for (var i in option) {
                _ele = $("#qid" + qid + "order" + option[i]);
                _ele.removeClass("option-nor");
                _ele.addClass("option-sel");
                _ele.css("font-weight", "bold");
            }
        } else if (typeof option == 'string') {
            _ele = $("#qid" + qid + "order" + option);
            _ele.removeClass("option-nor");
            _ele.addClass("option-sel");
            _ele.css("font-weight", "bold");
        }

    } else if (type == 'listOption') {
        _ele = $(".list-option" + qid);
        _ele.removeClass("option-sel");
        _ele.addClass("option-check option-nor");
        if (typeof option == 'object') {
            for (var index in option) {
                if (typeof  option[index] == 'object') {
                    for (var oi in option[index]) {
                        var order = option[index][oi];
                        _ele = $("#qid" + qid + "index" + index + "order" + order);
                        _ele.removeClass("option-nor");
                        _ele.addClass("option-sel");
                        _ele.css("font-weight", "bold");
                    }
                } else {
                    _ele = $("#qid" + qid + "index" + index + "order" + option[index]);
                    _ele.removeClass("option-nor");
                    _ele.addClass("option-sel");
                    _ele.css("font-weight", "bold");
                }
            }
        }
    }
}

function hideOptionsByQid(qid) {
    var type = $("#plus_area" + qid).attr("option_type");
    var _ele = null;
    if (type == 'normalOption') {
        _ele = $(".single-option" + qid);
    } else if (type == 'listOption') {
        _ele = $(".list-option" + qid);
    } else {
        return
    }
    _ele.removeClass("option-check option-nor option-sel option-del");
}

function initDrawResize(qid) {
    questionDrawEvent[qid] = 0;
    var resize = document.getElementById("h_box" + qid);
    resize.addEventListener("mousedown", function (e) {
        e.preventDefault();
        var area = document.getElementById("plus_area" + qid);
        var plusHeight = area.clientHeight;
        var startY = e.clientY;

        function tapMoveHandler(e) {
            e.preventDefault();
            plusHeight += (e.clientY - startY);
            if (plusHeight < 0) {
                plusHeight = 0;
                tapEndHandler()
            } else if (plusHeight > 2000) {
                plusHeight = 2000;
                tapEndHandler()
            }
            startY = e.clientY;
            area.style.height = plusHeight + "px";
        }

        function tapEndHandler(e) {
            if (e) {
                e.preventDefault();
            }
            document.removeEventListener("mousemove", tapMoveHandler);
            document.removeEventListener("mouseup", tapEndHandler);
        }

        document.addEventListener("mousemove", tapMoveHandler, {passive: false});
        document.addEventListener("mouseup", tapEndHandler, {passive: false});
    }, {passive: false});
}


function makeEvent(event) {
    isDrawEvent = event == 1 || event == 2;
    makeEventValue = event;
    singleDraw.qid = null;
    singleDraw.event = event;
    for (var qid in questionDrawEvent) {
        questionDrawEvent[qid] = event;
        if (makeEventValue == 3) {
            showOptionsByQid(qid)
        } else {
            hideOptionsByQid(qid);
            var html = $("#input" + qid).html().trim();
            if (html) {
                $("#display-input" + qid).show();
                $("#display-input-text" + qid).html(html);
            } else {
                $("#display-input" + qid).hide();
            }
        }
    }
    if (isDrawEvent) {
        $(".plus-area").show();
        $(".h-box").show();
        $(".canvas-box").show();
    } else {
        $(".plus-area").hide();
        $(".h-box").hide();
        $(".h-box-close").hide();
        $(".canvas-box").hide();
    }
    if (event == 3) {
        $(".multiple-order-wrap").show();
        $(".input-frame").show();
        $(".display-input").hide();
        // if (keyboard_qid > 0) {
        //     resetInputFrame(keyboard_qid);
        // }
    } else {
        $(".multiple-order-wrap").hide();
        $(".input-frame").hide();
    }
    makeDrawType(event)
}

function resetInputFrame(qid) {
    var draw = $("#plus_area" + qid);
    draw.hide();
    if (draw.attr("option_type") == 'none') {
        $("#input-hint" + qid).text("请输入本题答案:")
    } else {
        $("#input-hint" + qid).text("如需补充本题答案，可在此输入:")
    }
    $("#input" + keyboard_qid).show();
    $(".kb-icon" + qid).show();
}

function makeInputQid(inputQid) {
    isDrawEvent = false;
    singleDraw.qid = null;
    questionDrawEvent[inputQid] = 0;
    $("#bnt_box_close" + inputQid).hide();
    showOptionsByQid(inputQid);
    $("#plus_area" + inputQid).hide();
    $("#h_box" + inputQid).hide();
    $("#multiple-order-wrap" + inputQid).show();
    $("#input-frame" + inputQid).show();
    $("#display-input" + inputQid).hide();
    $("#canvas" + inputQid).hide();
}


function makeDrawQid(drawQid) {
    if (singleDraw.qid) {
        makeInputQid(singleDraw.qid)
    }
    isDrawEvent = true;
    singleDraw.qid = drawQid;
    if (singleDraw.event != 1 && singleDraw.event != 2) {
        singleDraw.event = 1;
    }
    questionDrawEvent[drawQid] = singleDraw.event;
    makeDrawType(singleDraw.event);
    hideOptionsByQid(drawQid);
    var html = $("#input" + drawQid).html().trim();
    if (html) {
        $("#display-input" + drawQid).show();
        $("#display-input-text" + drawQid).html(html);
    } else {
        $("#display-input" + drawQid).hide();
    }
    $("#input-frame" + drawQid).hide();
    $("#multiple-order-wrap" + drawQid).hide();
    $("#plus_area" + drawQid).show();
    $("#h_box" + drawQid).show();
    $("#bnt_box_close" + drawQid).show();
    $("#canvas" + drawQid).show();
    resizeChange();
}


function makeDrawType(type) {
    singleDraw.event = type;
    if (singleDraw.qid) {
        if (type == 1) {
            $("#canvas" + singleDraw.qid).css("cursor", "url('/cur/m_pencil.cur'), crosshair");
            questionDrawEvent[singleDraw.qid] = type;
        } else if (type == 2) {
            $("#canvas" + singleDraw.qid).css("cursor", "crosshair");
            questionDrawEvent[singleDraw.qid] = type;
        } else {
            $("#canvas" + singleDraw.qid).css("cursor", "auto");
        }
    } else {
        if (type == 1) {
            $(".canvas-box").css("cursor", "url('/cur/m_pencil.cur'), crosshair");
        } else if (type == 2) {
            $(".canvas-box").css("cursor", "url('/cur/xp.cur'), crosshair");
        } else {
            $(".canvas-box").css("cursor", "auto");
        }
    }

}

function getCacheData() {
    var data = {};
    for (var qid in questionDrawEvent) {
        var ele = $("#plus_area" + qid);
        var drew = ele.attr("drew");
        if (drew == 1) {
            if (!data[qid]) {
                data[qid] = {}
            }
            data[qid].plusHeight = ele.height();
            data[qid].drew = ele.attr("drew");
        }
        if (optionSelect[qid]) { //会被手写的题目保存选项记录
            if (!data[qid]) {
                data[qid] = {}
            }
            data[qid].option = optionSelect[qid];
        }
        var content = $("#input" + qid).html().trim();
        if (content) {
            if (!data[qid]) {
                data[qid] = {}
            }
            data[qid].text = content;
        }

    }
    return data;
}

function setCacheData(dataObj) {
    if (dataObj) {
        for (var qid in dataObj) {
            var item = dataObj[qid];
            if (item.text) {
                var ele = $("#input-frame" + qid);
                if (ele.length > 0) {
                    ele.show();
                }
                ele = $("#input" + qid);
                if (ele.length > 0) {
                    ele.html(item.text);
                }
            }
            if (item.plusHeight || item.drew) {
                ele = $("#plus_area" + qid);
                if (ele.length > 0 && item.plusHeight) {
                    ele.height(item.plusHeight);
                    ele.attr("height", item.plusHeight);
                }
                if (ele.length > 0 && item.drew) {
                    ele.attr("drew", item.drew);
                }
            }
            if (item.option) {
                optionSelect[qid] = item.option;
                showOptionsByQid(qid)
            }
        }
    }
}


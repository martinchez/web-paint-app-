import Point from './point.model.js';
import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER } from './tool.js';

import { getMouseCoordsOnCanvas, findDistance } from './utility.js';
export default class Paint {
    constructor(canvasId) {

        this.canvas = document.getElementById(canvasId);
        this.context = canvas.getContext("2d");

    }

    set activeTool(tool) {
        this.tool = tool;
        //console.log(this.tool);
    }
    set lineWidth(linewidth){
        this._lineWidth = linewidth;
        this.context.lineWidth= this._lineWidth;
    }
    //set lineWidth(lineWidth){
    //    this._lineWidth= linewidth;
    //    this.context.lineWidth = this._lineWidth;
    //}

    init() {
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }
    onMouseDown(e) {
        // this.savedData = this.context.getImageData(0 , 0, this.canvas.clientwidth, this.canvas.height);
        this.savedData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.height);

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        this.startPos = getMouseCoordsOnCanvas(e, this.canvas);

        if (this.tool == TOOL_PENCIL) {
            this.context.moveTo(this.startPos.x, this.startPos.y);
        }

        //console.log(this.startPos);
    }
    onMouseMove(e) {
        this.currentPos = getMouseCoordsOnCanvas(e, this.canvas);
        //console.log(this.currentPos);

        switch (this.tool) {
            case TOOL_LINE:
            case TOOL_RECTANGLE:
            case TOOL_CIRCLE:
            case TOOL_TRIANGLE:
                this.drawShape();
                break;
            case TOOL_PENCIL:
                this.drawFreeLine(this._lineWidth);
                break;
            default:
                break;
        }


    }
    onMouseUp(e) {
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }
    drawShape() {

        //this.context.putImageData(this.savedData, 0, 0);

        this.context.putImageData(this.savedData, 0, 0);

        this.context.beginPath();

        if (this.tool == TOOL_LINE) {
            this.context.moveTo(this.startPos.x, this.startPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
        } else if(this.tool == TOOL_RECTANGLE){
            this.context.rect(this.startPos.x , this.startPos.y , this.currentPos.x - this.startPos.x, this.currentPos.y - this.startPos.y);
        }
        else if (this.tool == TOOL_CIRCLE) {
            let distance = findDistance(this.startPos,this.currentPos);
            this.context.arc(this.startPos.x, this.startPos.y, distance , 0, 2 * Math.PI , false );
        }
        else if (this.tool == TOOL_TRIANGLE) {
            this.context.moveTo(this.startPos.x + (this.currentPos.x- this.startPos.x) / 2,this.startPos.y);
            this.context.lineTo(this.startPos.x, this.currentPos.y);
            this.context.lineTo(this.currentPos.x, this.currentPos.y);
            this.context.closePath();
        }

        //this.context.moveTo(this.startPos.x, this.startPos.y);
        //this.context.lineTo(this.currentPos.x, this.currentPos.y);

        this.context.stroke();

    }
    drawFreeLine(lineWidth){
        this.context.lineWidth=lineWidth;
        this.context.lineTo(this.currentPos.x , this.currentPos.y);
        this.context.stroke();
    }
}
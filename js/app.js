import { TOOL_LINE, TOOL_RECTANGLE, TOOL_CIRCLE, TOOL_TRIANGLE, TOOL_PAINT_BUCKET, TOOL_PENCIL, TOOL_BRUSH, TOOL_ERASER} from './tool.js';

import Paint from './paint.class.js';

var paint = new Paint("canvas");
paint.lineWidth=1;
paint.activeTool =TOOL_LINE;
paint.init();

document.querySelectorAll("[data-command]").forEach(
    item => {
        item.addEventListener("click",e=> {
            console.log(ite.getAttribute("data-command"));
        });
    }
);

document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener("click", e => {
           // console.log(ite.getAttribute("data-tool"));
            document.querySelector("[data-tool].active").classList.toggle("active");
            item.classList.toggle("active");

            let selectedTool = item.getAttribute("data-tool");
            paint.activeTool= selectedTool;

            switch(selectedTool){
                case TOOL_LINE:
                case TOOL_RECTANGLE:
                case TOOL_TRIANGLE:
                case TOOL_CIRCLE:
                case TOOL_ERASER:
                    //activate shape linewidth groupstyle
                    document.querySelector(".group.for-shapes").style.display="block";
                    //invisible brush linewidths group
                    document.querySelector(".group.for-brush").style.display="none";
                    break;
                case TOOL_BRUSH:
                    //activate brush line width group
                    document.querySelector(".group.for-shapes").style.display = "none";
                    //invisible shape linewidths group
                    document.querySelector(".group.for-brush").style.display = "block";
                    break;
                default:
                    //make invisible both line width groups
                    document.querySelector(".group.for-shapes").style.display = "none";
                    document.querySelector(".group.for-brush").style.display = "none";

            }
        });
    }
);

document.querySelectorAll("[data-line-width]").forEach(
    item => {
        item.addEventListener("click", e => {
            // console.log(ite.getAttribute("data-line-width"));
            document.querySelector("[data-line-width].active").classList.toggle("active");
            item.classList.toggle("active");

            let linewidth = item.getAttribute("data-line-width");
            paint.lineWidth = linewidth;

           // let linewidth =item.getAttribute("data-line-width");
           // paint.lineWidth=linewidth;
        });
    }
);

document.querySelectorAll("[data-color]").forEach(
    item => {
        item.addEventListener("click", e => {
            // console.log(ite.getAttribute("data-color"));
            document.querySelector("[data-color].active").classList.toggle("active");
            item.classList.toggle("active");
        });
    }
);
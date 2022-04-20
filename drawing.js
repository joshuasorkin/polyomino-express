const fs = require('fs');
const Canvas = require('canvas');

class Drawing{
    constructor(){
        let rawData = fs.readFileSync("polyomino-config.json");
        this.config = JSON.parse(rawData);
        this.dataURLs = [];
        this.polyominoCount = 0;

    }
    tileAllCanvases(){
        Object.keys(this.config).forEach(key => {
            let polyomino = this.config[key];
            Canvas.registerFont(polyomino.font.filename,{family:polyomino.font.name});
            let canvas = Canvas.createCanvas(polyomino.canvas.width,polyomino.canvas.height);
            this.drawPolyomino(polyomino,canvas);
            this.dataURLs.push(canvas.toDataURL());
        })
    }

    drawPolyomino(polyomino,canvas,word=polyomino.word,x = polyomino.x_start,y = polyomino.y_start,ascii = polyomino.ascii_start,pointVisited = null){
        if (this.polyominoCount > 225){
            return;
        }
        if (!pointVisited){
            pointVisited = new Set();
        }
        if (x < 0 || y < 0 || x > polyomino.canvas.width || y > polyomino.canvas.height){
            return;
        }
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(x,y);
        let pointQueue = [];
        let x_min = x;
        let x_max = x;
        let y_min = y;
        let y_max = y;
        let length = polyomino.length;
        word.toLowerCase().split('').forEach(direction => {
            let x_prev = x;
            let y_prev = y;
            switch(direction){
                case "n":
                    y-=length;
                    break;
                case "e":
                    x+=length;
                    break;
                case "s":
                    y+=length;
                    break;
                case "w":
                    x-=length;
                    break;
                case ".":
                    let pointKey = `${x} ${y} ${word}`;
                    if(!pointVisited.has(pointKey)){
                        let point = [x,y];
                        pointQueue.push(point);
                        pointVisited.add(pointKey);
                    }
                    break;
            }
            x_min = Math.min(x_min,x);
            x_max = Math.max(x_max,x);
            y_min = Math.min(y_min,y);
            y_max = Math.max(y_max,y);
            ctx.lineTo(x,y);
            ctx.moveTo(x,y);
            //let newLine = document.createAttributeNS("http://www.w3.org/2000/svg","line")
        });
        ctx.stroke();
        this.polyominoCount++;
        let x_avg = this.average(x_min,x_max);
        let y_avg = this.average(y_min,y_max);
        let min_diff = Math.min(x_max-x_min,y_max-y_min);
        let textsize = min_diff/(polyomino.length/2);
        let offset = min_diff/(polyomino.length);
        ctx.font = `${textsize}px ${polyomino.font.name}`;
        //ctx.fillText(String.fromCharCode(ascii),x_avg-offset,y_avg);
        if(word === polyomino.word_antipode){
            ctx.fillText("A",x_avg-offset,y_avg);
        }
        pointQueue.forEach(point => {
            let newAscii;
            if (ascii >= polyomino.ascii_end){
                newAscii = polyomino.ascii_start;
            }
            else{
                newAscii = ascii+1;
            }
            ctx.fillText("/",point[0],point[1]);
            this.drawPolyomino(polyomino,canvas,polyomino.word,point[0],point[1],newAscii,pointVisited);
            ctx.fillText("\\",point[0],point[1]);
            this.drawPolyomino(polyomino,canvas,polyomino.word_antipode,point[0],point[1],newAscii,pointVisited);
        });
    }

    average(...args){
        let sum = args.reduce((acc,curr) => {
            acc+=curr;
            return acc;
        },0);
        return Math.floor(sum/args.length);
    }
}

module.exports = Drawing;
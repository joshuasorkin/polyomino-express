function drawPolyomino(word,x,y,length,canvas_low_x,canvas_low_y,canvas_high_x,canvas_high_y,ascii,pointVisited = null,ascii_initial = ascii){
    if (!pointVisited){
        pointVisited = new Set();
    }
    if (x < canvas_low_x || y < canvas_low_y || x > canvas_high_x || y > canvas_high_y){
        return;
    }
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x,y);
    let pointQueue = [];
    let x_min = x;
    let x_max = x;
    let y_min = y;
    let y_max = y;
    word.toLowerCase().split('').forEach(direction => {
        //console.log(`x: ${x} y: ${y}`);
        //console.log({direction});
        
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
                let pointKey = `${x} ${y}`;
                if(!pointVisited.has(pointKey)){
                    let point = [x,y];
                    //console.log(`adding to pointQueue: ${point}`);
                    pointQueue.push(point);
                    pointVisited.add(pointKey);
                }
                else{
                    //console.log(`found point at ${pointKey}`);
                }
                break;
        }
        x_min = Math.min(x_min,x);
        x_max = Math.max(x_max,x);
        y_min = Math.min(y_min,y);
        y_max = Math.max(y_max,y);
        ctx.lineTo(x,y);
        ctx.moveTo(x,y);
    });
    ctx.stroke();
    let x_avg = average(x_min,x_max);
    let y_avg = average(y_min,y_max);
    let min_diff = Math.min(x_max-x_min,y_max-y_min);
    let textsize = min_diff/(length/4);
    let offset = min_diff/(length);
    ctx.font = `${textsize}px Allerta Stencil`;
    ctx.fillText(String.fromCharCode(ascii),x_avg-offset,y_avg);
    pointQueue.forEach(point => {
        //console.log(`starting new polyomino at ${point}`)
        let newAscii;
        if (ascii > ascii_initial + 24){
            newAscii = ascii_initial;
        }
        else{
            newAscii = ascii+1;
        }
        drawPolyomino(word,point[0],point[1],length,canvas_low_x,canvas_low_y,canvas_high_x,canvas_high_y,newAscii,pointVisited,ascii_initial);
    });

}

function average(...args){
    let sum = args.reduce((acc,curr) => {
        acc+=curr;
        return acc;
    },0);
    return Math.floor(sum/args.length);
}

function loadFont(callback){
    const image = document.getElementById("myCanvas");

    let myFont = new FontFace(
    "Allerta Stencil",
    "url(https://fonts.gstatic.com/s/allertastencil/v16/HTx0L209KT-LmIE9N7OR6eiycOe1_Db2.woff2)"
    );

    myFont.load().then((font) => {
        document.fonts.add(font);
        console.log("Font loaded");
        callback();
    });
}
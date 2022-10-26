model_status="";
objects=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(video,0,0,380,380);
    if(model_status!=""){
    object_detector.detect(video,get_results);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: object detected";
            r=random(255);
            g=random(255);
            b=random(255);
            textSize(20);
            fill(r,g,b);
            text(objects[i].label,objects[i].x,objects[i].y-10);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("message").innerHTML="baby found";
                
            }
            else{
                document.getElementById("message").innerHTML="baby not found";
            }

            if(objects.length==0){
                document.getElementById("message").innerHTML="baby not found";
            }
        }
    }
}

function model_loaded(){
    console.log("model loaded successfully");
    model_status=true;
}

function get_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
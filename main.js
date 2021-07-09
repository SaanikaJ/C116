nose_x = 0;
nose_y = 0; 

teeth_x = 0;
teeth_y = 0; 

function preload(){
    clown_nose = loadImage("https://i.postimg.cc/YqvBmzZb/red.png"); 
    teeth = loadImage("lips.png");
}

function setup(){ 
    canvas = createCanvas(300, 300);
    canvas.center(); 

    video = createCapture(VIDEO); 
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on("pose", gotPoses); 
}

function draw(){
    image(video, 0, 0, 300, 300);
    image(clown_nose, nose_x, nose_y, 35, 35);
    image(teeth, teeth_x, teeth_y, 100, 55);
    
}

function take_snapshot(){
    save("filtered_image.png");
} 

classifier = ml5.imageClassifier("MobileNet", modelLoaded); 

function modelLoaded(){ 
    console.log("Model loaded!");
} 

function gotPoses(results){
    if(results.length > 0 ){
        console.log(results); 
        console.log("Nose x = " + results[0].pose.nose.x); 
        console.log("Nose y = " + results[0].pose.nose.y); 
        nose_x = results[0].pose.nose.x - 15; 
        nose_y = results[0].pose.nose.y - 15; 

        teeth_x = nose_x - 30;
        teeth_y = nose_y + 20;
    }
}

objects = [];
status = "";

function preload(){
  video = createVideo('video.mp4');
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
  for(i = 1 ; i<=5; i++){
    console.log(i+1)
  }
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
//15
}


function draw() {
  image(video, 0, 0, 480, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
 
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);// 0.998*100 = floor(99.8) = 99
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); // dog 99%
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}

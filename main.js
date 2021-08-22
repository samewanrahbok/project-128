song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(400,150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is INITIALIZE");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist X = " + leftWristX + "leftWrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist X = " + rightWristX + "rightWrist Y = " + rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#00008B");
    stroke("#00008B");

 if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speedy").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speedy").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speedy").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speedy").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speedy").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        NumberLeftWristY = Number(leftWristY);
        remove_decimal = floor(NumberLeftWristY);
        volume = remove_decimal / 500;
        document.getElementById("volumes").innerHTML = "volume = " + volume;
        song.setVolume(volume); 
    }
}

function playbutton(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
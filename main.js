prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nEeGM-b7W/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() 
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        if(results[0].label == "Awesome")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;"
            prediction_1 = "This is looking Awesome"
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
            prediction_1 = "That was a marvelous victory"
        }
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;"
            prediction_1 = "All The Best"
        }
        if(results[1].label == "Awesome")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
            prediction_2 = "This is looking Awesome"       
        }
        if(results[1].label == "Victory")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;"
            prediction_2 = "That was a marvelous victory"
        }
        if(results[1].label == "Thumbs Up")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077"
            prediction_1 = "All The Best"
        }
        speak();
    }
}


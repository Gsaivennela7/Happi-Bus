function show() {
    showLoader();
    window.location.href = ('/submit?busNumber=' + document.getElementById('busNumber').value);
}

async function showLoader(){
    $('#exampleModal').modal();
}

const validPassengers = new Set();
var tries = 0;
var length;
navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            // Get the video and canvas elements from the HTML document
            var video = document.getElementById('video-element');
            // var video1 = document.getElementById('video-element1');
            var canvas = document.getElementById('canvas-element');
            
 
            // Set the canvas size to match the video element
            video.addEventListener('loadedmetadata', function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            });

            //stop the camera if clicked on stop button
            const stopButton = document.getElementById('stopButton');
            stopButton.addEventListener('click', stopWebcam);

      

             function stopWebcam() {
                stream.getTracks().forEach(track => track.stop());
                window.location.href = '/verification';
             }
        
 
            // Start the camera and send frames to the backend
            $(document).ready(function () {

                function render_valid_passengers() {
                    resp = '';
                    i = 0;
                    validPassengers.forEach(function(value) {
                        resp += "<tr><td>" + i + "</td><td class=\"table-secondary\">" + value + " validated!!" + "</td></tr>";
                        i += 1;
                        // resp += "<td class=\"table-secondary\">" + value + "</td></tr>";
                    });
                    $("#approved-passengers").html(resp);
                }

                navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                    var currentURL = window.location.href;
                    busNumber = $("#busNumber").attr('value');
                    setInterval(function () {
                        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                        var frameData = canvas.toDataURL('image/jpeg', 0.8);
 
                        // Send the frame data to the backend for processing
                        $.ajax({
                            url: '/frame_check',
                            type: 'POST',
                            data: {
                                    frame: frameData,
                                    busNumber: parseInt(busNumber)
                                },
                            success: function (data) {
                                console.log(data);
                                //check there is change in passenger list
                                if (data.FaceDetected && !data.FaceValidated) {
                                    // Face is detected. But face is not valid.
                                    console.log("Face is detected. But could not be validated");
                                    tries++;
                                    console.log("tries is " + tries)
                                    if (tries == 10) { // number of tries
                                        Swal.fire({
                                            title: "you are not authorized to onboard!!!",
                                            timer: 2000, // 1000 ms.
                                        });
                                        tries = 0;
                                    }
                                }

                                temp = Array.from(validPassengers)
                                if (data.FaceValidated) {
                                    // Valid user identified.
                                    tries = 0; // resetting tries
                                    data.names.forEach(validPassengers.add, validPassengers)
                                    if(temp.length != validPassengers.size) {
                                        validPassengers.forEach(function(name) {
                                            if(!temp.includes(name)) {
                                                Swal.fire({
                                                    title: name + 'you are onboarded!!!',
                                                    timer: 1000,
                                                });
                                            }
                                        });
                                    }
                                    render_valid_passengers();
                                }
                            },
                            error: function () {
                                console.log('Error processing frame');
                            }
                        });
                    }, 1000); // changing this to 100 from 5000 makes more sense
                }).catch(function (error) {
                    console.log('Error starting camera: ' + error.message);
                });
            });
        });

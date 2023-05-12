from flask import Flask,request,render_template,Response,redirect,url_for,jsonify
from main import *
import cv2
import cvzone
import face_recognition as fr
import os
import tempfile
import base64
import PIL.Image as Image 
import io

app = Flask(__name__)

global db 
global namesList
counter =0
namesList =[]
global validFaceCheck


# redirecting to the home page for verification
@app.route('/verification')
def verification():
    return render_template('home.html')

#Get all passenger details when the admin clicks submit
@app.route("/submit")
def setSubmit():
    global db
    busNumber = request.args.get("busNumber")
    db,valid = process(busNumber)
    if(valid == False):
        return render_template('success.html') 
    else:
        return render_template('display.html', busNumber=busNumber)
    
 
# check for validity of the image captured
@app.route('/frame_check', methods=['POST'])
def frame_check():
    global db 
    
    # Get the frame data from the request
    frameData = request.form['frame']
    
    # Decode the base64-encoded frame data into a byte string
    frameBytes = base64.b64decode(frameData.split(',')[1])

    # Convert the byte string into an OpenCV image
    nparr = np.frombuffer(frameBytes, np.uint8)
    image = cv2.imdecode(nparr,flags=1)
    
    # Process the image
    encodeListKnowndb,passengerIds = getDetails()
  
    #
    img,fname,faceValidated,faceDetect = compare(db,image,encodeListKnowndb,passengerIds)
    # faceDetect is false if no face is detected. ==> faceDetect is true if face is detected.
    print("detect", faceDetect)
    print("validate", faceValidated)

    print("fname",fname)
    global namesList 
    if fname not in namesList:
        if len(fname)!=0:
            namesList.append(fname)

    # validFaceCheck = faceDetect
    # # Return the processed image as a JSON response
    # We no longer require to return processed image.
    # return jsonify({'processedFrame': processedFrameData,
    #                 'validFaceCheck':faceDetect })
    return jsonify({
        'FaceDetected': faceDetect,
        'names': namesList,
        'FaceValidated': faceValidated,
        'ValidatedFaceName': fname
    })



# Start the application

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

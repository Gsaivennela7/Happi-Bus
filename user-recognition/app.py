from flask import Flask,request,render_template,Response,redirect,url_for
from main import *
import cv2
import cvzone
import face_recognition as fr

app = Flask(__name__)



@app.route("/verification")
def getStatus():
    return render_template('home.html')

@app.route("/submit")
def setSubmit():
    busNumber = request.form.get("busNumber")
    db = process(busNumber)
    return video_feed(db)

@app.route("/success")
def success():
    name = request.args.get('name')
    return render_template('success.html',value=name)


def video_feed(db):
    return Response(generate_frames(db), mimetype='multipart/x-mixed-replace;boundary=frame')

def generate_frames(db):

    encodeListKnowndb,passengerIds = getDetails()
    cap = cv2.VideoCapture(0)
    #webcam 
    cap = cv2.VideoCapture(0)
    #cap.set(3,640)
    #cap.set(4,480)
    #set the background for the screen
    imgbackground = cv2.imread('./Resources/background.jpeg')
    tmp = 0
    quit_flag= False
    while not quit_flag:
        success, img = cap.read()
        if not success:
            break
        else:          
            img,fname = compare(db,img,encodeListKnowndb,passengerIds)
            print(fname)
            ret, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            if len(fname) == 0:
                tmp += 1
                if tmp == 10:
                     #redirect(url_for('success', fname=fname))
                     pass

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
            # if(""==name):
            #     return render_template('failure.html')
        
             

        #for 5 seconds and read the key input for esc  
        b = cv2.waitKey(5) & 0xff
       
        # when the esc is pressed, terminate the loop
        if b == 27:
             print("key value")
             quit_flag=True
        
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

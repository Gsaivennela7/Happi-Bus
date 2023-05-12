import cv2
import numpy as np
import cvzone
import  pickle
import face_recognition as fr
from dbconfig import *

def getDetails():
    # get all the passengers list encodings using the pickle file
    file = open("EncodeFile.p", 'rb')
    encodeListKnownIdsdb = pickle.load(file)
    file.close()
    encodeListKnowndb,passengerIds = encodeListKnownIdsdb
    return encodeListKnowndb,passengerIds

def get_TicketID(db,passengerId):
    collectionPassenger = db.Passenger
    passenger = int(passengerId)
    knownPassenger = collectionPassenger.find_one({"passengerId":passenger})
    print("known passenger",knownPassenger)
    if knownPassenger is not None:
        ticketID = knownPassenger['ticket']['ticketId']
        firstName = knownPassenger['fName']
        update_status(collectionPassenger,ticketID)
        return firstName
    else:
        return ""

def update_status(collectionPassenger,ticketId):
    collectionPassenger.update_one({"ticket.ticketId":ticketId},{"$set": {"ticket.status": "approved"}})

#continue until there is cancellation.
def compare(db,img,encodeListKnowndb,passengerIds):
        noFaceDetected = False
        imgSc = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgSc = cv2.cvtColor(imgSc, cv2.COLOR_BGR2RGB)
        fName = ""
        fvalidated = False
        faceCascade = cv2.CascadeClassifier('./Resources/haarcascade_frontalface_default.xml')
        # print(faceCascade)
        faces = faceCascade.detectMultiScale(imgSc, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        print("faces", faces)
        print("len", len(faces))
        if len(faces) == 0:
            print("Returning false")
            noFaceDetected = False
        else:
            noFaceDetected = True
        faceCurFrame = fr.face_locations(imgSc)
        encodeCurFrame = fr.face_encodings(imgSc, faceCurFrame)
        # loop through the encodings to find a match
        for encFace, faceLoc in zip(encodeCurFrame, faceCurFrame):
            matches = fr.compare_faces(encodeListKnowndb, encFace)
            faceDist = fr.face_distance(encodeListKnowndb, encFace)
            if len(faceDist) > 0:
                matchIndex = np.argmin(faceDist)
            else:
                matchIndex = None
            # if the encodings are matched we have found a valid face
            if matchIndex is not None and matches[matchIndex]:
                # update status to approved in ticket for the passenger.
                fName = get_TicketID(db,passengerIds[matchIndex])
                fvalidated = True
                # when detected a face bound the face with the rectangle
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                bbox = 55 + x1, 162 + y1, x2 - x1, y2 - y1
                img = cvzone.cornerRect(img, bbox, rt=0)

            else:
                # if face is not detected display invalid user on frontend.
                pass
        return img,fName,fvalidated, noFaceDetected # Assuming noFaceDetected is true if no face is detected.
         
def process(busNumber):
    
    db = processEncodings(busNumber) 

    return db


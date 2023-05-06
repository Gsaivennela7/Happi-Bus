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
 
    ticketID = knownPassenger['ticket']['ticketId']
    firstName = knownPassenger['fName']
    update_status(collectionPassenger,ticketID)
    return firstName

def update_status(collectionPassenger,ticketId):
    collectionPassenger.update_one({"ticket.ticketId":ticketId},{"$set": {"ticket.status": "approved"}})

#continue until there is cancellation.
def compare(db,img,encodeListKnowndb,passengerIds):
        imgSc = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgSc = cv2.cvtColor(imgSc, cv2.COLOR_BGR2RGB)
        fName = ""
        faceCurFrame = fr.face_locations(imgSc)
        encodeCurFrame = fr.face_encodings(imgSc, faceCurFrame)

        # display the captured image at these locations
        #imgbackground[162:162 + 480, 55:55 + 640] = img

        # loop through the encodings to find a match
        for encFace, faceLoc in zip(encodeCurFrame, faceCurFrame):
            matches = fr.compare_faces(encodeListKnowndb, encFace)
            faceDist = fr.face_distance(encodeListKnowndb, encFace)

            matchIndex = np.argmin(faceDist)

            # if the encodings are matched we have found a valid face
            if matches[matchIndex]:
                print("Known face", accountIds[matchIndex])
                # update status to approved in ticket for the passenger.
                fName = get_TicketID(db,passengerIds[matchIndex])
                # when detected a face bound the face with the rectangle
                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                bbox = 55 + x1, 162 + y1, x2 - x1, y2 - y1
                img = cvzone.cornerRect(img, bbox, rt=0)

            else:
                # if face is not detected display invalid user on frontend.
                pass
        
        return img,fName
         
def process(busNumber):
    db = processEncodings(1)
    # encodeListKnowndb,passengerIds = getDetails()
    # cap = cv2.VideoCapture(0)
    # #webcam 
    # cap = cv2.VideoCapture(0)
    # while True:
    #     success, img = cap.read()
    #     if not success:
    #         break
    #     else:
    #          frame,name = compare(db,img,encodeListKnowndb,passengerIds)
    #          print(name)
    # # for 5 seconds and read the key input for esc  
    #     b = cv2.waitKey(5) & 0xff

    #     # when the esc is pressed, terminate the loop
    #     if b == 27:
    #         cap.release()
    #         cv2.destroyAllWindows()
    #         break  
    return db


#process(1)
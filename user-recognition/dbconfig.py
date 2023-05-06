from dotenv import load_dotenv,find_dotenv 
import os
import pprint
from pymongo import MongoClient
from gridfs import GridFS
import cv2
import face_recognition as fr
import os
import pickle
import numpy as np
import PIL.Image as Image 
import io
import base64

passengers = []
accountIds = []
image_document = []
imagesList =[]
passengerIds=[]
def connectDb():
    #load the environment variables
    load_dotenv(find_dotenv())
    password = os.environ.get("MONGODB_PWD")

    #connect to the MONGO DB
    connection_String = "mongodb+srv://sai_vennela:Welcome1%40@cluster0.kdsr51a.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(connection_String)

    #get the DB and collection information
    db = client.Happi_Bus
    
    return db
 
#get all the passenger details travelling in the bus
def find_all_passengers(db,busNumber):
    collectionAccount = db.account
    collectionBus = db.Bus
    passenger_dict = collectionBus.find({"busNumber":busNumber},{"passengers":1 })
    for passenger in passenger_dict:
        passengers.append(passenger["passengers"])

    passeng = np.array(passengers).flatten()
    
    for p in passeng:
        accountIds.append(p['accountId'])
        passengerIds.append(p['passengerId'])
    print("pass",passengerIds)
    

#get all the passenger photos, travelling in the bus
def find_photos(db):
    #create GirdFS
    fs = GridFS(db)
    image_documents = fs.find({'filename': {"$in": accountIds}})

    for image_document in image_documents:
        image_document_binary = image_document.read()
        imagesList.append(image_document_binary);

def findEncodings():
    enCodeList =[]
    for img in imagesList:
        #convert bgr to rgb as face-recognition uses it.
        print(type(img))
        
        #byte_image = bytes(img)

        #b = base64.b64decode(img)
        img = Image.open(io.BytesIO(img))
        #img.show()
        img = np.array(img)
        img =cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        # Use cv2.imdecode() to decode the byte buffer into a NumPy array
        # Set the 'cv2.IMREAD_COLOR' flag to decode the image as a 3-channel color image (RGB)
        # Set the '1' flag to load the image as is (without any color correction)
        #img = cv2.imdecode(np.frombuffer(byte_image, dtype=np.uint8), cv2.IMREAD_COLOR | 1)

       
        encode = fr.face_encodings(img)[0]
        enCodeList.append(encode)

    return enCodeList

def dumpPickle(enCodeList):
    encodeListknowndb = enCodeList
    encodeListknowndb = encodeListknowndb
    encodeListwithIdsdb = [encodeListknowndb,passengerIds]
    print(encodeListknowndb)

    file = open("EncodeFile.p", "wb")
    pickle.dump(encodeListwithIdsdb, file)
    file.close()

def processEncodings(busNumber):
   db = connectDb()
   find_all_passengers(db,busNumber)
   find_photos(db)
   enCodeList = findEncodings()
   dumpPickle(enCodeList)
   return db







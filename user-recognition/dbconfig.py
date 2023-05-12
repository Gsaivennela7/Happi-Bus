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
 
def checkBusNumber(db,busNumber):
    collectionBus = db.Bus
    busNumber = int(busNumber)
    result = collectionBus.find_one({"busNumber":busNumber})
    if result is not None:
        return True
    else:
        return False

#get all the passenger details travelling in the bus
def find_all_passengers(db,busNumber):
    collectionAccount = db.account
    collectionBus = db.Bus
    busNumber = int(busNumber)
    passenger_dict = collectionBus.find({"busNumber":busNumber},{"passengers":1 })
    for passenger in passenger_dict:
        passengers.append(passenger["passengers"])

    passeng = np.array(passengers).flatten()
    
    for p in passeng:
        accountId = str(p['accountId'])
        if  accountId not in accountIds:
            accountIds.append(accountId)
        if p['passengerId'] not in passengerIds:
            passengerIds.append(p['passengerId'])
    print(passengerIds,accountIds,"ghgjg")

#get all the passenger photos, travelling in the bus
def find_photos(db):
    #create GirdFS
    fs = GridFS(db)
    image_documents = fs.find({'filename': {"$in": accountIds }})
    
    for image_document in image_documents:
        
        image_document_binary = image_document.read()
        imagesList.append(image_document_binary);
    

def findEncodings():
    global imagesList
    
    enCodeList =[]
    for img in imagesList:
       
        img = Image.open(io.BytesIO(img))

        #convert into array as the cvtColor method accepts only numpy array
        img = np.array(img)

        #convert bgr to rgb as face-recognition uses it.
        img =cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        
        #find the face encodings, compute from elements at 0 index   
        encode = fr.face_encodings(img)[0]
        enCodeList.append(encode)
        

    return enCodeList

def dumpPickle(enCodeList):
    encodeListknowndb = enCodeList
    encodeListknowndb = encodeListknowndb
    encodeListwithIdsdb = [encodeListknowndb,passengerIds]
    file = open("EncodeFile.p", "wb")
    pickle.dump(encodeListwithIdsdb, file)
    file.close()

def processEncodings(busNumber):
   db = connectDb()
   valid = checkBusNumber(db,busNumber)
   if(valid):
     find_all_passengers(db,busNumber)
     find_photos(db)
     enCodeList = findEncodings()
     dumpPickle(enCodeList)
     return db,True
   else:
    return db,False

  







import cv2
import face_recognition as fr
import os
import pickle

#get all the registered passengers

folderPath = 'Modes/images'

pathList = os.listdir(folderPath)
imgList = []
passengerIds = []
for path in pathList:
    imgList.append(cv2.imread(os.path.join(folderPath,path)))
    passengerIds.append(os.path.splitext(path)[0])


#find encodings
def findEncodings(imagesList):
    enCodeList =[]
    for img in imagesList:
        #convert bgr to rgb as face-recognition uses it.
        print(type(img))
        img =cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        print(type(img))
        encode = fr.face_encodings(img)[0]
        enCodeList.append(encode)

    return enCodeList


encodeListknown = findEncodings(imgList)
encodeListwithIds = [encodeListknown, passengerIds]
print(encodeListknown)

file = open("EncodeFile.p", "wb")
pickle.dump(encodeListwithIds, file)
file.close()




import sys
import cv2
import base64
import numpy as np
import os
import random

def image_to_base64(image_np):
 
    image = cv2.imencode('.jpg',image_np)[1]
    image_code = str(base64.b64encode(image))[2:-1]
    
    return image_code

def base64_to_image(base64_code):
 
    #Base64 decoding
    img_data = base64.b64decode(base64_code)
    #Convert to NP array
    img_array = np.frombuffer(img_data, np.uint8)
    #Convert to opencv format
    img = cv2.imdecode(img_array, cv2.COLOR_RGB2BGR)
    
    return img

def to_gray(img):
    grayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return grayImage

def blend_color(img):
    mask = cv2.inRange(img, np.array(fi), np.array(ti))
    mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
    cover = np.copy(img)
    cover[(mask==255).all(-1)] = ci
    if(ci[0]>140 and ci[1]>140 and ci[2]>140):
        final = cv2.max(img, cover)
    else:
        final = cv2.min(img, cover)
    return final

def change_color(img):
    mask = cv2.inRange(img, np.array(fi), np.array(ti))
    mask = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR)
    cover = np.copy(img)
    cover[(mask==255).all(-1)] = ci
    return cover

def reduce_size(image):

    for i in np.arange(1,50,0.1):
        news=((image.shape[0]//i)*(image.shape[1]//i)*3)//8
        if(news<size):
            div=i
            break
    nshape = (int(image.shape[1]//div),int(image.shape[0]//div))
    resize = cv2.resize(image,nshape)

    return resize

def change_dimention(image):
    resize = cv2.resize(image,(0,0),fx=dimention,fy=dimention)
    return resize

def colour_inversion(img):
    img = 255 - img
    return img

def gray_inversion(img):
    grayImage = to_gray(img)
    grayImage = 255 - grayImage
    return grayImage

def frosted_glass(img):
    height, width, channels = img.shape
    # Randomly select a point in the 10x10 range of the lower right for each point
    # mm is the value range, the bigger the wider
    mm = 10
    for i in range(0, height):
        for j in range(0, width):
            # Random points
            r = int(random.random() * mm)
            r_i, r_j = i + r, j + r
            # Handling out of bounds
            if r_i >= height:
                r_i = height - 1
            elif r_i < 0:
                r_i = 0 
            if r_j >= width:
                r_j = width - 1
            elif r_j < 0:
                r_j = 0
            # Modify pixels
            img[i, j] = img[r_i, r_j]
    return img

def oil_paint(img):
    img = cv2.xphoto.oilPainting(img, 7, 1)
    # dst_gray, dst_color = cv2.pencilSketch(img, sigma_s=60, sigma_r=0.07, shade_factor=0.05) 
    return img

def pencil_sketch(image):
    mask = cv2.GaussianBlur(gray_inversion(image), ksize=(21, 21),sigmaX=0, sigmaY=0)
    return cv2.divide(to_gray(image), 255-mask, scale=256)

def quantize(img):
    quantized=img // 64 * 64 + 64 // 2
    return quantized

choice = sys.argv[2]
s = sys.argv[3].split(',')
c = sys.argv[4].split(',')
size = int(sys.argv[5])*1000
dimention = int(sys.argv[6])/100

fi=[int(s[0])-40,int(s[1])-40,int(s[2])-40]
ti=[int(s[0])+40,int(s[1])+40,int(s[2])+40]
ci=[int(c[0]),int(c[1]),int(c[2])]

f = open('tmp/'+sys.argv[1]+".txt", "r")
b64=f.read()
f.close()
os.remove('tmp/'+sys.argv[1]+".txt")
my_stdout = open( 1, "w", buffering = 5120000 ) 
sys.stdout = my_stdout                           # now stdout buffer size will be 5mb

img=base64_to_image(b64)

if choice == '1':
    mod_image = to_gray(img)
elif choice == '2':
    mod_image = blend_color(img)
elif choice == '3':
    mod_image = change_color(img)
elif choice == '4':
    mod_image = reduce_size(img)
elif choice == '5':
    mod_image = change_dimention(img)
elif choice == '6':
    mod_image = colour_inversion(img)
elif choice == '7':
    mod_image = gray_inversion(img)
elif choice == '8':
    mod_image = frosted_glass(img)
elif choice == '9':
    mod_image = oil_paint(img)
elif choice == '10':
    mod_image = pencil_sketch(img)
elif choice == '11':
    mod_image = quantize(img)


out=image_to_base64(mod_image)

print(out)


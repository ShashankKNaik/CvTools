import sys
import base64
from io import BytesIO
from PIL import Image
import os
 
def image_to_base64(img):
    output_buffer = BytesIO()
    img.save(output_buffer, format='JPEG')
    byte_data = output_buffer.getvalue()
    base64_str = base64.b64encode(byte_data)
    return base64_str


def base64_to_image(base64_str):
    byte_data = base64.b64decode(base64_str)
    image_data = BytesIO(byte_data)
    img = Image.open(image_data)
    return img

f = open('tmp/'+sys.argv[1]+".txt", "r")
x=f.read()
f.close()
os.remove('tmp/'+sys.argv[1]+".txt")
my_stdout = open( 1, "w", buffering = 5120000 )
sys.stdout = my_stdout

img=base64_to_image(x)

mod_image=img.convert('1')

out=image_to_base64(mod_image)
out=str(out)
print(out[2:-1])
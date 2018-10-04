# -*- coding: utf-8 -*-
############################################################
# Example usage:
# python facinator.py './nicornot/Testing Data/nic' jpg './nicornotfaces/Testing Data/nic/'
#
# first param: path to files (default current directory)
# second param: search glob (default `*.jpg`)
# third param: folder to store results (default ./faces/)
############################################################
import glob, os, sys, re
from PIL import Image
import face_recognition

# Some default params
params = sys.argv
dir = params[1] if 1 < len(params) else "./"
pattern = "*." + params[2] if 2 < len(params) else "*.jpg"
face_folder = params[3] if 3 < len(params) else "./faces/"

# Make sure the face dir exists
if not os.path.exists(face_folder):
  os.makedirs(face_folder)

files = glob.glob(os.path.join(dir, pattern))
print("{} files found - Now checking".format(len(files)))
print("-------------------------------")

for pathAndFilename in files:
  print("Checking file: {}".format(pathAndFilename))
  try:
    # Find faces in image
    image = face_recognition.load_image_file(pathAndFilename)
    face_locations = face_recognition.face_locations(image)
    print("Found {} face(s) in this photograph.".format(len(face_locations)))

    for index, face_location in enumerate(face_locations):
      # Print the location of each face in this image
      top, right, bottom, left = face_location
      print("😸 A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom, right))

      # You can access the actual face itself like this:
      face_image = image[top:bottom, left:right]
      pil_image = Image.fromarray(face_image)
      # store image as JPG
      basefile = os.path.basename(pathAndFilename)
      basename, baseext = os.path.splitext(basefile)
      new_file_name = face_folder + basename + "_face" + str(index) + ".jpg"
      print("🗳 Saving face file {}".format(new_file_name))
      pil_image.save(new_file_name, "JPEG", quality=100, optimize=True)
      # don't uncomment this, just keeping it around like a puppy
      # pil_image.show()
    print("~~~~")
  except:
    print("💔 Bad image")

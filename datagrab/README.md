# Nic Or Not

Here's the code for gathering the data for the NicOrNot model.

## Gathering images

#### Getting Chrome Driver (Mac)

`brew tap homebrew/cask`
`brew cask install chromedriver`
`which chromedriver`

#### Running image grabber

via https://github.com/hardikvasa/google-images-download
`googleimagesdownload -cf cage_grabs.json`

Afraid of just crazy people? Add Chad Kroeger!

#### Remove dupes

https://macpaw.com/gemini (caught 1)

#### Go through data manually and delete from positives

Deleting positives: OMG LOL - GF walked by while doing this...
Deleting negatives: finding nic cage here, too

#### Move 20% of the data to Test

Create `Testing Data` with `nic` and `not` folders with 20% of the finalized data.

### JUST FACES? - Parse through image data and just gather faces

Install the needed face recognition library:

```shell
$ pip install face_recognition
```

Now run the following command to convert Testing/Training data to just faces

```shell
$ ./faceoff.sh
```

If it fails on an image, delete the source image. Then when it is 100% successful, all faces will be stored to `nicornotfaces` folders as JPGs; go through the resulting files and delete false positives for nic.

## Convert `.cafe` to CoreML `mlmodel`

#### Install Coremltools

For running `convert.py` make sure you have 'coremltools' installed first.

```
$ pip install -U coremltools --user
```

#### Then convert and downsize

Convert file to new type

```
$ python convert.py
```

Cut file size in half - quantize model weights

```
$ python downsize.py
```

OR use `manysize.py`

```
$ python manysize.py
```

## Converting Caffe to Tensorflow

Use this script: [caffee_to_tensorflow.py](./caffe_to_tensorflow.py)

## Converting Tensorflow to TensorflowJS

https://ndres.me/post/convert-caffe-to-tensorflow/

required this fix: https://github.com/ethereon/caffe-tensorflow/issues/149

Then convert to web with:

```
 $ tensorflowjs_converter
--input_format=tf_frozen_model \
--output_node_names='softmax' \
./Nic.pb \
./WebNic
```

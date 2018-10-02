import coremltools

# Convert a caffe model to a classifier in Core ML
coreml_model = coremltools.converters.caffe.convert((
  'snapshot_iter_105.caffemodel',
  'deploy.prototxt',
  'mean.binaryproto'),
  image_input_names = 'data',
  class_labels = 'labels.txt',
  is_bgr=True, image_scale=256.)

# Now save the model
coreml_model.save('MegaNic.mlmodel')

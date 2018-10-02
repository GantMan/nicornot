import coremltools

# Load a model
print("Loading Model")
print("-------------------------------")
model_spec = coremltools.utils.load_spec('./MegaNic.mlmodel')

# Lower precision
print("Lowering Precision of Loaded Model")
print("-------------------------------")
model_fp16_spec = coremltools.utils.convert_neural_network_spec_weights_to_fp16(model_spec)

# Save new smaller model
print("Saving NEW Model")
print("-------------------------------")
coremltools.utils.save_spec(model_fp16_spec, './MegaNicFP16.mlmodel')

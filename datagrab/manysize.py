# https://github.com/kingreza/quantization
#  Create several different smaller models of
#  the original model from CoreML
import coremltools
mode_name = "MegaNic50"

model = coremltools.models.MLModel(mode_name+".mlmodel")

functions = ["linear", "linear_lut", "kmeans"]

for function in functions :
    for bit in [16,8,7,6,5,4,3,2,1]:
        print("processing ",function," on ",bit,".")
        lin_quant_model = coremltools.models.neural_network.quantization_utils.quantize_weights(model, bit, function)
        lin_quant_model.short_description = str(bit)+" bit per quantized weight, using "+function+"."
        lin_quant_model.save(mode_name+"_"+function+"_"+str(bit)+".mlmodel")

# # import warnings
# # warnings.filterwarnings('ignore')
# # import pickle
# # import tensorflow as tf
# # from tensorflow.keras.preprocessing import image
# # import numpy as np
# # import sys

# # model = pickle.load(open("G:/hem/SIGNUP/sugnup/src/compon/login/img.pkl", "rb"))
# # print(type(model))

# # with open("G:\hem\SIGNUP\sugnup\src\compon\login\img.pkl",mode='rb') as f:
# #     model=pickle.load(f)
# # # Get the image file path from the command line arguments
# # dir_path = sys.argv[1]

# # # Load and preprocess the image
# # img = image.load_img(dir_path, target_size=(199, 199, 3))
# # X = image.img_to_array(img)
# # X = np.expand_dims(X, axis=0)

# # # Make predictions using the loaded model
# # ans = model.predict(X, verbose=0)

# # # Define your classes based on your model
# # classes = ['EOSINOPHIL', 'MONOCYTE']

# # # Print the predicted class
# # print(classes[np.argmax(ans[0])])
# import pickle
# import sys
# import json
# import pickle
# import os
# import numpy as np
# import warnings

# import numpy as np
# from PIL import Image

# os.environ['TF_CPP_MIN_LOG_LEVEL']='2'

# user_data = dict(json.loads(sys.stdin.read()))

# filePath = list(user_data.values())[0]

# complete_file_path = filePath

# model_path = r"G:\hem\SIGNUP\sugnup\src\compon\login\img.pkl"


# with open(model_path, "rb") as f:
# 	saved_model = pickle.load(f)



# img = np.array(Image.open(complete_file_path))
# to_predict = np.reshape(img, (1, 240, 320, 3))
# model_output = saved_model.predict(to_predict, verbose=0)

# if(model_output[0][0] < 0.5):
# 	result = "Eosinophil"

# else:
# 	result = "Lymphocyte"


# data_to_send = {
# 	"output": result
# }

# print('result')

# data_to_send = json.dumps(data_to_send)

# sys.stdout.write(data_to_send)
# sys.stdout.flush()
# from PIL import Image
# import numpy as np
# from tensorflow.keras.models import load_model
# import json
# import sys
# # Provide the file path directly in the code
# file_path = r"G:\hem\SIGNUP\sugnup\src\compon\login\uploads\_0_1169.jpeg"

# # Load the model
# model_path_h5 = r"G:\hem\SIGNUP\sugnup\src\compon\login\model.h5"
# saved_model = load_model(model_path_h5)

# # Diagnostics to check the loaded object type
# print("Loaded Object Type:", type(saved_model))

# # Check if the loaded object is a Keras model
# if not hasattr(saved_model, 'predict') or not callable(getattr(saved_model, 'predict', None)):
#     raise ValueError("The loaded object is not a callable Keras model.")

# # Load and resize the image
# img = Image.open(file_path)
# img = img.resize((199, 199))  # Resize the image to match the expected input shape
# img_array = np.array(img)
# img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
# img_array = img_array / 255.0  # Normalize pixel values to be in the range [0, 1]

# # Make the prediction based on the model output
# model_output = saved_model.predict(img_array, verbose=0)

# # Make the prediction based on the model output
# if model_output[0][0] < 0.5:
#     result = "Eosinophil"
# else:
#     result = "Lymphocyte"

# # Print the result
# print("Prediction Result:", result)

# # Prepare the data to send
# data_to_send = {"output": result}
# data_to_send = json.dumps(data_to_send)
# sys.stdout.write(data_to_send)
# import pickle
# import sys
# import json
# import os
# import numpy as np
# from PIL import Image
# from tensorflow.keras.models import load_model

# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# # Read user input from stdin
# user_data = dict(json.loads(sys.stdin.read()))
# filePath = list(user_data.values())[0]
# complete_file_path = filePath
# print(f"Complete File Path: {complete_file_path}")

# # Load the pre-trained model
# model_path_h5 = r"G:\hem\SIGNUP\sugnup\src\compon\login\model.h5"
# saved_model = load_model(model_path_h5)

# try:
#     # Read and resize the image
#     img = Image.open(complete_file_path)
#     img = img.resize((199, 199))  # Resize the image to match the expected input shape
#     img_array = np.array(img)
#     img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#     img_array = img_array / 255.0  # Normalize pixel values to be in the range [0, 1]

#     # Make the prediction based on the model output
#     model_output = saved_model.predict(img_array, verbose=0)

#     if model_output[0][0] < 0.5:
#         result = "Eosinophil"
#     else:
#         result = "Lymphocyte"

#     # Prepare the data to send
#     data_to_send = {"output": result}
#     data_to_send = json.dumps(data_to_send)
#     data_to_send = {"output": result}
#     print(json.dumps(data_to_send))
#     sys.stdout.write(data_to_send)
    
#     sys.stdout.flush()

# except Exception as e:
#     print(f'Error during prediction: {e}', file=sys.stderr)
#     sys.exit(1)

# import json
# import sys
# import os
# import numpy as np
# from PIL import Image
# from tensorflow.keras.models import load_model

# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# user_data = dict(json.loads(sys.stdin.read()))
# filePath = list(user_data.values())[0]
# complete_file_path = filePath
# print(f"Complete File Path: {complete_file_path}")

# model_path_h5 = r"G:\hem\SIGNUP\sugnup\src\compon\login\model.h5"
# saved_model = load_model(model_path_h5)

# try:
#     img = Image.open(complete_file_path)
#     img = img.resize((199, 199))
#     img_array = np.array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = img_array / 255.0

#     model_output = saved_model.predict(img_array, verbose=0)

#     if model_output[0][0] < 0.5:
#         result = "Eosinophil"
#     else:
#         result = "Lymphocyte"

#     data_to_send = {"output": result}
#     json_output = json.dumps(data_to_send)
#     # print(json_output)
#     print(json.dumps(result))
#     # print(json_output)  

#     sys.stdout.write(json_output)
#     sys.stdout.flush()

# except Exception as e:
#     error_message = {"error": str(e)}
#     json_error_message = json.dumps(error_message)
#     print(json_error_message, file=sys.stderr)
#     sys.exit(1)
import json
import sys
import os
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model

# Disable TensorFlow and oneDNN warnings
import tensorflow as tf
tf.get_logger().setLevel('ERROR')
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

try:
    # Read data from stdin, ensuring it's not empty
    input_data = sys.stdin.read()
    if not input_data.strip():
        raise ValueError("Empty input data")

    user_data = json.loads(input_data)
    filePath = user_data.get("filePath", "")
    if not filePath:
        raise ValueError("Missing filePath in input data")

    complete_file_path = filePath
    print(f"Complete File Path: {complete_file_path}")

    model_path_h5 = r"G:\hem\SIGNUP\sugnup\src\compon\login\model.h5"
    saved_model = load_model(model_path_h5)

    try:
        img = Image.open(complete_file_path)
        img = img.resize((199, 199))
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        model_output = saved_model.predict(img_array, verbose=0)

        if model_output[0][0] < 0.5:
            result = "Eosinophil"
        else:
            result = "Lymphocyte"

        print(json.dumps(result))
        sys.stdout.flush()

    except Exception as e:
        error_message = {"error": str(e)}
        json_error_message = json.dumps(error_message)
        print(json_error_message, file=sys.stderr)
        sys.exit(1)

except Exception as e:
    error_message = {"error": str(e)}
    json_error_message = json.dumps(error_message)
    print(json_error_message, file=sys.stderr)
    sys.exit(1)

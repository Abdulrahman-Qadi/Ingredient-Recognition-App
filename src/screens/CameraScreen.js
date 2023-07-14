// import { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as tf from '@tensorflow/tfjs';
// import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
// import * as jpeg from 'jpeg-js';
// import { Asset } from 'expo-asset';

// export default function CameraScreen() {
//   const [cameraPermission, setCameraPermission] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
//   const [camera, setCamera] = useState(null);
//   const [model, setModel] = useState(null);
//   const [ingredient, setIngredient] = useState(null);

//   const loadModel = async () => {
//     const mobilenet = require('@tensorflow-models/mobilenet');
//     // Load the model.
//     const model = await mobilenet.load();
//     setModel(model);
//     setLoading(false);
//     console.log('Model loaded successfully');
//   };

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setCameraPermission(status === 'granted');
//       console.log(`Camera permission status: ${status}`);
//       await loadModel();
//     })();
//   }, []);

//   const preprocessImage = async (imageData) => {
//     const { width, height, data } = jpeg.decode(imageData, { useTArray: true });
//     const buffer = new Uint8Array(width * height * 3);
//     let offset = 0;
//     for (let i = 0; i < buffer.length; i += 3) {
//       buffer[i] = data[offset];
//       buffer[i + 1] = data[offset + 1];
//       buffer[i + 2] = data[offset + 2];
//       offset += 4;
//     }
//     const imageTensor = tf.tensor3d(buffer, [height, width, 3]);
//     const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [299, 299]).div(tf.scalar(255));
//     const batchedImageTensor = resizedImageTensor.expandDims(0);
//     return batchedImageTensor;
//   };

//   const predictIngredient = async () => {
//     console.log('Capture button pressed');
//     try {
//       if (camera && model) {
//         console.log('Camera and model are ready');
//         const imageData = await camera.takePictureAsync({ base64: true });
//         const imageTensor = await preprocessImage(imageData.base64);
//         const predictions = await model.predict(imageTensor).data();
//         console.log('Predictions:', predictions);
//         const predictedIngredient = getIngredientName(predictions);
//         console.log(`Predicted ingredient: ${predictedIngredient}`);
//       } else {
//         console.log('Camera or model not ready!');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   const getIngredientName = (predictions) => {
//     const ingredientMap = {
//       0: 'Apple',
//       1: 'Banana',
//       2: 'Broccoli',
//       3: 'Coconut',
//       4: 'Dates',
//       5: 'Mango',
//       6: 'Olives',
//       7: 'Lemon',
//       8: 'Aubergine',
//       9: 'Bell Pepper',
//       10: 'Corn',
//       11: 'Coriander',
//       12: 'Cucumber',
//       13: 'Garlic',
//       14: 'Lettuce',
//       15: 'Mint',
//       16: 'Onion',
//       17: 'Orange',
//       18: 'Peach',
//       19: 'Pear',
//       20: 'Pineapple',
//       21: 'Potato',
//       22: 'Raspberry',
//       23: 'Tomato',
//       24: 'Watermelon',
//       25: 'Carrot',
//       26: 'Milk',
//       27: 'Blueberry',
//       28: 'Eggs',
//       29: 'Ginger',
//       30: 'Grapes',
//       31: 'Spinach',
//       32: 'Pomegranate',
//       33: 'Avocado'
//     };
//     const predictedIngredientIndex = predictions.indexOf(Math.max(...predictions));
//     return ingredientMap[predictedIngredientIndex];
//   };

//   const handleCameraTypeChange = () => {
//     setCameraType(
//       cameraType === Camera.Constants.Type.back
//         ? Camera.Constants.Type.front
//         : Camera.Constants.Type.back
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {cameraPermission && (
//         <View style={{ flex: 1 }}>
//           <Camera
//             style={{ flex: 1 }}
//             type={cameraType}
//             ref={(ref) => setCamera(ref)}
//             ratio="16:9"
//           />
//           <View style={styles.topLeftBracket} />
//           <View style={styles.topRightBracket} />
//           <View style={styles.bottomLeftBracket} />
//           <View style={styles.bottomRightBracket} />
//           {loading ? (
//             <View
//             style={{
//               alignSelf: 'center',
//               position: 'absolute',
//               bottom: 32,
//             }}
//               >
//             <ActivityIndicator size="large" color="#ffffff" />
//             </View>
//             ) : (
//           <TouchableOpacity
//               style={{
//                 alignSelf: 'center',
//                 position: 'absolute',
//                 bottom: 32,
//               }}
//               onPress={predictIngredient}
//             >
//             <View
//               style={{
//                 borderWidth: 2,
//                 borderRadius: '50%',
//                 borderColor: 'white',
//                 height: 60,
//                 width: 60,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//           <View
//             style={{
//               borderWidth: 2,
//               borderRadius: '50%',
//               borderColor: 'white',
//               height: 50,
//               width: 50,
//               backgroundColor: 'white',
//             }}
//           ></View>
//         </View>
//       </TouchableOpacity>
//       )}
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           top: 32,
//           right: 16,
//         }}
//         onPress={handleCameraTypeChange}
//       >
//         <Image style={{height: 50, width: 50, marginTop: 10, marginLeft: 5}}
//           source={
//             cameraType === Camera.Constants.Type.back
//               ? require('../../assets/camera-front.png')
//               : require('../../assets/camera-front.png')
//           }
//         />
//       </TouchableOpacity>
//       {ingredient && (
//         <View
//           style={{
//             position: 'absolute',
//             bottom: 32,
//             left: 16,
//             backgroundColor: 'white',
//             borderRadius: 10,
//             padding: 16,
//           }}
//         >
//           <Text style={{ fontSize: 16 }}>{ingredient}</Text>
//         </View>
//       )}
//     </View>
//   )}
// </View>
//   );
// }

// const { height, width } = Dimensions.get('window');

// const styles = StyleSheet.create({
// topLeftBracket: {
//   position: 'absolute',
//   top: 190,
//   left: 230,
//   width: 60,
//   height: 60,
//   borderTopWidth: 1,
//   borderLeftWidth: 1,
//   borderColor: 'white',
//   marginLeft: -170,
// },
// topRightBracket: {
//   position: 'absolute',
//   top: 190,
//   right: 60,
//   width: 60,
//   height: 60,
//   borderTopWidth: 1,
//   borderRightWidth: 1,
//   borderColor: 'white',
// },
// bottomLeftBracket: {
//   position: 'absolute',
//   bottom: height / 2 - 120,
//   left: 230,
//   width: 60,
//   height: 60,
//   borderBottomWidth: 1,
//   borderLeftWidth: 1,
//   borderColor: 'white',
//   marginLeft: -170,
// },
// bottomRightBracket: {
//   position: 'absolute',
//   bottom: height / 2 - 120,
//   right: 60,
//   width: 60,
//   height: 60,
//   borderBottomWidth: 1,
//   borderRightWidth: 1,
//   borderColor: 'white',
// },
// });

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { decode } from 'base64-arraybuffer';
import * as jpeg from 'jpeg-js';
import { KNNClassifier } from '@tensorflow-models/knn-classifier';

// Import images
import appleImage from '../../assets/Train/Apple/apple.jpg';
import bananaImage from '../../assets/Train/Banana/banana.jpg';
import broccoliImage from '../../assets/Train/Broccoli/broccoli.jpg';
// ... import all the other images

const trainingData = [
  { label: 'Apple', image: appleImage },
  { label: 'Banana', image: bananaImage },
  { label: 'Broccoli', image: broccoliImage },
  // ... add all the other images with their labels
];

export default function CameraScreen() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const classifierRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
      console.log('Camera permission status:', status);
      await tf.ready();
      await createClassifier();
    })();
  }, []);

  const createClassifier = async () => {
    classifierRef.current = await KNNClassifier.create();

    for (const item of trainingData) {
      const imageTensor = await imageToTensor(item.image);
      classifierRef.current.addExample(imageTensor, item.label);
    }
    console.log('Classifier created and training data added');
  };

  const imageToTensor = async (uri) => {
    const imageData = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const byteArray = decode(imageData);
    const { width, height, data } = jpeg.decode(byteArray, { useTArray: true });
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    const imageTensor = tf.tensor3d(buffer, [height, width, 3]);
    const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]).div(tf.scalar(255));
    return resizedImageTensor;
  };
  const captureAndClassifyImage = async () => {
    if (cameraRef.current && classifierRef.current) {
      const imageTensor = await captureImage();
      const prediction = await classifierRef.current.predictClass(imageTensor);
      console.log(prediction.label);
    } else {
      console.log("Camera or model not ready!");
    }
  };

  const captureImage = async () => {
    const options = { quality: 0.5, base64: true, width: 224, height: 224 };
    const photo = await cameraRef.current.takePictureAsync(options);
    const imageTensor = await imageToTensor(photo.uri);
    return imageTensor;
  };

  if (cameraPermission === null) {
    return <View />;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={captureAndClassifyImage} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  captureButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 70,
    height: 70,
  },
});


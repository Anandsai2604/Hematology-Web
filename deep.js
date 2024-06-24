import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your CSS file

const Deep = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [prediction, setPrediction] = useState('');
  const navigate = useNavigate();
  const [imageURL,setImageURL]=useState('');
  const formData = new FormData();
  formData.append('file', selectedFile);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : '');
    const reader = new FileReader();
  reader.onloadend = () => {
    setImageURL(reader.result);
  };
  reader.readAsDataURL(file);
  };

  const handlePredictClick = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:3002/deep', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Prediction failed');
        console.error('Error Details:', await response.text());
        throw new Error(`Server responded with status ${response.status}`);
      }

      const responseText = await response.text();

      if (responseText.trim() === '') {
        console.error('Empty response from the server');
        return;
      }

      const predictionStartIndex = responseText.indexOf('"') + 1;
      const predictionEndIndex = responseText.lastIndexOf('"');
      const extractedPrediction = responseText.substring(predictionStartIndex, predictionEndIndex);

      setPrediction(extractedPrediction);

    } catch (error) {
      console.error('Prediction request failed:', error);
    }
  };

  const handleGoBackClick = () => {
    navigate('/main');
  };

  return (
    <div className="deep-container">
      <h1>PREDICT THE TYPE OF BLOOD CELL</h1>

      <div>
        <h2>Upload</h2>
        <label className="file-input-label">
          {fileName || 'Choose File'}
          <input type="file" onChange={handleFileChange} />
        </label>
      </div>
      {imageURL && (
        <div>
          <h2>Selected Image</h2>
          <img src={imageURL} alt="Selected" className="selected-image" />
        </div>
      )}
      <div>
        <h2>Predict</h2>
        <div className='prediction-container'>
          <button onClick={handlePredictClick}>Predict</button>
          {prediction && <p className="prediction-text">Prediction: {prediction}</p>}
        </div>
      </div>

      <div className='go-to-main-menu'>
        <button onClick={handleGoBackClick}>Go Back to Main</button>
      </div>
    </div>
  );
};

export default Deep;


  const express = require('express');
    const { spawn } = require('child_process');
    const cors = require('cors');
    const app = express();
    const port = 3002;
    const YourFormModel = require('./temp')
    const mongoose = require('mongoose')
    // const { spawn } = require('child_process');
    const { promisify } = require('util');
  
    app.use(cors());
    app.use(express.json());
    

    mongoose.connect('', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    }).then((res) => console.log("COnnected to mongo"))
    .catch((err) => console.log(err))

    
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
    
1
    const executePythonScript = (pythonScript, args, res) => {
      const pythonProcess = spawn('python', [pythonScript, ...args]);

      let predictionResult = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        predictionResult += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log('Python script execution completed with code:', code);
        console.log(predictionResult);
        if (code === 0) {
          res.json({ prediction: predictionResult });
        } else {
          console.error('Python script execution failed with code:', code);
          console.error('Error output:', errorOutput);
          res.status(500).json({ error: 'Internal server error' });
        }
      });

      pythonProcess.on('error', (error) => {
        console.error('Error executing Python script:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
    };

    app.post('/predict', async (req, res) => {
      
      
      let dataToBeSaved = new YourFormModel({
        Gender: req.body.Gender,
        Hemoglobin: req.body.Hemoglobin,
        MCH: req.body.MCH,
        MCHC: req.body.MCHC,
        MCV: req.body.MCV,
        Model: req.body.Model
      })
      console.log('Received data:', {
        Gender: req.body.Gender,
        Hemoglobin: req.body.Hemoglobin,
        MCH: req.body.MCH,
        MCHC: req.body.MCHC,
        MCV: req.body.MCV,
        Model: req.body.Model,
        // Prediction: prediction
      });
      await dataToBeSaved.save()
      const args = [req.body.Gender, req.body.Hemoglobin, req.body.MCH, req.body.MCHC, req.body.MCV, req.body.Model];

      if (args.some((arg) => !arg)) {
        return res.status(400).json({ error: 'Missing required data in the request.' });
      }

      console.log("DATA SAVED")

      const pythonScript = 'predict.py';
      console.log(pythonScript);
      executePythonScript(pythonScript, args, res);
    });

    app.post('/optim', (req, res) => {
      console.log('Received optimistic prediction data:', req.body);

      const { Gender, Hemoglobin, MCV, Model } = req.body;
      const args = [Gender, Hemoglobin, MCV, Model];

      if (args.some((arg) => !arg)) {
        return res.status(400).json({ error: 'Missing required data in the request.' });
      }
      console.log('Received optimistic prediction data:', req.body);

      // Note: Omitting MCH and MCHC for optimistic prediction
      const pythonScript = 'optim.py';
      executePythonScript(pythonScript, args, res);
    });
    
   

  const multer = require('multer');
  const { spawnSync } = require('child_process');
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, '_' + Date.now() + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

  app.post('/deep', upload.single('file'), async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        throw new Error('No file uploaded');
      }
      console.log('File path:', req.file.path);
      console.log('Image prediction called!');

      const pythonExecutable = 'python.exe';
      const pythonFile = 'G:\\hem\\SIGNUP\\sugnup\\src\\compon\\login\\deep.py';

      const pythonProcess = spawnSync(pythonExecutable, [pythonFile], {
        input: JSON.stringify({ "filePath": String(req.file.path) }),
        encoding: 'utf-8'
      });

      console.log('Python script executed successfully');
      console.log('Received data from Python:', pythonProcess.stdout);

      if (pythonProcess.error) {
        console.error('Error occurred in python:', pythonProcess.error);
        return res.status(500).json({ error: `Error occurred in python: ${pythonProcess.error.message}` });
      }

      if (pythonProcess.stderr) {
        console.error('Python Process Stderr:', pythonProcess.stderr);
      }

      return res.status(200).send(pythonProcess.stdout);
    } catch (err) {
      console.error('Error in try-catch block:', err);
      return res.status(500).json({ error: `Unhandled error: ${err.message}` });
    }
  });


    app.listen(port,() => {
      console.log(`Server is running on port ${port}`);
    });
const express = require('express');
const collection = require('./reg');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

let otpres = '';

// Route to send OTP via email
app.post('/otp', async (req, res) => {
  const { email } = req.body;
  
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpres = otp.toString();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
          });

    const mailOptions = {
      from: 'your email,
      to: email.toString(),
      subject: 'OTP verification from Mykart',
      text: otp.toString(),
    };

    await transporter.sendMail(mailOptions);
    otpres = '';
    // res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    
    // res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user =collection.findOne({ email, password });

    if (user) {
      res.json({ success: true, message: 'User authenticated successfully' });
    } else {
      res.json({ success: false, message: 'Incorrect email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Error during login' });
  }
});

const otpStore = [];


app.post('/send-otp-email', (req, res) => {
  const { email } = req.body;
  const generatedOtp = generateRandomOtp(); 
  otpStore.push({ email, otp: generatedOtp });
  // Send the OTP to the user's email (you need to implement this part)
  res.json({ message: 'OTP sent successfully' });
});


app.post('/verify-otp', (req, res) => {
  const { email, enteredOtp } = req.body;
  const storedOtp = otpStore.find((entry) => entry.email === email);

  if (!storedOtp) {
    return res.status(400).json({ message: 'Email not found or OTP expired' });
  }

  if (enteredOtp === storedOtp.otp) {
    // Correct OTP, you can clear the OTP from the store or mark it as used
    res.json({ isOtpVerified: true, message: 'OTP verified successfully' });
  } else {
    // Incorrect OTP
    res.json({ isOtpVerified: false, message: 'Incorrect OTP' });
  }
});


app.listen(3001, () => {
  console.log(`Server running on port ${port}`);
});

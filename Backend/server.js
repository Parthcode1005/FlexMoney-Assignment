// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { CompletePayment } = require('./paymentUtils');
const User = require('./models/User');

// Create an instance of Express
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB 
mongoose.connect('mongodb+srv://ParthMongo:oNItyqoS3BO5R1u1@mongoyoutube.cxkjl0a.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define API routes

// Registration endpoint
app.post('/api/register', async (req, res) => {
    // Extract user details from the request body
    const { name, email, password, phone, age, date, selectedBatch } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'Email is already registered' });
        }

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password,
            phone,
            age,
            date,
            selectedBatch,
        });

        await newUser.save();

        // Respond with success
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        // Extract user credentials from the request body
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email, password });

        if (user) {
            // Check if the user has paid the fee
            const feesPaid = user.feesPaid || false;

            // Respond with success and payment status
            res.json({ success: true, feesPaid, user });
        } else {
            // Respond with failure for invalid user
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, error: 'Login failed. Please try again.' });
    }
});

app.post('/api/payment', async (req, res) => {
    // Extract card details from the request body
    const { cardNumber, cardHolderName, expiryDate, cvv } = req.body;

    // Validate card details (in a real scenario, use a payment gateway)    
    const paymentResult = CompletePayment(cardNumber, cardHolderName, expiryDate, cvv);

    if (paymentResult.success) {
        // Update the user's payment status in the database
        await User.updateOne({}, { feesPaid: true });

        // Respond with success
        res.json({ success: true, message: 'Payment successful' });
    } else {
        // Respond with failure for payment
        res.json({ success: false, message: 'Payment failed' });
    }
});

app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (user) {
            res.json({
                success: true,
                user: {
                    name: user.name,
                    age: user.age,
                    date: user.date,
                    selectedBatch: user.selectedBatch,
                },
            });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
    }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Set up the server to listen on a port (replace 'your_port_number' with your desired port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

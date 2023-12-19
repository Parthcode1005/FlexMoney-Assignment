/* src/components/Payment.js */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser, UserProvider, UserContext } from '../contexts/UserContext';
import './Payment.css'; // Import the Payment-specific CSS

const Payment = () => {
    const history = useHistory();
    const { user } = useContext(UserContext); // Destructure user from the context
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    useEffect(() =>{
        console.log("Login hua")
    }, [user])

    const handlePayment = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!cardNumber || !cardHolderName || !expiryDate || !cvv) {
            toast.error('Please fill in all the card details.');
            return;
        }

        try {
            // Send payment request to the backend
            const response = await axios.post('http://localhost:5000/api/payment', {
                cardNumber,
                cardHolderName,
                expiryDate,
                cvv,
            });

            if (response.data.success) {
                // Payment successful, redirect to the confirmation page
                history.push('/confirmation');
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error making payment:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='payment-container'>
            <h1>Congratulations</h1>
            <h2>Hi <strong>{user?.name}</strong>, you have successfully registered</h2>
            <h3>Please fill the form to make the payment</h3>

            <p>Amount: 500/-</p>

            <form onSubmit={handlePayment}>
                <div className="form-group">
                    <label>Card Number:</label>
                    <input type="text" pattern="\d{16}" placeholder="16-digit number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Card Holder Name:</label>
                    <input type="text" pattern="[A-Za-z ]*" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Expiry Date:</label>
                    <input type="text" pattern="(0[1-9]|1[0-2])\/\d{2}" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>CVV:</label>
                    <input type="text" pattern="\d{3}" placeholder="Three-digit code" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>

                <button type="submit">Make Payment</button>
            </form>

        </div >
    );
};

export default Payment;

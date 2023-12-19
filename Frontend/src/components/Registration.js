// src/components/Registration.js
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserProvider, useUser, UserContext } from '../contexts/UserContext';

import './Registration.css';

const Registration = () => {
    const history = useHistory();
    const { setUser } = useUser(); // useUser hook returns the context value
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [date, setDate] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Basic validation
            if (!name || !email || !password || !phone || !age || !date || !selectedBatch) {
                toast.error('Please fill in all the details.');
                return;
            }

            // Age validation
            const ageNum = parseInt(age, 10);
            if (ageNum < 18 || ageNum > 65) {
                toast.error('Age must be between 18 and 65.');
                return;
            }

            // Send registration request to the backend
            const response = await axios.post('http://localhost:5000/api/register', {
                name,
                email,
                password,
                phone,
                age: ageNum,
                date,
                selectedBatch,
            });

            if (response.data.success) {
                setUser({
                    name,
                    email,
                    phone,
                    age: ageNum,
                    date,
                    selectedBatch,
                });
                
                // Registration successful, redirect to payments page
                history.push('/payment');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className='center-container'>
            <div className='register-heading'>
                <h2>Registration Page</h2>
            </div>
            <div className='form-container'>
                <form onSubmit={handleRegister}>
                    {/* Rest of the form content */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required min={18} max={65} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Preferred Batch:</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="batch"
                                    value="6-7AM"
                                    checked={selectedBatch === '6-7AM'}
                                    onChange={() => setSelectedBatch('6-7AM')}
                                />
                                6-7AM
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="batch"
                                    value="7-8AM"
                                    checked={selectedBatch === '7-8AM'}
                                    onChange={() => setSelectedBatch('7-8AM')}
                                />
                                7-8AM
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="batch"
                                    value="8-9AM"
                                    checked={selectedBatch === '8-9AM'}
                                    onChange={() => setSelectedBatch('8-9AM')}
                                />
                                8-9AM
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="batch"
                                    value="5-6PM"
                                    checked={selectedBatch === '5-6PM'}
                                    onChange={() => setSelectedBatch('5-6PM')}
                                />
                                5-6PM
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Registration;